import api from '../config/api.js';

export const getProducts = (params) => api.get('/products', { params });
export const getProductBySlug = (slug) => api.get(`/products/slug/${slug}`);
export const createProduct = (data, config) => api.post('/products', data, config);
export const updateProduct = (id, data, config) => api.put(`/products/${id}`, data, config);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
