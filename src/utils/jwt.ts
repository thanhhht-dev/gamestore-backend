import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { REFRESH_TOKEN_EXPIRES_TIME, ACCESS_TOKEN_EXPIRES_TIME } from '@constants/token';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRES_TIME });
};

export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_TIME });

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
