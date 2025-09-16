import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = () => {
    const authData = localStorage.getItem('ayurSetuAuth');
    if (!authData) return false;
    
    try {
      const parsed = JSON.parse(authData);
      return parsed.isAuthenticated === true;
    } catch (error) {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
