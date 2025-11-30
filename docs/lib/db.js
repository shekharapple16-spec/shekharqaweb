import { sql } from '@vercel/postgres';

export async function createEnrollment(enrollmentData) {
  const { name, email, phone, company, experience } = enrollmentData;
  const id = Date.now().toString();
  
  try {
    // Create table if it doesn't exist (on first call)
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

    // Insert enrollment
    await sql`
      INSERT INTO enrollments (id, name, email, phone, company, experience)
      VALUES (${id}, ${name}, ${email}, ${phone}, ${company || null}, ${experience})
    `;
    
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
    
    return result.rows;
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
