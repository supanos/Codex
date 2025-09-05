# Supono's Sports Bar

Full-stack web application for a sports bar built with **React**, **Express**, and **PostgreSQL**.  
Provides live NFL and MLB scores, events management, specials, contact form, and a landing page toggle.

---

## 🚀 Deployment

1. Copy `.env.example` to `.env` and adjust values if needed.
2. Build and start the stack:

   ```bash
   docker compose up -d --build
Seed the database (creates default admin admin/admin123):

bash
Kodu kopyala
docker compose run --rm backend npm run seed
Visit http://localhost:3000 for the frontend.
All API routes are served under /api/* and proxied through the frontend.

🛠️ Services
frontend → React app built with Vite and served via Nginx on port 3000.

backend → Express API on port 5000 with PostgreSQL storage.

db → PostgreSQL 15 with persistent volume db-data.

✨ Features
📡 Live NFL & MLB scores fetched from ESPN.

🔄 Scoreboard auto-refreshes every 60 seconds.

🔑 Admin login with JWT and events CRUD endpoints (default user: admin/admin123).

📅 Events and reservations management.

📬 Contact form with optional SMTP integration.

🏷️ Specials management.

🎯 Landing page and banner settings stored in the database.

📦 Tech Stack
Frontend: React + Vite + Nginx

Backend: Node.js + Express

Database: PostgreSQL

Auth: JWT-based authentication

Deployment: Docker & Docker Compose

👨‍💻 Default Admin
Username: admin

Password: admin123

📄 License
This project is licensed under the MIT License.