const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');

const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm); // Use verifyToken middleware to protect the route

router.get('uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `uploads/${imageName}`;
  res.headersSent('Content-Type', 'image/jpeg');
    // res.sendFile(imagePath, { root: __dirname });
    res.sendFile(path.join(__dirname, '..', imagePath), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('File not found');
        }
    });
});

//router.delete('/:firmId', verifyToken, firmController.deleteFirmById); // Route to delete a firm by ID
router.delete('/:firmId', firmController.deleteFirmById); // Route to delete a firm by ID

module.exports = router;