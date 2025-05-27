import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      errors: error.errors
    });
    return;
  }

  if (error.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error'
  });
};
