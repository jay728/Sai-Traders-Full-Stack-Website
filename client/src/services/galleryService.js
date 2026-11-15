import api from '../config/api.js';

export const getGalleryItems = (params) => api.get('/gallery', { params });
export const createGalleryItem = (data, config) => api.post('/gallery', data, config);
export const updateGalleryItem = (id, data, config) => api.put(`/gallery/${id}`, data, config);
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);
