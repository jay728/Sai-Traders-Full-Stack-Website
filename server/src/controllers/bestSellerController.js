import mongoose from 'mongoose';
import BestSeller from '../models/BestSeller.js';

const isValidId = (id) => mongoose.isValidObjectId(id);
const filePath = (file) => file ? `/uploads/${file.filename}` : null;

export const getBestSellers = async (request, response, next) => {
  try {
    const filter = {};

    if (request.query.active === 'true') filter.status = true;

    const bestSellers = await BestSeller.find(filter).sort({ displayOrder: 1, createdAt: -1 });

    response.status(200).json({
      success: true,
      message: 'Best sellers fetched successfully.',
      data: bestSellers,
    });
  } catch (error) {
    next(error);
  }
};

export const getBestSellerById = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ success: false, message: 'Invalid best seller ID.' });
    }

    const bestSeller = await BestSeller.findById(request.params.id);

    if (!bestSeller) {
      return response.status(404).json({ success: false, message: 'Best seller not found.' });
    }

    response.status(200).json({ success: true, message: 'Best seller fetched successfully.', data: bestSeller });
  } catch (error) {
    next(error);
  }
};

export const createBestSeller = async (request, response, next) => {
  try {
    const { productName, displayOrder, status } = request.body;

    if (!productName?.trim()) {
      return response.status(400).json({ success: false, message: 'Product name is required.' });
    }

    if (!request.file) {
      return response.status(400).json({ success: false, message: 'Product image is required.' });
    }

    const image = filePath(request.file);

    const bestSeller = await BestSeller.create({
      productName: productName.trim(),
      image,
      displayOrder: displayOrder || 0,
      status: status !== undefined ? status : true,
    });

    response.status(201).json({ success: true, message: 'Best seller created successfully.', data: bestSeller });
  } catch (error) {
    next(error);
  }
};

export const updateBestSeller = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!isValidId(id)) {
      return response.status(400).json({ success: false, message: 'Invalid best seller ID.' });
    }

    const bestSeller = await BestSeller.findById(id);

    if (!bestSeller) {
      return response.status(404).json({ success: false, message: 'Best seller not found.' });
    }

    const { productName, displayOrder, status } = request.body;

    if (productName !== undefined) {
      if (!productName.trim()) {
        return response.status(400).json({ success: false, message: 'Product name cannot be empty.' });
      }
      bestSeller.productName = productName.trim();
    }

    if (request.file) {
      bestSeller.image = filePath(request.file);
    }

    if (displayOrder !== undefined) bestSeller.displayOrder = displayOrder;
    if (status !== undefined) bestSeller.status = status;

    const updatedBestSeller = await bestSeller.save();

    response.status(200).json({ success: true, message: 'Best seller updated successfully.', data: updatedBestSeller });
  } catch (error) {
    next(error);
  }
};

export const deleteBestSeller = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ success: false, message: 'Invalid best seller ID.' });
    }

    const bestSeller = await BestSeller.findByIdAndDelete(request.params.id);

    if (!bestSeller) {
      return response.status(404).json({ success: false, message: 'Best seller not found.' });
    }

    response.status(200).json({ success: true, message: 'Best seller deleted successfully.', data: bestSeller });
  } catch (error) {
    next(error);
  }
};
