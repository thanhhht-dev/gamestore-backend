import { signin, signup } from '@controllers/auth.controller';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/api/auth/signin', signin);
authRoutes.post('/api/auth/signup', signup);

export default authRoutes;
