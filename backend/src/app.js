// IMPORTING MODULES
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import connectionRoutes from './routes/connection.routes.js';
import profileRoutes from './routes/profile.routes.js';
import userRoutes from './routes/user.routes.js';

// CREATE AN EXPRESS APPLICATION
const app = express();

// MIDDLEWARE SETUP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// ROUTES
// app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/connection', connectionRoutes);
app.use('/api/v1/user', userRoutes);

// EXPORTING APP
export default app;
