import { NextFunction, Request, Response } from 'express';

export const validateAdmin = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.admin) {
    next();
    return;
  }
  res.redirect('/admin/login');
};

export const validateUser = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    next();
    return;
  }
  res.redirect('/user/login');
};
