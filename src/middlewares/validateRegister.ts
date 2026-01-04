import { NextFunction, Request, Response } from 'express';
export const validateRegister = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;
  if (username.length < 4 || !email || password.length < 4) {
    res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
    return;
  }

  next();
};
