const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    console.log('Decoded token:', decoded); 
    const vendor = await Vendor.findById(decoded.vendorId);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    req.vendorId = vendor._id; // Attach vendor to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;