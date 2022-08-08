import * as dotenv from 'dotenv';
dotenv.config();

import App from './app';

const app = new App().server;
const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => console.log('App started at port', PORT));
