CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  time TIMESTAMP,
  banner_url TEXT
);

CREATE TABLE IF NOT EXISTS specials (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  landing_enabled BOOLEAN DEFAULT true,
  banner_url TEXT
);

INSERT INTO settings (id, landing_enabled, banner_url)
  VALUES (1, true, '/public/banner.jpg')
  ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  party_size INT,
  time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
