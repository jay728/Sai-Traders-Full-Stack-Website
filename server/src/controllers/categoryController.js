import mongoose from 'mongoose';
import Category from '../models/Category.js';
import createSlug from '../utils/slugify.js';

const isValidId = (id) => mongoose.isValidObjectId(id);

export const getCategories = async (request, response, next) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, name: 1 });

    response.status(200).json({
      success: true,
      message: 'Categories fetched successfully.',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (request, response, next) => {
  try {
    const { name, description, displayOrder, isActive } = request.body;
    const image = request.file ? `/uploads/${request.file.filename}` : '';

    if (!name?.trim()) {
      return response.status(400).json({
        success: false,
        message: 'Category name is required.',
      });
    }

    const slug = createSlug(name);
    const existingCategory = await Category.findOne({ $or: [{ name: name.trim() }, { slug }] });

    if (existingCategory) {
      return response.status(409).json({
        success: false,
        message: 'A category with this name already exists.',
      });
    }

    const category = await Category.create({ name, slug, description, displayOrder, isActive, image });

    response.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!isValidId(id)) {
      return response.status(400).json({ success: false, message: 'Invalid category ID.' });
    }

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({ success: false, message: 'Category not found.' });
    }

    const { name, description, displayOrder, isActive } = request.body;
    const image = request.file ? `/uploads/${request.file.filename}` : undefined;

    if (name !== undefined) {
      if (!name.trim()) {
        return response.status(400).json({ success: false, message: 'Category name cannot be empty.' });
      }

      const slug = createSlug(name);
      const duplicateCategory = await Category.findOne({ _id: { $ne: id }, $or: [{ name: name.trim() }, { slug }] });

      if (duplicateCategory) {
        return response.status(409).json({ success: false, message: 'A category with this name already exists.' });
      }

      category.name = name;
      category.slug = slug;
    }

    if (description !== undefined) category.description = description;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (isActive !== undefined) category.isActive = isActive;
    if (image !== undefined) category.image = image;

    const updatedCategory = await category.save();

    response.status(200).json({
      success: true,
      message: 'Category updated successfully.',
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!isValidId(id)) {
      return response.status(400).json({ success: false, message: 'Invalid category ID.' });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return response.status(404).json({ success: false, message: 'Category not found.' });
    }

    response.status(200).json({
      success: true,
      message: 'Category deleted successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
