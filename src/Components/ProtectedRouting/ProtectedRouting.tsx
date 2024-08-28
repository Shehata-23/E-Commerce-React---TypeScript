import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRoutingProps {
  children: React.ReactNode;
}

const ProtectedRouting: React.FC<ProtectedRoutingProps> = ({ children }) => {
  const token = Cookies.get('token');

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signup" />;
  }
};

export default ProtectedRouting;
