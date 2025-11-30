import fs from 'fs';
import path from 'path';

// Function to save enrollment to file
async function saveEnrollmentToFile(enrollmentData) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'enrollments.json');

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing enrollments
    let enrollments = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      enrollments = JSON.parse(fileContent);
    }

    // Add new enrollment with timestamp
    const newEnrollment = {
      ...enrollmentData,
      enrolledAt: new Date().toISOString(),
      id: Date.now().toString(),
    };

    enrollments.push(newEnrollment);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(enrollments, null, 2));
    return newEnrollment;
  } catch (error) {
    console.error('Error saving enrollment to file:', error);
    throw error;
  }
}

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
    // Save enrollment to file
    const savedEnrollment = await saveEnrollmentToFile({
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
      error: 'Failed to submit enrollment. Please try again.',
      details: error.message,
    });
  }
}
