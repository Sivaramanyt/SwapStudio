import { MongoClient } from 'mongodb';

// Free MongoDB Atlas cluster
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await client.connect();
    const db = client.db('faceswap-pro');
    const collection = db.collection('user-content');

    const contentData = {
      ...req.body,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      createdAt: new Date()
    };

    await collection.insertOne(contentData);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Content storage error:', error);
    res.status(500).json({ success: false, error: 'Storage failed' });
  } finally {
    await client.close();
  }
}
