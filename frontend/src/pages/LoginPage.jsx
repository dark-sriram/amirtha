import React, { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import ThreeBackground from '../components/LoginSignup/ThreeBackground';
import RoleSelection from '../components/LoginSignup/RoleSelection';
import LoginSignup from '../components/LoginSignup/LoginSignup';
import './LoginPage.css';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <div className="login-page">
      <div className="three-background">
        <Suspense fallback={<div className="loading">Loading 3D...</div>}>
          <ThreeBackground />
        </Suspense>
      </div>
      
      <div className="content-overlay">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <RoleSelection key="role-selection" onSelectRole={handleRoleSelect} />
          ) : (
            <LoginSignup key="login-signup" role={selectedRole} onBack={handleBack} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;