import { getEnrollments } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
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
