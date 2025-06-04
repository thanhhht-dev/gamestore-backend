import { AppDataSource } from '@config/data-source.js';
import { User } from '@/models/user.model.js';
import { NextFunction, Request, Response } from 'express';

const userRepo = AppDataSource.getRepository(User);

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepo.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
