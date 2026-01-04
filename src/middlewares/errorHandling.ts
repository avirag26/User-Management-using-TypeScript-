import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError';

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof CustomError ? err.statusCode : 500;
  const message =
    err instanceof CustomError ? err.message : 'Something went Wrong';
  console.log(err.message);
  res.status(status).json({ success: false, message });
};
