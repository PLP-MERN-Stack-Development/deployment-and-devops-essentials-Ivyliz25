require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);480870
const { connectDB } = require('./utils/db');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });

    // graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down gracefully...');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
      setTimeout(() => {
        logger.error('Forced shutdown');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
