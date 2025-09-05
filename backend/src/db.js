const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function init() {
  const initSql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
  await pool.query(initSql);
}

module.exports = { pool, init };
