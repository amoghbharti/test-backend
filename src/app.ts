import express from 'express';
import routes from './routes';
import connection from './connection';
import cors from 'cors';
import morgan from 'morgan';

export default class App {
  public server;

  constructor() {
    this.server = express();

    this.connectDB();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan('dev'));
  }
  routes() {
    this.server.use(routes);
  }
  async connectDB() {
    await connection();
  }
}
