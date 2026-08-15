import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, uploadsDir),
  filename: (request, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniqueName}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const mediaFilter = (request, file, callback) => {
  const allowedMimes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'
  ];
  if (allowedMimes.includes(file.mimetype)) return callback(null, true);
  callback(new Error('Only image and video files are allowed.'));
};

const upload = multer({ storage, fileFilter: mediaFilter, limits: { fileSize: 50 * 1024 * 1024 } });

export default upload;
