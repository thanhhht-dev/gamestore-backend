import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TOKEN_EXPIRES_TIME } from '@constants/token';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: TOKEN_EXPIRES_TIME });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};
