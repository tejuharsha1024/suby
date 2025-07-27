const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

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

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        
        const image = req.file ? req.file.filename : undefined; // Get the image path from multer
       
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        const newFirm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id // Associate the firm with the vendor
        });

        await newFirm.save();

        // Optionally, you can also update the Vendor model to include this firm
        await Vendor.findByIdAndUpdate(vendorId, { $push: { firms: newFirm._id } });

        res.status(201).json({ message: 'Firm added successfully', firm: newFirm });
    } catch (error) {
        console.error('Error adding firm:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addFirm: [upload.single('image'), addFirm], // Use multer middleware to handle file upload    
};