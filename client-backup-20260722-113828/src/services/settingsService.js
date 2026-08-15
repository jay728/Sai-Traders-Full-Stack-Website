import api from '../config/api';

export const getSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);
