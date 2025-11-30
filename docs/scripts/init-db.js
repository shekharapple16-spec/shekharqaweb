// Load environment variables for local development
require('dotenv').config({ path: '.env.local' });

// Now initialize
const { initializeDatabase } = require('../lib/db.js');

initializeDatabase()
  .then(() => {
    console.log('✅ Database initialized successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
