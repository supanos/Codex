# Supono's Sports Bar

Full-stack web application for a sports bar built with React, Express and PostgreSQL. Provides live NFL and MLB scores, events management and a landing page toggle.

## Deployment

1. Copy `.env.example` to `.env` and adjust values if needed.
2. Build and start the stack:

```bash
docker compose up -d --build
```

3. Visit `http://YOUR_SERVER_IP:3000` for the frontend. All API routes are served under `/api/*` and proxied through the frontend.

## Services
- **frontend**: React app built with Vite and served via Nginx on port 3000.
- **backend**: Express API on port 5000 with PostgreSQL storage.
- **db**: PostgreSQL 15 with persistent volume `db-data`.

## Features
- Live NFL & MLB scores fetched from ESPN.
- Admin login with JWT and events CRUD endpoints.
- Contact and reservation routes.
- Landing page and banner settings stored in the database.
