const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Store the file in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add unique timestamp and original file extension
    }
});

// Initialize multer with storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit the file size (e.g., 10MB)
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error('Only image files are allowed!'), false); // Reject non-image files
        }
    }
});

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        
        const image = req.file ? req.file.filename : undefined; // Get the image path from multer
        
        const firmId = req.params.firmId; // Assuming firmId is passed in the request parameters
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(400).json({ error: 'Firm ID is required' });
        }
       
        const newProduct = new Product({
            productName,
            price,
            category,
            bestseller,
            image,
            description,
            firm: firm._id // Associate the product with the firm
        });

        const savedProduct = await newProduct.save();

        firm.product.push(savedProduct); // Add the product to the firm's product list
        await firm.save(); // Save the updated firm

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: error.message });
    }
}; 

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId); // Populate the 'firm' field with firm details
        if (!firm) {
            return res.status(404).json({ error: 'No firm found' });
        }

        const firmName = firm.firmName; // Get the firm name
        console.log('Firm Name:', firmName); // Log the firm name for debugging
        const products = await Product.find({ firm: firmId }).populate('firm'); // Find products by firm ID and populate the 'firm' field
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found for this firm' });
        }
        console.log('Products fetched successfully:', products);
        // res.status(200).json(products);
        res.status(200).json({ firmName, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    addProduct:[upload.single('image'), addProduct], // Export the multer upload middleware and the addProduct function
    getProductByFirm,
    deleteProductById
};