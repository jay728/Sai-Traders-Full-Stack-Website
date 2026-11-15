import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import upload from '../config/upload.js';
import { protect } from '../middlewares/authMiddleware.js';
import persistUploads from '../middlewares/persistUploads.js';

const router = Router();

router.route('/').get(getCategories).post(protect, upload.single('image'), persistUploads, createCategory);
router.route('/:id').put(protect, upload.single('image'), persistUploads, updateCategory).delete(protect, deleteCategory);

export default router;
