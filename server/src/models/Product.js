import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      unique: true,
      maxlength: [120, 'Product name cannot be longer than 120 characters.'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required.'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be longer than 1000 characters.'],
      default: '',
    },
    material: {
      type: String,
      enum: ['PP', 'ABS', 'Other'],
      default: 'Other',
    },
    finishType: {
      type: String,
      enum: ['Chrome', 'Rainbow', 'Custom'],
      default: 'Custom',
    },
    images: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
