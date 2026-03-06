import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Customer Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import Payment from './pages/Payment';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/adminDashboard';
import AdminBookings from './pages/BookingRequests';
import AdminRooms from './pages/RoomManagement';
import AdminAllBookings from './pages/AllBookings';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />

      {/* Protected Customer Routes */}
      <Route path="/my-bookings" element={
        <ProtectedRoute><MyBookings /></ProtectedRoute>
      } />
      <Route path="/payment/:id" element={
        <ProtectedRoute><Payment /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/bookings" element={
        <ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>
      } />
      <Route path="/admin/rooms" element={
        <ProtectedRoute adminOnly><AdminRooms /></ProtectedRoute>
      } />
      <Route path="/admin/all-bookings" element={
        <ProtectedRoute adminOnly><AdminAllBookings /></ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;