const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  eventType: { type: String },
  budget: { type: String },
  requirements: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'completed'], default: 'pending' },
  inquiryType: { type: String, enum: ['product', 'custom'], default: 'custom' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
