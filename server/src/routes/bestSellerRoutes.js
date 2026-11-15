import { Router } from 'express';
import {
  createBestSeller,
  deleteBestSeller,
  getBestSellerById,
  getBestSellers,
  updateBestSeller,
} from '../controllers/bestSellerController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js';
import persistUploads from '../middlewares/persistUploads.js';

const router = Router();

router.route('/').get(getBestSellers).post(protect, upload.single('image'), persistUploads, createBestSeller);
router.route('/:id').get(getBestSellerById).put(protect, upload.single('image'), persistUploads, updateBestSeller).delete(protect, deleteBestSeller);

export default router;
