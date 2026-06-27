import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, upload.array('images', 5), updateProduct)
  .delete(protect, deleteProduct);

export default router;
