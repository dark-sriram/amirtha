import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCalendar, FiGrid, FiUsers, FiLogOut, FiMenu, FiX, FiBell, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  // Mock notification count - in real app, this would come from API
  useEffect(() => {
    // Simulate fetching notifications
    const pendingBookings = Math.floor(Math.random() * 5);
    setNotifications(pendingBookings);
  }, []);

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard', badge: null },
    { path: '/booking-requests', icon: FiCalendar, label: 'Booking Requests', badge: notifications > 0 ? notifications : null },
    { path: '/all-bookings', icon: FiGrid, label: 'All Bookings', badge: null },
    { path: '/room-management', icon: FiUsers, label: 'Room Management', badge: null },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="bg-gradient-to-b from-base-200 to-base-300 min-h-full w-64 p-4 shadow-xl">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🏨
        </div>
        <div>
          <h1 className="text-xl font-bold text-base-content">Hotel Admin</h1>
          <p className="text-xs text-base-content/60">Management System</p>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-base-100 to-base-50 p-4 shadow-lg border border-base-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-base-content truncate">{user?.name}</p>
            <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="badge badge-primary badge-sm font-medium">{user?.role}</span>
          <div className="flex items-center gap-1 text-xs text-base-content/60">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </div>

      {/* Menu */}
      <ul className="menu gap-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg'
                  : 'hover:bg-base-100/50 text-base-content'
              }`}
            >
              <item.icon className="text-lg" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="badge badge-error badge-sm text-white font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="divider my-6"></div>

      {/* Quick Actions */}
      <div className="space-y-2 mb-6">
        <button className="btn btn-ghost btn-sm w-full justify-start gap-3 text-base-content/70 hover:text-base-content">
          <FiBell className="text-lg" />
          Notifications
          {notifications > 0 && (
            <span className="badge badge-error badge-xs text-white ml-auto">
              {notifications}
            </span>
          )}
        </button>
        <button className="btn btn-ghost btn-sm w-full justify-start gap-3 text-base-content/70 hover:text-base-content">
          <FiSettings className="text-lg" />
          Settings
        </button>
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-block gap-3 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-circle btn-primary shadow-lg"
        >
          {isOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;