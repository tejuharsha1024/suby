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
                enum: ['south-indain', 'north-indian', 'chinese', 'italian', 'mexican', 'continental'],
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
    ]
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;

