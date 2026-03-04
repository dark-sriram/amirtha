import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Booking APIs
export const bookingAPI = {
  getAll: () => api.get('/bookings/all'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status?status=${status}`),
  getByUser: (userId) => api.get(`/bookings/user/${userId}`),
};

// Room APIs
export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (roomData) => api.post('/rooms', roomData),
  update: (id, roomData) => api.put(`/rooms/${id}`, roomData),
  delete: (id) => api.delete(`/rooms/${id}`),
  updateStatus: (id, status) => api.patch(`/rooms/${id}/status?status=${status}`),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
};

export default api;