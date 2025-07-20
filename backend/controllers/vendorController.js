const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  vendorRegister,
};

