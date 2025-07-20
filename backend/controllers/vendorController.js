const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const secretkey = process.env.JWT_SECRET;

const vendorRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      //return res.status(400).json({ message: 'Vendor already exists' });
      return res.status(400).json('Vendor already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new vendor
    const newVendor = new Vendor({ username, email, password: hashedPassword });
    await newVendor.save();

    //res.status(201).json({ message: 'Vendor registered successfully' });
    res.status(201).json({ message: 'Vendor registered successfully' });
    console.log('Vendor registered successfully:', newVendor);
  } catch (error) {
    console.error('Error registering vendor:', error);
    //res.status(500).json({ message: 'Internal server error' });
    res.status(500).json({ error: error.message });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    // if (!vendor) {  
    //   return res.status(400).json({ message: 'Vendor not found' });
    // }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    // if (!isPasswordValid) {
    //   return res.status(400).json({ message: 'Invalid password' });
    // }

    if(!vendor || !isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // res.status(200).json({ message: 'Vendor logged in successfully' });
    // console.log('Vendor logged in successfully:', vendor.username);

    // Generate JWT token
    const token = jwt.sign({ vendorId: vendor._id }, secretkey, {  
      expiresIn: '1h',
    });
    res.status(200).json({ sucess: "Login Successful", token, vendorId: vendor._id });
    console.log('Vendor logged in successfully:', token);
  } catch (error) {
    console.error('Error logging in vendor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  vendorRegister,
  vendorLogin,
};

