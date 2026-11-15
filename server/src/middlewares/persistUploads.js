import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import { isVideo, MAX_IMAGE_SIZE_MB } from '../config/upload.js';

const isCloudinaryConfigured = () => Boolean(process.env.CLOUDINARY_URL);

const findOversizedImage = (files) => files.find((file) => !isVideo(file) && file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024);

const removeTempFiles = (files) => Promise.all(files.map((file) => fs.unlink(file.path).catch(() => {})));

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

  const oversizedImage = findOversizedImage(files);
  if (oversizedImage) {
    await removeTempFiles(files);
    const error = new Error(`"${oversizedImage.originalname}" is too large. Images must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`);
    error.statusCode = 400;
    return next(error);
  }

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
    await removeTempFiles(files);
  }
};

export default persistUploads;
