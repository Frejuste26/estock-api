import { Request, Response, NextFunction } from 'express';
import EnvironmentConfig from '../config/environment';

const config = EnvironmentConfig.getInstance();

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private static store: RateLimitStore = {};
  private static windowMs = config.RATE_LIMIT_WINDOW_MS;
  private static maxRequests = config.RATE_LIMIT_MAX_REQUESTS;

  public static middleware(req: Request, res: Response, next: NextFunction): void {
    const clientId = req.ip || 'unknown';
    const now = Date.now();
    
    // Clean up expired entries
    RateLimiter.cleanup();

    if (!RateLimiter.store[clientId]) {
      RateLimiter.store[clientId] = {
        count: 1,
        resetTime: now + RateLimiter.windowMs,
      };
      next();
      return;
    }

    const clientData = RateLimiter.store[clientId];

    if (now > clientData.resetTime) {
      // Reset the window
      clientData.count = 1;
      clientData.resetTime = now + RateLimiter.windowMs;
      next();
      return;
    }

    if (clientData.count >= RateLimiter.maxRequests) {
      res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
      });
      return;
    }

    clientData.count++;
    next();
  }

  private static cleanup(): void {
    const now = Date.now();
    Object.keys(RateLimiter.store).forEach(key => {
      if (now > RateLimiter.store[key].resetTime) {
        delete RateLimiter.store[key];
      }
    });
  }
}