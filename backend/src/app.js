const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ticketRoutes = require('./routes/ticketRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Liveness probe target for the EKS deployment — deliberately does not
// touch the database, so it only reflects whether the process is up.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/tickets', ticketRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
