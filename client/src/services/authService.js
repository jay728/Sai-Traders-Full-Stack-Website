import api from '../config/api.js';

export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const verifyResetCode = (email, code) => api.post('/auth/verify-reset-code', { email, code });
export const resetPassword = (email, code, newPassword) => api.post('/auth/reset-password', { email, code, newPassword });
