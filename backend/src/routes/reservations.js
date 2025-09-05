const express = require('express');
const { pool } = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, party_size, time } = req.body;
  await pool.query('INSERT INTO reservations(name, email, party_size, time) VALUES($1,$2,$3,$4)', [name, email, party_size, time]);
  res.json({ ok: true });
});

module.exports = router;
