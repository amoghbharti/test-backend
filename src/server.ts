import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = 4000;

app.listen(PORT, () => console.log('App started at port', PORT));
