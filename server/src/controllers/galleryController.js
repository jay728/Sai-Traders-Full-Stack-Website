import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';

const isValidId = (id) => mongoose.isValidObjectId(id);
const filePaths = (files) => files?.map((file) => `/uploads/${file.filename}`) || [];

export const getGalleryItems = async (request, response, next) => {
  try {
    const filter = request.query.active === 'true' ? { isActive: true } : {};
    const galleryItems = await Gallery.find(filter).sort({ createdAt: -1 });
    response.status(200).json({ success: true, message: 'Gallery items fetched successfully.', data: galleryItems });
  } catch (error) { next(error); }
};

export const createGalleryItem = async (request, response, next) => {
  try {
    const { title, description, type, isActive } = request.body;
    const images = filePaths(request.files);
    if (!title?.trim() || images.length === 0) return response.status(400).json({ success: false, message: 'Gallery title and at least one image are required.' });
    const galleryItem = await Gallery.create({ title, description, type, images, isActive });
    response.status(201).json({ success: true, message: 'Gallery item created successfully.', data: galleryItem });
  } catch (error) { next(error); }
};

export const updateGalleryItem = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!isValidId(id)) return response.status(400).json({ success: false, message: 'Invalid gallery ID.' });
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) return response.status(404).json({ success: false, message: 'Gallery item not found.' });
    const { title, description, type, isActive } = request.body;
    const images = filePaths(request.files);
    if (title !== undefined) galleryItem.title = title;
    if (description !== undefined) galleryItem.description = description;
    if (type !== undefined) galleryItem.type = type;
    if (isActive !== undefined) galleryItem.isActive = isActive;
    if (images.length > 0) galleryItem.images = [...galleryItem.images, ...images];
    const updatedGalleryItem = await galleryItem.save();
    response.status(200).json({ success: true, message: 'Gallery item updated successfully.', data: updatedGalleryItem });
  } catch (error) { next(error); }
};

export const deleteGalleryItem = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ success: false, message: 'Invalid gallery ID.' });
    const galleryItem = await Gallery.findByIdAndDelete(request.params.id);
    if (!galleryItem) return response.status(404).json({ success: false, message: 'Gallery item not found.' });
    response.status(200).json({ success: true, message: 'Gallery item deleted successfully.', data: galleryItem });
  } catch (error) { next(error); }
};
