import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js';
import persistUploads from '../middlewares/persistUploads.js';

const router = Router();

router.route('/').get(getProducts).post(protect, upload.array('images', 6), persistUploads, createProduct);
router.route('/:id').get(getProductById).put(protect, upload.array('images', 6), persistUploads, updateProduct).delete(protect, deleteProduct);

export default router;
