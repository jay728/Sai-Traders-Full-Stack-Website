import api from '../config/api.js';

export const getSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);
