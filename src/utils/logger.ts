import EnvironmentConfig from '../config/environment';

const config = EnvironmentConfig.getInstance();

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  private static logLevel: LogLevel = LogLevel.INFO;

  static {
    switch (config.LOG_LEVEL.toLowerCase()) {
      case 'error':
        Logger.logLevel = LogLevel.ERROR;
        break;
      case 'warn':
        Logger.logLevel = LogLevel.WARN;
        break;
      case 'info':
        Logger.logLevel = LogLevel.INFO;
        break;
      case 'debug':
        Logger.logLevel = LogLevel.DEBUG;
        break;
    }
  }

  public static error(message: string, ...args: any[]): void {
    if (Logger.logLevel >= LogLevel.ERROR) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
    }
  }

  public static warn(message: string, ...args: any[]): void {
    if (Logger.logLevel >= LogLevel.WARN) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
    }
  }

  public static info(message: string, ...args: any[]): void {
    if (Logger.logLevel >= LogLevel.INFO) {
      console.info(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
    }
  }

  public static debug(message: string, ...args: any[]): void {
    if (Logger.logLevel >= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args);
    }
  }
}