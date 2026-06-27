const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    name: { type: String, required: true }
  },
  images: [{ type: String }],
  specifications: [specificationSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
