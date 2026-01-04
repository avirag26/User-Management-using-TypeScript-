import dotenv from 'dotenv';
dotenv.config();
import { App } from './app';
import { ConnectDB } from './config/db';
const app = new App();
const database = new ConnectDB();
database.connect();

app
  .getApp()
  .listen(process.env.PORT||3000, () => console.log('Server running on the port'));
