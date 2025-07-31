import { config } from 'dotenv';

// Load environment variables
config();

interface IEnvironmentConfig {
  NODE_ENV: string;
  APP_PORT: number;
  APP_HOST: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  LOG_LEVEL: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

class EnvironmentConfig {
  private static instance: IEnvironmentConfig;

  public static getInstance(): IEnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = {
        NODE_ENV: process.env.NODE_ENV || 'development',
        APP_PORT: parseInt(process.env.APP_PORT || '5080'),
        APP_HOST: process.env.APP_HOST || 'localhost',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: parseInt(process.env.DB_PORT || '3306'),
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_NAME: process.env.DB_NAME || 'estock',
        JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
        CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      };

      // Validate required environment variables
      EnvironmentConfig.validateConfig();
    }
    return EnvironmentConfig.instance;
  }

  private static validateConfig(): void {
    const config = EnvironmentConfig.instance;
    const requiredFields = ['JWT_SECRET'];

    for (const field of requiredFields) {
      if (!config[field as keyof IEnvironmentConfig]) {
        throw new Error(`Missing required environment variable: ${field}`);
      }
    }

    if (config.JWT_SECRET === 'default-secret' && config.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production environment');
    }
  }
}

export default EnvironmentConfig;