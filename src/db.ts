import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool
  .connect()
  .then(async (client) => {
    console.log('✅ Connected to PostgreSQL');

    const result = await client.query('SELECT * from users');
    console.log('🎯 Connected to database:', result.rows);

    client.release();
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err);
  });

// pool
//   .query('SELECT * from user')
//   .then((res) => console.log('Current time:', res.rows))
//   .catch(console.error);

export default pool;
