import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import wishlistRouter from './routes/wishlist.route.js';

dotenv.config();

const port = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB success!');
  })
  .catch(() => {
    console.log('Connection is failed!!!');
  });

const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/wishlist', wishlistRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Iternal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
