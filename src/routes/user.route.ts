import { Router } from 'express';
import { getUserList } from '@/controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/api/users', getUserList);

export default userRouter;
