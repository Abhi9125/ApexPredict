import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'NODE_ENV', 'CORS_ORIGIN', 'DATABASE_URL'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV as string,
  corsOrigin: process.env.CORS_ORIGIN as string,
  databaseUrl: process.env.DATABASE_URL as string
};