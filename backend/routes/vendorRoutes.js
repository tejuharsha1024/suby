const vendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);
router.get('/all-vendors', vendorController.getAllVendors); // Route to get all vendors
router.get('/single-vendor/:id', vendorController.getVendorById); // Route to get vendor by ID

module.exports = router;
