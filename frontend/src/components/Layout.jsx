import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200/30">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;