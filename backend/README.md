# KP Kurtie Point — Backend

An Express.js + MongoDB API for the KP Kurtie Point store.

## 🔥 Quick start

1. Copy `.env.example` to `.env` and fill in the values.
2. Install dependencies:

```bash
npm install
```

3. Seed sample data (optional):

```bash
npm run data:import
```

4. Start the server (dev):

```bash
npm run dev
```

The API will run at `http://localhost:5000` by default.

## 🧱 Available routes

- `GET /api/health` - simple health check
- `GET /api/products` - list products
- `GET /api/products/:id` - get product by ID
- `GET /api/products/slug/:slug` - get product by slug
- `POST /api/products` - create product (admin only)
- `PUT /api/products/:id` - update product (admin only)
- `DELETE /api/products/:id` - delete product (admin only)
- `POST /api/users` - register
- `POST /api/users/auth` - login
- `POST /api/users/logout` - logout
- `GET /api/users/profile` - get profile (requires auth)

## 🧠 Notes

- Uses JWT stored in a secure cookie (`jwt`).
- CORS is restricted to `FRONTEND_URL` (defaults to `http://localhost:3000`).

## 🧪 Error handling

Errors are returned as JSON with `message` and, in development, a `stack`.
