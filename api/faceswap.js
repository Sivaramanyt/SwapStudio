import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary (Free tier: 25GB storage, 25GB bandwidth)
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
    // Parse form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit for images
    });
    
    const [fields, files] = await form.parse(req);
    
    const sourceFile = Array.isArray(files.source) ? files.source[0] : files.source;
    const targetFile = Array.isArray(files.target) ? files.target[0] : files.target;

    if (!sourceFile || !targetFile) {
      return res.status(400).json({ 
        success: false, 
        error: 'Both source and target images are required' 
      });
    }

    // Upload images to Cloudinary for storage
    const sourceUpload = await cloudinary.uploader.upload(sourceFile.filepath, {
      folder: 'faceswap/sources',
      transformation: [{ width: 512, height: 512, crop: 'fill' }],
      resource_type: 'image'
    });

    const targetUpload = await cloudinary.uploader.upload(targetFile.filepath, {
      folder: 'faceswap/targets',
      transformation: [{ width: 1024, height: 1024, crop: 'limit' }],
      resource_type: 'image'
    });

    // Use Replicate API for face swapping
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "8acfe4dad8dd8909a2ef5a7b38f1f55477d3a8bc96e53d4e93d9e4c9ca3ff9d9",
        input: {
          source_image: sourceUpload.secure_url,
          target_image: targetUpload.secure_url,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const prediction = await response.json();

    // Poll for completion (max 60 seconds)
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 60;

    while (result.status === 'starting' || result.status === 'processing') {
      if (attempts >= maxAttempts) {
        throw new Error('Processing timeout - please try again');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check processing status');
      }

      result = await statusResponse.json();
      attempts++;
    }

    if (result.status === 'succeeded' && result.output) {
      // Store result in Cloudinary
      const resultUpload = await cloudinary.uploader.upload(result.output, {
        folder: 'faceswap/results',
        resource_type: 'image'
      });

      // Store analytics data
      await storeAnalytics({
        type: 'image',
        sourceUrl: sourceUpload.secure_url,
        targetUrl: targetUpload.secure_url,
        resultUrl: resultUpload.secure_url,
        processingTime: attempts,
        userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
      });

      res.status(200).json({
        success: true,
        result: {
          url: resultUpload.secure_url,
          sourceStored: sourceUpload.secure_url,
          targetStored: targetUpload.secure_url,
          id: Date.now().toString(),
          processingTime: attempts
        }
      });
    } else {
      throw new Error(result.error || 'Face swap processing failed');
    }

    // Clean up temp files
    if (sourceFile?.filepath) fs.unlinkSync(sourceFile.filepath);
    if (targetFile?.filepath) fs.unlinkSync(targetFile.filepath);

  } catch (error) {
    console.error('Face swap error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Face swap processing failed' 
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
