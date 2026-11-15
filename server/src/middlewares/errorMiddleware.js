import multer from 'multer';
import { MAX_FILE_SIZE_MB, MAX_IMAGE_SIZE_MB } from '../config/upload.js';

const multerMessages = {
  LIMIT_FILE_SIZE: `File is too large. Videos can be up to ${MAX_FILE_SIZE_MB} MB and images up to ${MAX_IMAGE_SIZE_MB} MB.`,
  LIMIT_FILE_COUNT: 'Too many files. You can upload up to 6 files at a time.',
  LIMIT_UNEXPECTED_FILE: 'Too many files. You can upload up to 6 files at a time.',
};

export const notFound = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
};

export const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error instanceof multer.MulterError) {
    return response.status(400).json({
      success: false,
      message: multerMessages[error.code] || error.message,
    });
  }

  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Something went wrong on the server.',
  });
};
