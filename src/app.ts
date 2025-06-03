import authRoutes from '@/routes/auth.route.js';
import userRoutes from '@/routes/user.route.js';
import { errorHandler } from '@middleware/errorHandler';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors(), express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

export default app;
