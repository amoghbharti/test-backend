import express from 'express';
import routes from './routes';
import connection from './connection';

class App {
  public server;

  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.connectDB();
  }

  middleware() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
  async connectDB() {
    await connection();
  }
}

export default new App().server;
