import { createClient } from '@vercel/postgres';

export async function createEnrollment(enrollmentData) {
  const { name, email, phone, company, experience } = enrollmentData;
  const id = Date.now().toString();
  
  const client = createClient();
  
  try {
    await client.connect();
    
    // Create table if it doesn't exist (on first call)
    await client.sql`
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
    await client.sql`
      INSERT INTO enrollments (id, name, email, phone, company, experience)
      VALUES (${id}, ${name}, ${email}, ${phone}, ${company || null}, ${experience})
    `;
    
    return { id, name, email, phone, company, experience, enrolledAt: new Date().toISOString() };
  } catch (error) {
    console.error('Error creating enrollment:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function getEnrollments() {
  const client = createClient();
  
  try {
    await client.connect();
    
    const result = await client.sql`
      SELECT id, name, email, phone, company, experience, enrolled_at as "enrolledAt"
      FROM enrollments
      ORDER BY enrolled_at DESC
    `;
    
    return result.rows;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function deleteEnrollment(id) {
  const client = createClient();
  
  try {
    await client.connect();
    
    const result = await client.sql`
      DELETE FROM enrollments
      WHERE id = ${id}
    `;
    
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    throw error;
  } finally {
    await client.end();
  }
}
