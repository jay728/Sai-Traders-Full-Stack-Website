import axios from 'axios';

export const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const apiOrigin = apiBaseUrl.replace(/\/api$/, '');

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
