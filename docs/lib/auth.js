// Client-side auth check
export const checkAdminAuth = () => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  return !!token && token.length > 0;
};

// Logout
export const logoutAdmin = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
};

// Get token for API calls
export const getAdminToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken') || '';
};

// Server-side auth verification
export const verifyAdminAuth = (req) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  const adminPassword = process.env.ADMIN_PASSWORD || 'your-secure-password-here';
  const expectedToken = Buffer.from(adminPassword).toString('base64');
  
  return token === expectedToken && token.length > 0;
};
