const express = require('express');
const { pool } = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM settings WHERE id=1');
  res.json(rows[0]);
});

router.put('/', auth, async (req, res) => {
  const { landing_enabled, banner_url } = req.body;
  const { rows } = await pool.query('UPDATE settings SET landing_enabled=$1, banner_url=$2 WHERE id=1 RETURNING *', [landing_enabled, banner_url]);
  res.json(rows[0]);
});

module.exports = router;
