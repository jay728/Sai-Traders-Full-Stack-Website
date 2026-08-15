import api from '../config/api';

export const submitInquiry = (inquiryData) => api.post('/inquiries', inquiryData);
export const getInquiries = () => api.get('/inquiries');
export const updateInquiryStatus = (id, data) => api.put(`/inquiries/${id}`, data);
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`);
export const getInquiryById = (id) => api.get(`/inquiries/${id}`);
