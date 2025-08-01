const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    area: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'],
            },
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'italian', 'mexican', 'continental'],
            },
        ]
    },
    offer: {
        type: String,
        trim: true,
    },
    image: {
        type: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        }
    ],
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;

