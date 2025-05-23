import { signin } from '@/controllers/auth.controller';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/api/auth/signin', signin);

export default authRoutes;
