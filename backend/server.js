require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./src/middleware/logger');
const { init } = require('./src/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/scores', require('./src/routes/scores'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/reservations', require('./src/routes/reservations'));

const port = process.env.PORT || 5000;
init().then(() => {
  app.listen(port, '0.0.0.0', () => console.log(`Server running on ${port}`));
});

