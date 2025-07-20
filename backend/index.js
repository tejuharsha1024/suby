const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');

const app = express();

const PORT = 4000;

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

}).then(() => {
  console.log('Connected to MongoDB');  
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/home', (req, res) => {
  res.send('<h1>Welcome to the SUBY!</h1>');
});