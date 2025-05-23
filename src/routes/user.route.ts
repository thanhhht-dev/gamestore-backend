import { Router } from 'express';
import { getUserList } from '@/controllers/user.controller.js';

const userRoutes = Router();

userRoutes.get('/api/users', getUserList);

export default userRoutes;
