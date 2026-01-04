import express, { Application } from 'express';
import { AdminRoute } from './routes/admin.route';
import { UserRoute } from './routes/user.route';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import { UserRepository } from './repositories/user/user.repo';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user.controller';
import { AdminRepository } from './repositories/admin/admin.repo';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/admin.controller';
import { errorHandler } from './middlewares/errorHandling';
import session from 'express-session';
import flash from 'connect-flash';
import nocache from 'nocache';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setTestRoute();
    this.setMiddlewares();
    this.setAdminRoute();
    this.setUserRoute();
    this.handleError();
  }
  private setTestRoute() {
    this.app.get('/', (req, res) => {
      res.send('Hello world');
    });
  }
  private setMiddlewares() {
    this.app.use(
      session({
        secret: 'Ebithedev',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
      })
    );
    this.app.use(nocache());
    this.app.use(flash());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(expressEjsLayouts);
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('layout', './layouts/user');
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.locals.success_msg = req.flash('success');
      res.locals.error_msg = req.flash('error');
      res.locals.loginPage = false;
      next();
    });
  }

  private setUserRoute() {
    const userController = this.injectUser();
    const userRoute = new UserRoute(userController);
    this.app.use('/user', userRoute.getRouter());
  }
  private injectUser() {
    const userRepo = new UserRepository();
    const userService = new UserService(userRepo);
    return new UserController(userService);
  }
  private setAdminRoute() {
    const adminController = this.injectAdmin();
    const adminRoute = new AdminRoute(adminController);
    this.app.use('/admin', adminRoute.getAdminRouter());
  }
  private injectAdmin() {
    const adminRepository = new AdminRepository();
    const adminService = new AdminService(adminRepository);
    return new AdminController(adminService);
  }

  private handleError() {
    this.app.use(errorHandler);
  }
  getApp() {
    return this.app;
  }
}
