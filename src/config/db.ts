import mongoose from 'mongoose';

export class ConnectDB {
  private databseUrl: string;

  constructor() {
    console.log(process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
      throw new Error('Mongoose url is not defined');
    }
    this.databseUrl = process.env.MONGO_URI;
  }

  async connect() {
    try {
      const conn = await mongoose.connect(this.databseUrl);
      console.log(`DataBase connected succefully ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
    }
  }
}
