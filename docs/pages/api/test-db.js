import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const action = req.body.action;

  try {
    console.log(`[TEST] Action: ${action}`);
    console.log(`[TEST] DATABASE_URL: ${process.env.DATABASE_URL ? 'SET ✅' : 'MISSING ❌'}`);

    if (action === 'connection-test') {
      // Just try to connect
      try {
        const result = await sql`SELECT NOW()`;
        return res.status(200).json({
          success: true,
          message: 'Database connection successful!',
          timestamp: result.rows[0]
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Connection failed',
          error: err.message
        });
      }
    }

    if (action === 'create-table') {
      try {
        console.log('[TEST] Creating table...');
        const result = await sql`
          CREATE TABLE IF NOT EXISTS enrollments (
            id TEXT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            company VARCHAR(255),
            experience VARCHAR(50) NOT NULL,
            enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;
        return res.status(200).json({
          success: true,
          message: 'Table created successfully!',
          result: result
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Table creation failed',
          error: err.message
        });
      }
    }

    if (action === 'insert-test') {
      try {
        console.log('[TEST] Inserting test record...');
        const id = Date.now().toString();
        const result = await sql`
          INSERT INTO enrollments (id, name, email, phone, company, experience)
          VALUES (${id}, 'Test User', 'test@example.com', '1234567890', 'Test Company', 'beginner')
          RETURNING *
        `;
        return res.status(200).json({
          success: true,
          message: 'Record inserted successfully!',
          data: result.rows[0]
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Insert failed',
          error: err.message
        });
      }
    }

    if (action === 'select-all') {
      try {
        console.log('[TEST] Selecting all records...');
        const result = await sql`
          SELECT * FROM enrollments ORDER BY enrolled_at DESC
        `;
        return res.status(200).json({
          success: true,
          message: `Found ${result.rows.length} records`,
          count: result.rows.length,
          data: result.rows
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Select failed',
          error: err.message
        });
      }
    }

    if (action === 'delete-all') {
      try {
        console.log('[TEST] Deleting all records...');
        const result = await sql`
          DELETE FROM enrollments
        `;
        return res.status(200).json({
          success: true,
          message: 'All records deleted',
          deletedCount: result.rowCount
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Delete failed',
          error: err.message
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Unknown action',
      availableActions: [
        'connection-test',
        'create-table',
        'insert-test',
        'select-all',
        'delete-all'
      ]
    });

  } catch (error) {
    console.error('[TEST] Unexpected error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected error',
      error: error.message
    });
  }
}
