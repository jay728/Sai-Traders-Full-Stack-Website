import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required.'], trim: true, maxlength: 80 },
    phone: { type: String, required: [true, 'Phone number is required.'], trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120, default: '' },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    requirement: { type: String, required: [true, 'Requirement is required.'], trim: true, maxlength: 120 },
    message: { type: String, trim: true, maxlength: 1500, default: '' },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  },
  { timestamps: true },
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
