const express = require('express');
const { pool } = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY time');
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { title, description, time, banner_url } = req.body;
  const { rows } = await pool.query('INSERT INTO events(title, description, time, banner_url) VALUES($1,$2,$3,$4) RETURNING *', [title, description, time, banner_url]);
  res.json(rows[0]);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, time, banner_url } = req.body;
  const { rows } = await pool.query('UPDATE events SET title=$1, description=$2, time=$3, banner_url=$4 WHERE id=$5 RETURNING *', [title, description, time, banner_url, id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM events WHERE id=$1', [id]);
  res.sendStatus(204);
});

module.exports = router;
