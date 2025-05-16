import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

pool.connect((err) => {
  if (err) console.error('Connected errors to the database', err);
});

export default pool;
