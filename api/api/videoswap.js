import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data with larger limit for videos
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB limit for videos
    });
    
    const [fields, files] = await form.parse(req);
    
    const sourceFile = Array.isArray(files.source) ? files.source[0] : files.source;
    const targetFile = Array.isArray(files.target) ? files.target[0] : files.target;

    if (!sourceFile || !targetFile) {
      return res.status(400).json({ 
        success: false, 
        error: 'Both source face image and target video are required' 
      });
    }

    // Validate file types
    if (!sourceFile.mimetype?.startsWith('image/')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Source file must be an image' 
      });
    }

    if (!targetFile.mimetype?.startsWith('video/')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Target file must be a video' 
      });
    }

    // Upload source image to Cloudinary
    const sourceUpload = await cloudinary.uploader.upload(sourceFile.filepath, {
      folder: 'faceswap/video-sources',
      transformation: [{ width: 512, height: 512, crop: 'fill' }],
      resource_type: 'image'
    });

    // Upload target video to Cloudinary
    const targetUpload = await cloudinary.uploader.upload(targetFile.filepath, {
      folder: 'faceswap/video-targets',
      resource_type: 'video',
      transformation: [
        { width: 1280, height: 720, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    // Use Replicate API for video face swapping
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "104b3fa0e4d52b2d55fbbf5d0a31b5ceec2fe43d25faf37a10b8a15bf1e3fbf2",
        input: {
          source_image: sourceUpload.secure_url,
          target_video: targetUpload.secure_url,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const prediction = await response.json();

    // Poll for completion (max 300 seconds for videos)
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 300; // 5 minutes max for video processing

    while (result.status === 'starting' || result.status === 'processing') {
      if (attempts >= maxAttempts) {
        throw new Error('Video processing timeout - please try with a shorter video');
      }

      await new Promise(resolve => setTimeout(resolve, 2000)); // Check every 2 seconds
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check video processing status');
      }

      result = await statusResponse.json();
      attempts++;
    }

    if (result.status === 'succeeded' && result.output) {
      // Store result video in Cloudinary
      const resultUpload = await cloudinary.uploader.upload(result.output, {
        folder: 'faceswap/video-results',
        resource_type: 'video'
      });

      // Generate thumbnail for video preview
      const thumbnailUpload = await cloudinary.uploader.upload(result.output, {
        folder: 'faceswap/video-thumbnails',
        resource_type: 'video',
        format: 'jpg',
        transformation: [
          { width: 640, height: 360, crop: 'fill' },
          { start_offset: '10%' } // Thumbnail from 10% into video
        ]
      });

      // Store analytics data
      await storeAnalytics({
        type: 'video',
        sourceUrl: sourceUpload.secure_url,
        targetUrl: targetUpload.secure_url,
        resultUrl: resultUpload.secure_url,
        thumbnailUrl: thumbnailUpload.secure_url,
        processingTime: attempts * 2, // seconds
        userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
      });

      res.status(200).json({
        success: true,
        result: {
          url: resultUpload.secure_url,
          thumbnail: thumbnailUpload.secure_url,
          sourceStored: sourceUpload.secure_url,
          targetStored: targetUpload.secure_url,
          id: Date.now().toString(),
          processingTime: attempts * 2
        }
      });
    } else {
      throw new Error(result.error || 'Video face swap processing failed');
    }

    // Clean up temp files
    if (sourceFile?.filepath) fs.unlinkSync(sourceFile.filepath);
    if (targetFile?.filepath) fs.unlinkSync(targetFile.filepath);

  } catch (error) {
    console.error('Video face swap error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Video face swap processing failed' 
    });
  }
}

// Helper function to store analytics
async function storeAnalytics(data) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/store-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Analytics storage failed:', error);
  }
}
