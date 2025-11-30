import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '../../lib/auth';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Use proper path resolution for both dev and production
    const projectRoot = path.resolve(process.cwd(), 'data');
    const dataDir = projectRoot;
    const filePath = path.join(dataDir, 'enrollments.json');

    if (!fs.existsSync(filePath)) {
      return res.status(200).json({
        success: true,
        enrollments: [],
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const enrollments = JSON.parse(fileContent);

    res.status(200).json({
      success: true,
      enrollments: enrollments.sort(
        (a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt)
      ),
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
