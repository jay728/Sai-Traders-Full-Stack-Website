import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

const isValidId = (id) => mongoose.isValidObjectId(id);

export const createInquiry = async (request, response, next) => {
  try {
    const { name, phone, email, company, requirement, message } = request.body;

    if (!name?.trim() || !phone?.trim() || !requirement?.trim()) {
      return response.status(400).json({ success: false, message: 'Name, phone number, and requirement are required.' });
    }

    const inquiry = await Inquiry.create({ name, phone, email, company, requirement, message });

    response.status(201).json({ success: true, message: 'Inquiry sent successfully. We will contact you soon.', data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (request, response, next) => {
  try {
    const filter = request.query.status ? { status: request.query.status } : {};
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

    response.status(200).json({ success: true, message: 'Inquiries fetched successfully.', data: inquiries });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    if (!isValidId(id)) return response.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    if (!['New', 'Contacted', 'Closed'].includes(status)) return response.status(400).json({ success: false, message: 'Please select a valid inquiry status.' });

    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!inquiry) return response.status(404).json({ success: false, message: 'Inquiry not found.' });

    response.status(200).json({ success: true, message: 'Inquiry status updated successfully.', data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ success: false, message: 'Invalid inquiry ID.' });

    const inquiry = await Inquiry.findByIdAndDelete(request.params.id);

    if (!inquiry) return response.status(404).json({ success: false, message: 'Inquiry not found.' });

    response.status(200).json({ success: true, message: 'Inquiry deleted successfully.', data: inquiry });
  } catch (error) {
    next(error);
  }
};
