import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import createSlug from '../utils/slugify.js';

const isValidId = (id) => mongoose.isValidObjectId(id);
const filePaths = (files) => {
  const baseUrl = process.env.API_URL || 'http://localhost:5000';
  return files?.map((file) => `${baseUrl}/uploads/${file.filename}`) || [];
};

const populateCategory = (query) => query.populate('category', 'name slug');

const validateCategory = async (categoryId) => {
  if (!isValidId(categoryId)) {
    return null;
  }

  return Category.findById(categoryId);
};

export const getProducts = async (request, response, next) => {
  try {
    const filter = {};

    if (request.query.active === 'true') filter.isActive = true;
    if (request.query.featured === 'true') filter.isFeatured = true;
    if (request.query.category && isValidId(request.query.category)) filter.category = request.query.category;

    const products = await populateCategory(Product.find(filter).sort({ createdAt: -1 }));

    response.status(200).json({
      success: true,
      message: 'Products fetched successfully.',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ success: false, message: 'Invalid product ID.' });
    }

    const product = await populateCategory(Product.findById(request.params.id));

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found.' });
    }

    response.status(200).json({ success: true, message: 'Product fetched successfully.', data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (request, response, next) => {
  try {
    const { name, category, description, material, finishType, isFeatured, isActive } = request.body;

    if (!name?.trim() || !category) {
      return response.status(400).json({ success: false, message: 'Product name and category are required.' });
    }

    const categoryDocument = await validateCategory(category);

    if (!categoryDocument) {
      return response.status(400).json({ success: false, message: 'Please select a valid category.' });
    }

    const slug = createSlug(name);
    const existingProduct = await Product.findOne({ $or: [{ name: name.trim() }, { slug }] });

    if (existingProduct) {
      return response.status(409).json({ success: false, message: 'A product with this name already exists.' });
    }

    const product = await Product.create({ name, slug, category, description, material, finishType, images: filePaths(request.files), isFeatured, isActive });
    await product.populate('category', 'name slug');

    response.status(201).json({ success: true, message: 'Product created successfully.', data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!isValidId(id)) {
      return response.status(400).json({ success: false, message: 'Invalid product ID.' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found.' });
    }

    const { name, category, description, material, finishType, isFeatured, isActive } = request.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return response.status(400).json({ success: false, message: 'Product name cannot be empty.' });
      }

      const slug = createSlug(name);
      const duplicateProduct = await Product.findOne({ _id: { $ne: id }, $or: [{ name: name.trim() }, { slug }] });

      if (duplicateProduct) {
        return response.status(409).json({ success: false, message: 'A product with this name already exists.' });
      }

      product.name = name;
      product.slug = slug;
    }

    if (category !== undefined) {
      const categoryDocument = await validateCategory(category);

      if (!categoryDocument) {
        return response.status(400).json({ success: false, message: 'Please select a valid category.' });
      }

      product.category = category;
    }

    if (description !== undefined) product.description = description;
    if (material !== undefined) product.material = material;
    if (finishType !== undefined) product.finishType = finishType;
    const uploadedImages = filePaths(request.files);
    if (uploadedImages.length > 0) product.images = [...product.images, ...uploadedImages];
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (isActive !== undefined) product.isActive = isActive;

    const updatedProduct = await product.save();
    await updatedProduct.populate('category', 'name slug');

    response.status(200).json({ success: true, message: 'Product updated successfully.', data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ success: false, message: 'Invalid product ID.' });
    }

    const product = await Product.findByIdAndDelete(request.params.id);

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found.' });
    }

    response.status(200).json({ success: true, message: 'Product deleted successfully.', data: product });
  } catch (error) {
    next(error);
  }
};
