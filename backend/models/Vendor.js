const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
    email: {
    type: String,
    required: true, 
    unique: true,
    trim: true, 
  },
    password: {
    type: String,
    required: true, 
    //minlength: 6,
  },
//     phone: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//     address: {  
//     type: String,
//     required: true,
//     trim: true,
//   },
//     createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor; 