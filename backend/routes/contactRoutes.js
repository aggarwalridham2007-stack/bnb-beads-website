import express from 'express';
import { 
  createInquiry, 
  getInquiries, 
  updateInquiryStatus 
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to submit an inquiry
router.post('/', createInquiry);

// Protected routes for admin to view/manage inquiries
router.route('/')
  .get(protect, getInquiries);

router.route('/:id')
  .put(protect, updateInquiryStatus);

export default router;
