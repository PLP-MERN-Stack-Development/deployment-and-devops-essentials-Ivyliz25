const { createLogger, transports, format } = require('winston');

const level = process.env.LOG_LEVEL || 'info';

const logger = createLogger({
  level,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ handleExceptions: true }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
  exitOnError: false
});

// stream for morgan
logger.stream = {
  write: (message) => logger.info(message.trim())
};

module.exports = logger;
