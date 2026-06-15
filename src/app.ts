import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { requestIdMiddleware } from './middlewares/requestId.middleware';
import { globalRateLimiter } from './middlewares/rateLimiter.middleware';
import { notFoundMiddleware } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { apiRouter } from './routes';
import logger from './utils/logger';

const app = express();

// 1. Request ID Middleware (sabse pehle taaki har log me req.id ho)
app.use(requestIdMiddleware);

// 2. Helmet for security headers
app.use(helmet());

// 3. CORS Configuration
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true, // Cookies allowed karne ke liye
  })
);

// 4. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Morgan logger integrated with Winston
// Production me detailed 'combined' logs aur Dev me clean 'dev' logs use karenge
const morganFormat = env.nodeEnv === 'production' ? 'combined' : 'dev';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// 6. Global Rate Limiter
app.use(globalRateLimiter);

// 7. Base API Route
app.use('/api/v1', apiRouter);

// 8. 404 Catch-all Middleware (agar koi route match nahi hua)
app.use(notFoundMiddleware);

// 9. Global Error Handler (MUST be last middleware)
app.use(errorMiddleware);

export { app };