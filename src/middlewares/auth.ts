import { Request, Response, NextFunction } from 'express';
import { JwtUtils } from '../utils/jwt';
import { UserRole, IJwtPayload } from '../types';
import { Logger } from '../utils/logger';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export class AuthMiddleware {
  public static authenticate(req: Request, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Access token is required',
        });
        return;
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const decoded = JwtUtils.verifyToken(token);
      
      req.user = decoded;
      next();
    } catch (error) {
      Logger.error('Authentication failed:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  }

  public static authorize(roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      if (!roles.includes(req.user.role)) {
        res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
        });
        return;
      }

      next();
    };
  }

  public static adminOnly(req: Request, res: Response, next: NextFunction): void {
    AuthMiddleware.authorize([UserRole.ADMIN])(req, res, next);
  }

  public static managerOrAdmin(req: Request, res: Response, next: NextFunction): void {
    AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER])(req, res, next);
  }
}