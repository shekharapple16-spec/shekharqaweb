import fs from 'fs';
import path from 'path';

// Function to save enrollment to file
async function saveEnrollmentToFile(enrollmentData) {
  try {
    // Use proper path resolution for both dev and production
    const projectRoot = path.resolve(process.cwd(), 'data');
    const dataDir = projectRoot;
    const filePath = path.join(dataDir, 'enrollments.json');

    console.log('Enrollment save path:', filePath);
    console.log('Current working directory:', process.cwd());
    console.log('Data directory:', dataDir);

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      console.log('Creating data directory:', dataDir);
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing enrollments
    let enrollments = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        enrollments = JSON.parse(fileContent);
      } catch (parseError) {
        console.error('Error parsing enrollments.json:', parseError);
        enrollments = [];
      }
    }

    // Add new enrollment with timestamp
    const newEnrollment = {
      ...enrollmentData,
      enrolledAt: new Date().toISOString(),
      id: Date.now().toString(),
    };

    enrollments.push(newEnrollment);

    // Save back to file
    console.log('Writing enrollments to file, count:', enrollments.length);
    fs.writeFileSync(filePath, JSON.stringify(enrollments, null, 2));
    console.log('Enrollment saved successfully');
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
    console.error('Error details:', error.message, error.code);
    res.status(500).json({
      success: false,
      error: 'Failed to submit enrollment. Please try again.',
      details: error.message,
    });
  }
}
