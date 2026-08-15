import mongoose from 'mongoose';

const bestSellerSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      maxlength: [120, 'Product name cannot be longer than 120 characters.'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required.'],
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const BestSeller = mongoose.model('BestSeller', bestSellerSchema);

export default BestSeller;
