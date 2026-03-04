// @ts-ignore
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginSignup.css';

const LoginSignup = ({ role, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!isLogin) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', formData.username);
      
      if (role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/user';
      }
    } else {
      setErrors(newErrors);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if (onBack && typeof onBack === 'function') {
      onBack();
    }
  };

  return (
    <motion.div 
      className="login-signup-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Roles
      </button>

      <div className="role-badge" style={{ backgroundColor: role === 'admin' ? '#3E362E' : '#93785B' }}>
        {role === 'admin' ? '⚡ Admin Access' : '👤 User Access'}
      </div>

      <motion.div 
        className="form-wrapper"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header">
          <motion.h1 
            className="title"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {isLogin 
              ? `Login to your ${role || 'user'} account` 
              : `Sign up as ${role || 'user'}`
            }
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <motion.div 
            className="input-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label>
              <span className="label-icon">👤</span>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              // @ts-ignore
              className={errors.username ? 'error' : ''}
            />
            {errors.
// @ts-ignore
            username && <span className="error-message">{errors.username}</span>}
          </motion.div>

          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                className="input-group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label>
                  <span className="label-icon">📧</span>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  // @ts-ignore
                  className={errors.email ? 'error' : ''}
                />
                {errors.
// @ts-ignore
                email && <span className="error-message">{errors.email}</span>}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="input-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label>
              <span className="label-icon">🔒</span>
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                // @ts-ignore
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.
// @ts-ignore
            password && <span className="error-message">{errors.password}</span>}
          </motion.div>

          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                className="input-group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label>
                  <span className="label-icon">✓</span>
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  // @ts-ignore
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.
// @ts-ignore
                confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </motion.div>
            )}
          </AnimatePresence>

          {isLogin && (
            <motion.div 
              className="forgot-password"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="#">Forgot Password?</a>
            </motion.div>
          )}

          <motion.button 
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>

          <motion.div 
            className="toggle-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginSignup;