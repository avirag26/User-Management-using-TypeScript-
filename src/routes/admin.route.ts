import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { validateAdmin } from '../middlewares/validateAuth';

export class AdminRoute {
  private router: express.Router;
  private adminController: AdminController;

  constructor(adminController: AdminController) {
    this.router = express.Router();
    this.adminController = adminController;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('/login', (req: Request, res: Response) =>
      this.adminController.login(req, res)
    );
    this.router.post(
      '/login',
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.verifyLogin(req, res, next);
      }
    );

    this.router.get(
      '/dashboard',
      validateAdmin,
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.adminDashboard(req, res, next);
      }
    );
    this.router.get(
      '/logout',
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.logout(req, res, next);
      }
    );

    this.router.get(
      '/all-users',
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.getAllUsers(req, res, next);
      }
    );

    this.router.get(
      '/get-user/:id',
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.getUser(req, res, next);
      }
    );

    this.router.delete(
      '/delete-user/:id',
      (req: Request, res: Response, next: NextFunction) => {
        this.adminController.deleteUser(req, res, next);
      }
    );
  }

  public getAdminRouter() {
    return this.router;
  }
}
