const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

}).then(() => {
  console.log('Connected to MongoDB');  
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/', (req, res) => {
  res.send('<h1>Welcome to the SUBY!</h1>');
});

app.use('/about', (req, res) => {
  res.send('<h1>Welcome to the SUBY About Page!</h1>');
});