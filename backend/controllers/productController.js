import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const category = req.query.category ? { category: req.query.category } : {};
    
    const products = await Product.find({ ...keyword, ...category }).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, isFeatured } = req.body;
    let specifications = [];
    if (req.body.specifications) {
       try {
         specifications = JSON.parse(req.body.specifications);
       } catch(e) {
         specifications = req.body.specifications;
       }
    }
    
    // Uploaded image URLs from Cloudinary
    const images = req.files ? req.files.map(file => file.path) : [];

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      specifications
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, isFeatured } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.isFeatured = isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : product.isFeatured;
      
      if (req.body.specifications) {
        try {
          product.specifications = JSON.parse(req.body.specifications);
        } catch(e) {
          product.specifications = req.body.specifications;
        }
      }

      if (req.files && req.files.length > 0) {
        product.images = req.files.map(file => file.path);
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
