import React from 'react';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="dashboard-content">
        <h1 style={{ color: '#3E362E' }}>User Dashboard</h1>
        <p style={{ color: '#93785B' }}>Welcome to your account</p>
        <button 
          onClick={() => {
            localStorage.removeItem('userRole');
            window.location.href = '/';
          }}
          style={{
            padding: '0.5rem 1rem',
            background: '#865D36',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;