const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  
  // Store multiple images with both the secure_url and public_id
  images: [
    {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }  // Store public_id for deletion
    }
  ],
  
  mobileNumber: { type: String, required: true },
  biddingStartDate: { type: Date, required: true },
  biddingStartTime: { type: String, required: true },
  biddingStartPrice: { type: Number, required: true },
  tempuseremail: { type: String, required: false },
  tempamount: { type: Number, required: false },
  tempname:{ type: String, required: false},
  biddingEndTime:{ type: String, required: true },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);