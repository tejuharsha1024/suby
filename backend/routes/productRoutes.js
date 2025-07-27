const express = require('express');
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');

const router = express.Router();
//router.post('/add-product/:firmId', verifyToken, productController.addProduct); // Use verifyToken middleware to protect the route
router.post('/add-product/:firmId', productController.addProduct); // Use verifyToken middleware to protect the route
router.get('/:firmId/products', productController.getProductByFirm); // Route to get products by firm ID

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

router.delete('/:productId', productController.deleteProductById); // Route to delete a product by ID

module.exports = router;