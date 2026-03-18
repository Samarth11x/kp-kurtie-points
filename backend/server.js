import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://kp-kurtie-points-frontend.vercel.app',
      process.env.CLIENT_URL,
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running...' });
});

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
