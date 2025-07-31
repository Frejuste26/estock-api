import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import DatabaseConfig from './config/database';
import EnvironmentConfig from './config/environment';
import { Logger } from './utils/logger';
import { ErrorHandler, RateLimiter } from './middlewares';

// Import resolvers (to be created)
// import { UserResolver, ProductResolver } from './graphql/resolvers';

class Server {
  private app: express.Application;
  private config = EnvironmentConfig.getInstance();

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    // CORS
    this.app.use(cors({
      origin: this.config.CORS_ORIGIN,
      credentials: true,
    }));

    // Rate limiting
    this.app.use(RateLimiter.middleware);

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });
  }

  private async setupGraphQL(): Promise<void> {
    try {
      const schema = await buildSchema({
        resolvers: [
          // UserResolver,
          // ProductResolver,
          // Add other resolvers here
        ],
        emitSchemaFile: true,
        validate: false,
      });

      const server = new ApolloServer({
        schema,
        formatError: (error) => {
          Logger.error('GraphQL Error:', error);
          return {
            message: error.message,
            code: error.extensions?.code,
            path: error.path,
          };
        },
      });

      await server.start();

      this.app.use(
        '/estock-api/v1/graphql',
        expressMiddleware(server, {
          context: async ({ req }) => {
            return {
              req,
              user: req.user, // Will be populated by auth middleware
            };
          },
        })
      );

      Logger.info('GraphQL server setup completed');
    } catch (error) {
      Logger.error('Failed to setup GraphQL server:', error);
      throw error;
    }
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use(ErrorHandler.notFound);

    // Global error handler
    this.app.use(ErrorHandler.handle);
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      await DatabaseConfig.connect();
      await DatabaseConfig.sync();

      // Setup GraphQL
      await this.setupGraphQL();

      // Setup error handling
      this.setupErrorHandling();

      // Start server
      this.app.listen(this.config.APP_PORT, this.config.APP_HOST, () => {
        Logger.info(`🚀 Server running on http://${this.config.APP_HOST}:${this.config.APP_PORT}`);
        Logger.info(`📊 GraphQL endpoint: http://${this.config.APP_HOST}:${this.config.APP_PORT}/estock-api/v1/graphql`);
        Logger.info(`🏥 Health check: http://${this.config.APP_HOST}:${this.config.APP_PORT}/health`);
      });
    } catch (error) {
      Logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new Server();
server.start().catch((error) => {
  Logger.error('Server startup failed:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  Logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});