import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config();

class DatabaseConfig {
  private static instance: Sequelize;

  public static getInstance(): Sequelize {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new Sequelize({
        database: process.env.DB_NAME || 'estock',
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        models: [path.join(__dirname, '../models')],
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          underscored: true,
          freezeTableName: true,
        },
      });
    }
    return DatabaseConfig.instance;
  }

  public static async connect(): Promise<void> {
    try {
      const sequelize = DatabaseConfig.getInstance();
      await sequelize.authenticate();
      console.log('✅ Database connection established successfully.');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  public static async sync(): Promise<void> {
    try {
      const sequelize = DatabaseConfig.getInstance();
      await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
      console.log('✅ Database synchronized successfully.');
    } catch (error) {
      console.error('❌ Database synchronization failed:', error);
      throw error;
    }
  }
}

export default DatabaseConfig;