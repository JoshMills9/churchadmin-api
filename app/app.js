const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Routes
const usersRoute = require('./routes/users-route');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/admin/users', usersRoute);

// Constants
const MONGO_URI = process.env.MONGODB_KEY;
const PORT = process.env.PORT || 3000;

// MongoDB connection and server start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if DB connection fails
  });
