import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';
import EnvironmentConfig from '../config/environment';

const config = EnvironmentConfig.getInstance();

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class ErrorHandler {
  public static handle(
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    Logger.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
    });

    const statusCode = error.statusCode || 500;
    const message = error.isOperational ? error.message : 'Internal Server Error';

    res.status(statusCode).json({
      success: false,
      message,
      ...(config.NODE_ENV === 'development' && {
        stack: error.stack,
        error: error.message,
      }),
    });
  }

  public static notFound(req: Request, res: Response, next: NextFunction): void {
    const error: AppError = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    error.isOperational = true;
    next(error);
  }

  public static createError(message: string, statusCode: number = 500): AppError {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
  }
}