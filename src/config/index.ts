const envs = process.env;

export const MONGO_DB_CONF = {
  DB_NAME: envs.MONGO_DB_NAME,
  DB_USER: envs.MONGO_DB_USER,
  DB_PASSWORD: envs.MONGO_DB_PASSWORD,
  DB_HOST: envs.MONGO_DB_HOST,
};
