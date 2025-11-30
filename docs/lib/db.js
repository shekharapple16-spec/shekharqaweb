import { sql } from '@vercel/postgres';

// Cache to track if table is already created
let tableCreated = false;

export async function createEnrollment(enrollmentData) {
  const { name, email, phone, company, experience } = enrollmentData;
  const id = Date.now().toString();
  
  try {
    console.log('Creating enrollment in database...');
    
    // Only create table on first call
    if (!tableCreated) {
      try {
        console.log('Creating table if not exists...');
        await sql`
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
        tableCreated = true;
        console.log('✅ Table ready');
      } catch (tableError) {
        console.log('Table status:', tableError.message);
        tableCreated = true;
      }
    }

    // Insert enrollment
    console.log('Inserting record...');
    const result = await sql`
      INSERT INTO enrollments (id, name, email, phone, company, experience)
      VALUES (${id}, ${name}, ${email}, ${phone}, ${company || ''}, ${experience})
      RETURNING id, name, email
    `;
    
    console.log('✅ Enrollment saved');
    return { id, name, email, phone, company, experience, enrolledAt: new Date().toISOString() };
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
}

export async function getEnrollments() {
  try {
    console.log('Fetching enrollments...');
    const result = await sql`
      SELECT id, name, email, phone, company, experience, enrolled_at as "enrolledAt"
      FROM enrollments
      ORDER BY enrolled_at DESC
    `;
    
    console.log(`✅ Found ${result.rows.length} enrollments`);
    return result.rows || [];
  } catch (error) {
    console.error('❌ Error:', error.message);
    return [];
  }
}

export async function deleteEnrollment(id) {
  try {
    console.log('Deleting enrollment:', id);
    const result = await sql`
      DELETE FROM enrollments
      WHERE id = ${id}
    `;
    
    const deleted = result.rowCount > 0;
    console.log(deleted ? '✅ Deleted' : '⚠️ Not found');
    return deleted;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw new Error(`Delete error: ${error.message}`);
  }
}
