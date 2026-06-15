import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { sendError } from '../utils/apiResponse';
import logger from '../utils/logger';

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(
    `[Request ID: ${req.id || 'N/A'}] - [${req.method} ${req.originalUrl}] - Error: ${err.message}`,
    { stack: err.stack }
  );

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errors: unknown[] = [];


  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }


  if (process.env.NODE_ENV === 'development') {
    sendError(res, statusCode, message, [{ detail: err.message, stack: err.stack }], req.id);
    return;
  }


  if (err instanceof AppError && err.isOperational) {
    sendError(res, statusCode, message, errors, req.id);
  } else {
    sendError(res, 500, 'Something went wrong!', [], req.id);
  }
};