import React from 'react';
import { Navigate } from 'react-router-dom';
import { URL } from '../router/index';

const ProtectedRoute = ({ children }) => {
  let auth = Boolean(localStorage.getItem('access_token'));
  if (!auth) {
    return <Navigate to={`${URL}/login`} replace />;
  }
  return children;
};

export default ProtectedRoute;
