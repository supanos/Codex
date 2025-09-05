const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
