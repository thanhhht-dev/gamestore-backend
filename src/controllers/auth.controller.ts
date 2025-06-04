import { AppDataSource } from '@config/data-source.js';
import { SALT_ROUNDS } from '@/constants/token.js';
import { User } from '@/models/user.model.js';
import { HttpError } from '@utils/HttpError';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
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
      throw new HttpError('Bad Request', 400);
    }

    const { email, password } = parsed;

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      throw new HttpError('Invalid credentials', 400);
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new HttpError('Invalid credentials', 400);
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await userRepo.save(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = signupSchema.parse(req.body);
    if (!parsed) {
      throw new HttpError('Bad Request', 400);
    }

    const { firstName, lastName, phoneNumber, birthDate, email, password } = parsed;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      throw new HttpError('User already exists', 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

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
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new HttpError('No refresh token provided', 401);
    }

    const decoded = verifyRefreshToken(refreshToken) as any;
    const user = await userRepo.findOneBy({ id: decoded.id });

    if (user && user.refreshToken === refreshToken) {
      user.refreshToken = null;
      await userRepo.save(user);
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new HttpError('Missing refresh token', 401);
    }

    const decoded = verifyRefreshToken(refreshToken) as any;
    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user || user.refreshToken !== refreshToken) {
      throw new HttpError('Invalid refresh token', 403);
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};
