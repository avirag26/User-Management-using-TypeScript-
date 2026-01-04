import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../services/admin/admin.service';

export class AdminController {
  private layout = './layouts/admin';
  private adminService: AdminService;
  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  async login(req: Request, res: Response) {
    if (req.session.admin) {
      res.redirect('/admin/dashboard');
      return;
    }
    res.render('admin_login', { layout: this.layout, loginPage: true });
  }

  async adminDashboard(req: Request, res: Response, next: NextFunction) {
    const users = await this.adminService.getAllUser();

    res.render('dashboard', { layout: this.layout, users });
  }

  async verifyLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const isAdmin = await this.adminService.checkAdminExist(email, password);
      req.session.admin = true;
      res.status(200).json({
        success: true,
        message: isAdmin,
        redirectUrl: '/admin/dashboard',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.adminService.getAllUser();
      res.status(200).json({ success: true, message: users });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.adminService.findUser(id);
      res.status(200).json({ success: true, message: user });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.adminService.deleteuser(id);
      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(() => res.redirect('/admin/login'));
    } catch (error) {
      next(error);
    }
  }
}
