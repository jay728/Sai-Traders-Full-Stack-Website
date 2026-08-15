import { Router } from 'express';
import upload from '../config/upload.js';
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from '../controllers/galleryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(getGalleryItems).post(protect, upload.array('images', 6), createGalleryItem);
router.route('/:id').put(protect, upload.array('images', 6), updateGalleryItem).delete(protect, deleteGalleryItem);

export default router;
