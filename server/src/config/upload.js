import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const MAX_FILE_SIZE_MB = 100;

const allowedExtensions = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp',
  '.mp4', '.webm', '.mov', '.m4v', '.avi',
]);

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, uploadsDir),
  filename: (request, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniqueName}${path.extname(file.originalname).toLowerCase()}`);
  },
});

// Some phones/browsers send an empty or generic MIME type, so fall back to the file extension.
const mediaFilter = (request, file, callback) => {
  const isMediaMime = /^(image|video)\//.test(file.mimetype);
  const extension = path.extname(file.originalname).toLowerCase();
  if (isMediaMime || allowedExtensions.has(extension)) return callback(null, true);
  const error = new Error(`"${file.originalname}" is not a supported image or video file.`);
  error.statusCode = 400;
  callback(error);
};

const upload = multer({ storage, fileFilter: mediaFilter, limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 } });

export default upload;
