import { deleteEnrollment } from '../../lib/db';
import { verifyAdminAuth } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Enrollment ID is required' });
  }

  try {
    // Delete from Vercel Postgres
    const deleted = await deleteEnrollment(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({
      error: 'Failed to delete enrollment',
      details: error.message,
    });
  }
}
