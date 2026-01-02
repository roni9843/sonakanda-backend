const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const { sendSuccess } = require('./utils/response');

const app = express();

// Built-in middleware to parse JSON request body
app.use(express.json());

// CORS configuration to allow frontend at http://localhost:5173
app.use(
  cors({
    origin: 'http://localhost:5173',
    origin: 'https://roni9843.github.io',
  }),
);

// Simple health check route
app.get('/api/health', (req, res) => {
  return sendSuccess(res, { message: 'Sonakanda backend API is running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Not found handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = app;
