import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Gallery title is required.'], trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  type: { type: String, enum: ['Product', 'Factory', 'Finish', 'Equipment', 'Company Video', 'Hero Video', 'Hero Image'], default: 'Product' },
  images: { type: [String], required: [true, 'At least one image is required.'] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
