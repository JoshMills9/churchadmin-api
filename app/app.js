const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


const usersRoute = require('./routes/users-route');
const otpRoute = require('./routes/otp-generator')

const app = express();


app.use(bodyParser.json());

app.use('/admin/otp', otpRoute);
app.use('/admin/users', usersRoute);


app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error)
  }

  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred.'})
}
)


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
