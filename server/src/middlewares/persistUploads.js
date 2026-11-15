import fs from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const videoExtensions = new Set(['.mp4', '.webm', '.mov', '.m4v', '.avi']);

const isCloudinaryConfigured = () => Boolean(process.env.CLOUDINARY_URL);

const isVideo = (file) => file.mimetype.startsWith('video/') || videoExtensions.has(path.extname(file.originalname).toLowerCase());

const uploadToCloudinary = async (file) => {
  const options = { folder: process.env.CLOUDINARY_FOLDER || 'sai-traders' };
  const result = isVideo(file)
    ? await cloudinary.uploader.upload(file.path, { ...options, resource_type: 'video', format: 'mp4' })
    : await cloudinary.uploader.upload(file.path, { ...options, resource_type: 'image' });
  return result.secure_url;
};

// Render's disk is wiped on every restart/redeploy, so uploaded files are moved to Cloudinary
// when CLOUDINARY_URL is set. Without it (local development) files stay in /uploads.
const persistUploads = async (request, response, next) => {
  const files = request.file ? [request.file] : Object.values(request.files || {}).flat();
  if (files.length === 0) return next();

  if (!isCloudinaryConfigured()) {
    files.forEach((file) => { file.url = `/uploads/${file.filename}`; });
    return next();
  }

  try {
    for (const file of files) {
      file.url = await uploadToCloudinary(file);
    }
    next();
  } catch (error) {
    const uploadError = new Error(`Media upload failed: ${error.message || error.error?.message || 'unknown error'}`);
    uploadError.statusCode = error.http_code && error.http_code < 500 ? 400 : 502;
    next(uploadError);
  } finally {
    await Promise.all(files.map((file) => fs.unlink(file.path).catch(() => {})));
  }
};

export default persistUploads;
