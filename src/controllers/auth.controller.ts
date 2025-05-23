import { AppDataSource } from '@/config/data-source.js';
import { TOKEN_EXPIRES_TIME } from '@/constants/token.js';
import { User } from '@/models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

dotenv.config();

const signupSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  birthDate: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Invalid date'
  }),
  email: z.string().nonempty('Email is required').email('Invalid email format').trim(),
  password: z.string().nonempty('Password is required').trim(),
  confirmPassword: z.string().nonempty('Confirm password is required')
});

const signinSchema = signupSchema.pick({
  email: true,
  password: true
});

const userRepo = AppDataSource.getRepository(User);

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = signinSchema.parse(req.body);
    if (!parsed) return res.status(400).json({ message: 'Bad request' });

    const { email, password } = parsed;

    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: TOKEN_EXPIRES_TIME });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
