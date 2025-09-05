const bcrypt = require('bcrypt');
const { pool, init } = require('./db');

async function seed() {
  await init();
  const password = await bcrypt.hash('admin123', 10);
  await pool.query("INSERT INTO users(username,password_hash) VALUES('admin',$1) ON CONFLICT DO NOTHING", [password]);
  await pool.query("INSERT INTO events(title,description,time) VALUES ('Happy Hour','Discounted drinks','2025-01-01T17:00:00Z') ON CONFLICT DO NOTHING");
  await pool.query("INSERT INTO specials(title,description) VALUES ('2-for-1 Wings','All day Monday') ON CONFLICT DO NOTHING");
  process.exit();
}
seed();
