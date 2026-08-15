import { Router } from 'express';
import { createInquiry, deleteInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(protect, getInquiries).post(createInquiry);
router.route('/:id/status').patch(protect, updateInquiryStatus);
router.route('/:id').delete(protect, deleteInquiry);

export default router;
