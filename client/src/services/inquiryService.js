import api from '../config/api.js';

export const submitInquiry = (inquiryData) => api.post('/inquiries', inquiryData);
export const getInquiries = () => api.get('/inquiries');
export const updateInquiryStatus = (id, data) => api.patch(`/inquiries/${id}/status`, data);
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`);
export const getInquiryById = (id) => api.get(`/inquiries/${id}`);
