export default function handler(req, res) {
  // This is a simple in-memory toggle for enrollment status
  // In production, you'd want to use a database
  
  if (global.enrollmentOpen === undefined) {
    global.enrollmentOpen = true;
  }

  if (req.method === 'POST') {
    const { isOpen } = req.body;
    global.enrollmentOpen = isOpen;
    return res.status(200).json({ 
      success: true, 
      enrollmentOpen: global.enrollmentOpen 
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      enrollmentOpen: global.enrollmentOpen === undefined ? true : global.enrollmentOpen
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
