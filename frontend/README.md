# KP Kurtie Point — Frontend

A **Next.js (App Router)** frontend for the KP Kurtie Point e-commerce store.

## 🚀 Getting Started

1. **Copy environment variables**
   - Create a `.env.local` file based on `.env.example`.

2. **Install dependencies**

```bash
npm install
```

3. **Start the dev server**

```bash
npm run dev
```

4. Open http://localhost:3000


## 🧩 Notes

- The frontend expects the backend API at `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`).
- API calls are made to `/api/products`, `/api/users`, etc.

## 🛠️ Build / Production

```bash
npm run build
npm start
```

## ✅ Project Structure

- `src/app` — app router pages + layouts
- `src/components` — shared UI components

## 🔧 Adding features

If you add new API endpoints in the backend, ensure the frontend uses `process.env.NEXT_PUBLIC_API_URL` so the base URL can be configured for staging and production.
