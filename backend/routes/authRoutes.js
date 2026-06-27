import express from 'express';
import { authAdmin, registerAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authAdmin);
// Uncomment to register initial admin, then comment it out or protect it.
router.post('/register', registerAdmin);

export default router;
