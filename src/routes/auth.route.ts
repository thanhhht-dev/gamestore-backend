import { logout, refreshAccessToken, signin, signup } from '@controllers/auth.controller';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/api/auth/signin', signin);
authRoutes.post('/api/auth/signup', signup);
authRoutes.post('/api/auth/logout', logout);
authRoutes.post('/api/auth/refresh-token', refreshAccessToken);

export default authRoutes;
