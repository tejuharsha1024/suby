const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');

const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm); // Use verifyToken middleware to protect the route

module.exports = router;