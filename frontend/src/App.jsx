import { useState } from 'react'
import Feedback from './pages/Feedback'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const userRole = localStorage.getItem('userRole'); // 'admin' or 'user'

  return (
    <>
    <Navbar/>
    {/* <Feedback/> */}
    </>
    <Router>
      <Routes>
        {/* Landing and general public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/redirect" element={<div className="p-10 text-center font-bold text-xl">Redirect target reached!</div>} />

        {/* Authentication and dashboards */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/*"
          element={userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;