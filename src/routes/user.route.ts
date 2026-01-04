import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRegister } from '../middlewares/validateRegister';
import { User } from '../interfaces/user.interface';
import { validateUser } from '../middlewares/validateAuth';

export class UserRoute {
  private router: Router;
  private userController: UserController;
  constructor(userController: UserController) {
    this.router = Router();
    this.userController = userController;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('/login', (req, res) => {
      this.userController.userLogin(req, res);
    });
    this.router.get('/dashboard', validateUser, (req, res) => {
      this.userController.userDashboard(req, res);
    });

    this.router.post('/signup', validateRegister, (req, res, next) =>
      this.userController.userSignup(req, res, next)
    );
    this.router.post('/login', (req, res, next) => {
      this.userController.verifyUserLogin(req, res, next);
    });
    this.router.put('/update-user/:id', (req, res, next) => {
      this.userController.updateUser(req, res, next);
    });
    this.router.patch('/change-password/:id', (req, res, next) => {
      this.userController.changePassword(req, res, next);
    });
    this.router.get('/get-user/:id', (req, res, next) => {
      this.userController.getUser(req, res, next);
    });
    this.router.get('/logout', (req, res, next) => {
      this.userController.logout(req, res, next);
    });
  }
  public getRouter() {
    return this.router;
  }
}
