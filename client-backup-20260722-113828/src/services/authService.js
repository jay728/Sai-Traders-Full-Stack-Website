import api from '../config/api';

export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
