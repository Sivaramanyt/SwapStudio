import { MongoClient } from 'mongodb';

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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple authentication check
  const authToken = req.headers.authorization;
  if (authToken !== `Bearer ${process.env.ANALYTICS_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Get usage statistics
    const statsCollection = db.collection('usage-stats');
    const contentCollection = db.collection('user-content');

    // Last 7 days stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentStats = await statsCollection
      .find({ 
        lastUpdated: { $gte: sevenDaysAgo } 
      })
      .sort({ date: -1 })
      .limit(7)
      .toArray();

    // Overall totals
    const totalStats = await statsCollection.aggregate([
      {
        $group: {
          _id: null,
          totalUploads: { $sum: '$totalUploads' },
          totalImages: { $sum: '$imageCount' },
          totalVideos: { $sum: '$videoCount' },
          totalSuccess: { $sum: '$successfulProcessing' }
        }
      }
    ]).toArray();

    // Top countries
    const countryStats = await contentCollection.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]).toArray();

    // Processing time averages
    const processingStats = await contentCollection.aggregate([
      {
        $match: {
          processingTime: { $exists: true, $gt: 0 }
        }
      },
      {
        $group: {
          _id: '$type',
          avgProcessingTime: { $avg: '$processingTime' },
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    res.status(200).json({
      success: true,
      data: {
        recentStats,
        totalStats: totalStats[0] || {},
        countryStats,
        processingStats,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch analytics' 
    });
  }
}
