import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('faceswap-pro');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // Only allow POST requests with secret key
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authToken = req.headers.authorization;
  if (authToken !== `Bearer ${process.env.CLEANUP_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('user-content');

    // Find expired content (older than 24 hours)
    const expiredDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const expiredContent = await collection
      .find({ createdAt: { $lt: expiredDate } })
      .toArray();

    let deletedFiles = 0;
    let errors = [];

    // Delete files from Cloudinary
    for (const content of expiredContent) {
      try {
        // Extract public_id from Cloudinary URLs
        const urls = [
          content.sourceUrl,
          content.targetUrl,
          content.resultUrl,
          content.thumbnailUrl
        ].filter(Boolean);

        for (const url of urls) {
          if (url && url.includes('cloudinary.com')) {
            const publicId = extractPublicId(url);
            if (publicId) {
              const resourceType = content.type === 'video' && 
                (url.includes('video-') || url === content.resultUrl) ? 'video' : 'image';
              
              await cloudinary.uploader.destroy(publicId, { 
                resource_type: resourceType 
              });
              deletedFiles++;
            }
          }
        }
      } catch (error) {
        errors.push(`Failed to delete files for ${content._id}: ${error.message}`);
      }
    }

    // Remove records from database
    const deleteResult = await collection.deleteMany({
      createdAt: { $lt: expiredDate }
    });

    res.status(200).json({
      success: true,
      deletedRecords: deleteResult.deletedCount,
      deletedFiles,
      errors: errors.length > 0 ? errors : undefined,
      cleanupDate: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Cleanup failed' 
    });
  }
}

// Extract public_id from Cloudinary URL
function extractPublicId(url) {
  try {
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    if (uploadIndex !== -1 && uploadIndex < parts.length - 1) {
      // Get everything after /upload/v{version}/
      const pathParts = parts.slice(uploadIndex + 2);
      const publicId = pathParts.join('/').split('.')[0]; // Remove extension
      return publicId;
    }
    return null;
  } catch {
    return null;
  }
}
