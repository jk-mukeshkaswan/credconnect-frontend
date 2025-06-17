import React from 'react';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('adminToken') !== null;
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;