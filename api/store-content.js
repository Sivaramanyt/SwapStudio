import { MongoClient } from 'mongodb';

// MongoDB connection with connection pooling
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('faceswap-pro');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('user-content');

    // Enhanced analytics data
    const contentData = {
      ...req.body,
      // User tracking (anonymized)
      userFingerprint: generateUserFingerprint(req),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer || 'direct',
      
      // Geographic data (approximate from IP)
      country: req.headers['cf-ipcountry'] || 'unknown', // Cloudflare header
      
      // Performance metrics
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      
      // Usage analytics
      sessionId: req.headers['x-session-id'] || generateSessionId(),
      
      // Additional metadata
      fileSize: req.body.fileSize || 0,
      processingSuccess: req.body.processingTime ? true : false,
    };

    // Insert into MongoDB
    const result = await collection.insertOne(contentData);

    // Update usage statistics
    await updateUsageStats(db, contentData);

    res.status(200).json({ 
      success: true, 
      id: result.insertedId 
    });

  } catch (error) {
    console.error('Content storage error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to store content data' 
    });
  }
}

// Generate anonymous user fingerprint for analytics
function generateUserFingerprint(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';
  
  // Create hash from IP + UserAgent (anonymized)
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(ip + userAgent)
    .digest('hex')
    .substring(0, 16); // Short fingerprint
}

// Generate session ID
function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Update usage statistics
async function updateUsageStats(db, contentData) {
  try {
    const statsCollection = db.collection('usage-stats');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    await statsCollection.updateOne(
      { date: today },
      {
        $inc: {
          totalUploads: 1,
          [`${contentData.type}Count`]: 1,
          successfulProcessing: contentData.processingSuccess ? 1 : 0
        },
        $addToSet: {
          uniqueUsers: contentData.userFingerprint,
          countries: contentData.country
        },
        $set: {
          lastUpdated: new Date()
        }
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Stats update failed:', error);
  }
}
