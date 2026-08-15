import { Router } from 'express';
import { getCurrentUser, login, forgotPassword, verifyResetCode, resetPassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getCurrentUser);

export default router;
