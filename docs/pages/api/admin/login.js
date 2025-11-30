export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  // Use environment variable or set a default admin password
  // IMPORTANT: Change this password in production!
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password-here';

  if (password === ADMIN_PASSWORD) {
    // In production, use proper JWT or session management
    const token = Buffer.from(password).toString('base64');
    
    res.status(200).json({
      success: true,
      token: token,
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid password',
    });
  }
}
