const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');
const { init } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/specials', require('./routes/specials'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/scores', require('./routes/scores'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reservations', require('./routes/reservations'));

const port = process.env.PORT || 5000;
init().then(() => {
  app.listen(port, () => console.log(`Server running on ${port}`));
});
