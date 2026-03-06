import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiGrid, FiCalendar, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/rooms', icon: FiGrid, label: 'Rooms' },
    ...(isAuthenticated ? [{ path: '/my-bookings', icon: FiCalendar, label: 'My Bookings' }] : []),
  ];

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label 
            tabIndex={0} 
            className="btn btn-ghost btn-circle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </label>
          {mobileMenuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          HotelMS
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="flex items-center gap-2">
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`} 
                  alt={user?.name} 
                />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  {user?.role === 'ADMIN' && (
                    <span className="badge badge-primary badge-sm">Admin</span>
                  )}
                </Link>
              </li>
              {user?.role === 'ADMIN' && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link to="/my-bookings">My Bookings</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} className="text-error">
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
