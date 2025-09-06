# Supono's Sports Bar

A frontend-only React application built with Vite.

## Development

```bash
cd client
npm install
npm run dev
```

## DigitalOcean App Platform

Configure a single Buildpack service with the following settings:

- **Root directory:** `client`
- **Build command:** `npm ci && npm run build`
- **Run command:** `npx serve -s dist -l 8080`
- **HTTP Port:** `8080`

Optional environment variables can be defined in `client/.env` (see `client/.env.example`).
