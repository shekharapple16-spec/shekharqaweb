import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '../../lib/auth';

export default function handler(req, res) {
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
    // Use proper path resolution for both dev and production
    const projectRoot = path.resolve(process.cwd(), 'data');
    const dataDir = projectRoot;
    const filePath = path.join(dataDir, 'enrollments.json');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'No enrollments found' });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let enrollments = JSON.parse(fileContent);

    // Filter out the enrollment to delete
    const initialLength = enrollments.length;
    enrollments = enrollments.filter(e => e.id !== id);

    if (enrollments.length === initialLength) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    // Save updated enrollments
    fs.writeFileSync(filePath, JSON.stringify(enrollments, null, 2));

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
