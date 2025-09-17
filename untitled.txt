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
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    const sourceFile = Array.isArray(files.source) ? files.source[0] : files.source;
    const targetFile = Array.isArray(files.target) ? files.target[0] : files.target;

    // Upload images to Cloudinary for storage
    const sourceUpload = await cloudinary.uploader.upload(sourceFile.filepath, {
      folder: 'faceswap/sources',
      transformation: [{ width: 512, height: 512, crop: 'fill' }]
    });

    const targetUpload = await cloudinary.uploader.upload(targetFile.filepath, {
      folder: 'faceswap/targets',
      transformation: [{ width: 1024, height: 1024, crop: 'limit' }]
    });

    // Use Replicate API for face swapping (Free tier available)
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

    const prediction = await response.json();

    // Poll for completion
    let result = prediction;
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });
      result = await statusResponse.json();
    }

    if (result.status === 'succeeded') {
      // Store result in Cloudinary
      const resultUpload = await cloudinary.uploader.upload(result.output, {
        folder: 'faceswap/results'
      });

      res.status(200).json({
        success: true,
        result: {
          url: resultUpload.secure_url,
          sourceStored: sourceUpload.secure_url,
          targetStored: targetUpload.secure_url,
          id: Date.now().toString()
        }
      });
    } else {
      throw new Error('Face swap failed');
    }

    // Clean up temp files
    fs.unlinkSync(sourceFile.filepath);
    fs.unlinkSync(targetFile.filepath);

  } catch (error) {
    console.error('Face swap error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Face swap processing failed' 
    });
  }
}
