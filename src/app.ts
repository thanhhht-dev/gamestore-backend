import pool from '@/db.js';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

export default app;
