import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../types';
import EnvironmentConfig from '../config/environment';

const config = EnvironmentConfig.getInstance();

export class JwtUtils {
  public static generateToken(payload: IJwtPayload): string {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  }

  public static verifyToken(token: string): IJwtPayload {
    try {
      return jwt.verify(token, config.JWT_SECRET) as IJwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  public static decodeToken(token: string): IJwtPayload | null {
    try {
      return jwt.decode(token) as IJwtPayload;
    } catch (error) {
      return null;
    }
  }
}