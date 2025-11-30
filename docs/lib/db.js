import { sql } from '@vercel/postgres';

// Cache to track if table is already created
let tableCreated = false;

export async function createEnrollment(enrollmentData) {
  const { name, email, phone, company, experience } = enrollmentData;
  const id = Date.now().toString();
  
  try {
    console.log('Inserting enrollment...');
    
    // Only create table on first call
    if (!tableCreated) {
      try {
        console.log('Creating table...');
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
        console.log('Table created/verified');
      } catch (tableError) {
        console.log('Table check note:', tableError.message);
        tableCreated = true;
      }
    }

    // Insert enrollment
    const result = await sql`
      INSERT INTO enrollments (id, name, email, phone, company, experience)
      VALUES (${id}, ${name}, ${email}, ${phone}, ${company || null}, ${experience})
      RETURNING *
    `;
    
    console.log('Enrollment saved successfully');
    return { id, name, email, phone, company, experience, enrolledAt: new Date().toISOString() };
  } catch (error) {
    console.error('Error creating enrollment:', error);
    throw error;
  }
}

export async function getEnrollments() {
  try {
    const result = await sql`
      SELECT id, name, email, phone, company, experience, enrolled_at as "enrolledAt"
      FROM enrollments
      ORDER BY enrolled_at DESC
    `;
    
    return result.rows || [];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
}

export async function deleteEnrollment(id) {
  try {
    const result = await sql`
      DELETE FROM enrollments
      WHERE id = ${id}
    `;
    
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    throw error;
  }
}
