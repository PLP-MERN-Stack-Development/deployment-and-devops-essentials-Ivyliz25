const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const logger = require('./utils/logger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

const cors = require('cors');
app.use(cors());


// morgan -> winston
app.use(morgan('combined', { stream: logger.stream }));

// health
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

// API
app.use('/api', routes);

// fallback for non API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.status(404).json({ error: 'Not found' });
});

// error handler
app.use(errorHandler);

module.exports = app;
