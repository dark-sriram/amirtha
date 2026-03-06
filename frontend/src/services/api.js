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

// Room APIs
export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id) => api.get(`/rooms/${id}`),
  getAvailable: (checkIn, checkOut) =>
    api.get(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`),
  create: (roomData) => api.post('/rooms', roomData),
  update: (id, roomData) => api.put(`/rooms/${id}`, roomData),
  delete: (id) => api.delete(`/rooms/${id}`),
  updateStatus: (id, status) => api.patch(`/rooms/${id}/status?status=${status}`),
};

// Booking APIs
export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getAll: () => api.get('/bookings/all'),
  getById: (id) => api.get(`/bookings/${id}`),
  getByUser: (userId) => api.get(`/bookings/user/${userId}`),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status?status=${status}`),
};

// Payment APIs
export const paymentAPI = {
  create: (paymentData) => api.post('/payments', paymentData),
  getByBooking: (bookingId) => api.get(`/payments/booking/${bookingId}`),
};

export default api;