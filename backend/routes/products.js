const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, category, specifications } = req.body;
    
    // Cloudinary returns the secure_url for each uploaded file
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    // Parse specifications if sent as string (from FormData)
    let parsedSpecs = [];
    if (specifications) {
      try {
        parsedSpecs = JSON.parse(specifications);
      } catch (e) {
        console.error("Error parsing specifications", e);
      }
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      category: { name: category },
      images: imageUrls,
      specifications: parsedSpecs
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update a product
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, category, specifications } = req.body;
    
    // Cloudinary returns the secure_url for each newly uploaded file
    const newImageUrls = req.files ? req.files.map(file => file.path) : [];

    // Parse specifications if sent as string (from FormData)
    let parsedSpecs = [];
    if (specifications) {
      try {
        parsedSpecs = JSON.parse(specifications);
      } catch (e) {
        console.error("Error parsing specifications", e);
      }
    }

    const updateData = {
      name,
      price: Number(price),
      category: { name: category },
      specifications: parsedSpecs
    };

    if (newImageUrls.length > 0) {
      updateData.images = newImageUrls; // Overwrite images if new ones are uploaded
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
