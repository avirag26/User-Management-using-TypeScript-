import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user/user.service';
import { CustomError } from '../utils/customError';
export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async userLogin(req: Request, res: Response) {
    if (req.session.user) {
      res.redirect('/user/dashboard');
      return;
    }
    res.render('user_login', { loginPage: true });
  }

  async userDashboard(req: Request, res: Response) {
    const userDetails = req.session.userDetails;

    res.render('home', { userDetails });
  }

  async userSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;
      await this.userService.createUser(user);
      res.status(201).json({
        success: true,
        message: 'User Created Successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.UserExistence(email, password);
      req.session.user = true;
      req.session.userDetails = user;
      res
        .status(200)
        .json({ success: true, message: user, redirectUrl: '/user/dashboard' });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.body;
      const result = await this.userService.updateUser(id, user);
      req.session.userDetails = result;
      res
        .status(200)
        .json({ success: true, message: 'updated successfully', result });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword || newPassword.length < 4) {
        throw new CustomError(
          'All fields required and password must be strong'
        );
      }
      await this.userService.changePassword(id, currentPassword, newPassword);
      res
        .status(200)
        .json({ success: true, message: 'Password reseted Successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(() => res.redirect('/user/login'));
    } catch (error) {
      next(error);
    }
  }
}
