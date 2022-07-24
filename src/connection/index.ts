import mongoose from 'mongoose';
import { MONGO_DB_CONF } from '../config';

export default async () => {
  try {
    const url = `mongodb+srv://${MONGO_DB_CONF.DB_HOST}.mongodb.net/${MONGO_DB_CONF.DB_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(url, { user: MONGO_DB_CONF.DB_USER, pass: MONGO_DB_CONF.DB_PASSWORD });

    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Could not connect to the database. ', err);
  }
};
