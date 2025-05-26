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
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format. Expected ISO string.'
  }),
  email: z.string().nonempty('Email is required').email('Invalid email format').trim(),
  password: z.string().nonempty('Password is required').trim()
});

const signinSchema = signupSchema.pick({
  email: true,
  password: true
});

const userRepo = AppDataSource.getRepository(User);

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = signinSchema.parse(req.body);
    if (!parsed) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    const { email, password } = parsed;

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: TOKEN_EXPIRES_TIME });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    next(error);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = signupSchema.parse(req.body);
    if (!parsed) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    const { firstName, lastName, phoneNumber, birthDate, email, password } = parsed;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      name: `${firstName} ${lastName}`,
      phoneNumber,
      birthDate,
      email,
      passwordHash
    });

    await userRepo.save(newUser);

    res.status(201).json({
      message: 'User created successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        birthDate: newUser.birthDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    next(error);
  }
};
