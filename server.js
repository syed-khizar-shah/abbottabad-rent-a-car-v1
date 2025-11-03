const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Try .env.local first (Next.js convention), then .env
const envLocalPath = path.resolve(__dirname, '.env.local');
const envPath = path.resolve(__dirname, '.env');
const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
require('dotenv').config({ path: envFile });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const apiPort = parseInt(process.env.API_PORT || '5000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Start Express API server
const startApiServer = () => {
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const cookieParser = require('cookie-parser');

  const apiApp = express();

  // Middleware
  apiApp.use(
    cors({
      origin: process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`,
      credentials: true,
    })
  );
  apiApp.use(express.json());
  apiApp.use(cookieParser());

  // Database connection with auto-reconnect
  const connectDB = async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        console.log('✅ MongoDB already connected');
        return;
      }

      await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB connected successfully');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      // Retry connection after 5 seconds
      setTimeout(() => {
        console.log('🔄 Retrying MongoDB connection...');
        connectDB();
      }, 5000);
    }
  };

  // Initial connection
  connectDB();

  // Handle connection events
  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected. Reconnecting...');
    connectDB();
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  // Middleware to ensure DB connection before handling API requests
  apiApp.use('/api/*', async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      console.log('🔄 Database not connected, attempting connection...');
      try {
        await connectDB();
        // Wait a bit for connection to establish
        let attempts = 0;
        while (mongoose.connection.readyState !== 1 && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          attempts++;
        }
        if (mongoose.connection.readyState !== 1) {
          return res.status(503).json({ error: 'Database connection timeout' });
        }
      } catch (err) {
        console.error('Failed to connect to database:', err);
        return res.status(503).json({ error: 'Database connection failed' });
      }
    }
    next();
  });

  // Routes
  apiApp.use('/api/auth', require('./server/routes/auth'));
  apiApp.use('/api/cars', require('./server/routes/cars'));
  apiApp.use('/api/categories', require('./server/routes/categories'));
  apiApp.use('/api/homepage', require('./server/routes/homepage'));
  apiApp.use('/api/admin', require('./server/routes/admin'));

  // Health check
  apiApp.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
  });

  apiApp.listen(apiPort, () => {
    console.log(`🚀 API Server running on http://${hostname}:${apiPort}`);
  });
};

app.prepare().then(() => {
  // Start API server
  startApiServer();

  // Create HTTP server for Next.js
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> API Server running on http://${hostname}:${apiPort}`);
  });
});

