import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js';
import persistUploads from '../middlewares/persistUploads.js';

const router = Router();

router.route('/').get(getSettings).put(protect, upload.single('logo'), persistUploads, updateSettings);

export default router;
