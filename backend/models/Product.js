const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'],
            },
        ]
    },
    image: {
        type: String,
    },
    bestseller: {
        type: String
    },
    description: {
        type: String,
        trim: true,
    },     
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;