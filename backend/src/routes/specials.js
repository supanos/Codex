const express = require('express');
const { pool } = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM specials');
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const { rows } = await pool.query('INSERT INTO specials(title, description) VALUES($1,$2) RETURNING *', [title, description]);
  res.json(rows[0]);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { rows } = await pool.query('UPDATE specials SET title=$1, description=$2 WHERE id=$3 RETURNING *', [title, description, id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM specials WHERE id=$1', [id]);
  res.sendStatus(204);
});

module.exports = router;
