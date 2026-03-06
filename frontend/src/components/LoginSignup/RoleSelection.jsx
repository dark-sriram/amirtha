import React from 'react';
import { motion } from 'framer-motion';
import './RoleSelection.css';

const RoleSelection = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'user',
      title: 'User',
      icon: '👤',
      description: 'Access your personal dashboard',
      color: '#93785B'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: '⚡',
      description: 'Manage system and users',
      color: '#3E362E'
    }
  ];

  const handleRoleClick = (roleId) => {
    if (onSelectRole && typeof onSelectRole === 'function') {
      onSelectRole(roleId);
    }
  };

  return (
    <motion.div 
      className="role-selection-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="role-title"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Choose Your Role
      </motion.h2>
      
      <motion.p 
        className="role-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Select how you want to access the platform
      </motion.p>

      <div className="role-cards">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            className="role-card"
            // @ts-ignore
            style={{ '--role-color': role.color }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRoleClick(role.id)}
          >
            <div className="role-icon">{role.icon}</div>
            <h3 className="role-name">{role.title}</h3>
            <p className="role-description">{role.description}</p>
            <motion.div 
              className="role-select-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Select {role.title}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoleSelection;