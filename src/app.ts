import userRoutes from '@/routes/user.route.js';
import express from 'express';
import authRoutes from '@/routes/auth.route.js';
import { errorHandler } from '@middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

export default app;
