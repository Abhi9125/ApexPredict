import { app } from './app';
import { env } from './config/env';
import logger from './utils/logger';

const server = app.listen(env.port, () => {
  logger.info(`⚡ [Server] Running in [${env.nodeEnv}] mode on port ${env.port}`);
});

// 1. Uncaught Exception Handler
process.on('uncaughtException', (err) => {
  logger.error('🚨 UNCAUGHT EXCEPTION! Shutting down server...');
  logger.error(err.message, { stack: err.stack });
  process.exit(1); // Immediate exit because the state of the app is now undefined
});

// 2. Unhandled Promise Rejection Handler
process.on('unhandledRejection', (err: Error) => {
  logger.error('🚨 UNHANDLED REJECTION! Shutting down server...');
  logger.error(err.message, { stack: err.stack });
  
  // Pehle server close karenge, taaki active requests processing khatam ho jaye, fir exit
  server.close(() => {
    process.exit(1);
  });
});

// 3. Graceful Shutdown on SIGTERM (e.g. from Docker or hosting provider)
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('💤 Process terminated successfully.');
  });
});