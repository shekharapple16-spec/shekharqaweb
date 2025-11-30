import { getEnrollments } from '../../lib/db';
import { verifyAdminAuth } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch enrollments from Vercel Postgres
    const enrollments = await getEnrollments();

    res.status(200).json({
      success: true,
      enrollments,
      total: enrollments.length,
    });
  } catch (error) {
    console.error('Error reading enrollments:', error);
    res.status(500).json({
      error: 'Failed to fetch enrollments',
      details: error.message,
    });
  }
}
