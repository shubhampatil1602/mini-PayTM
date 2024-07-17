import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token') !== null; // Check for token

  return isAuthenticated ? element : <Navigate to='/' />;
};

export default ProtectedRoute;
