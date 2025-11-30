import { createEnrollment } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, experience } = req.body;

  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Save enrollment to Vercel Postgres
    const savedEnrollment = await createEnrollment({
      name,
      email,
      phone,
      company: company || '',
      experience,
    });

    res.status(200).json({
      success: true,
      message: 'Enrollment submitted successfully!',
      enrollmentId: savedEnrollment.id,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit enrollment. Please try again.',
      details: error.message,
    });
  }
}
