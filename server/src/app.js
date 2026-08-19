import cors from 'cors';
import express from 'express';
import env from './config/env.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Serve static files with proper headers for video files
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  express.static('uploads', {
    setHeaders: (res, path) => {
      if (path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.ogg')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    }
  })(req, res, next);
});

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Welcome to the Plastic Business Management API.',
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/gallery', galleryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
