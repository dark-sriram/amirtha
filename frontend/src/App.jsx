import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/adminLoginPage.jsx';
import Dashboard from './pages/adminDashboard.jsx';
import BookingRequests from './pages/BookingRequests';
import RoomManagement from './pages/RoomManagement';
import AllBookings from './pages/AllBookings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking-requests" element={<BookingRequests />} />
          <Route path="/room-management" element={<RoomManagement />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;