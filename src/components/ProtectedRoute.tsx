import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      console.log('ProtectedRoute: Checking authentication...');
      try {
        const auth = await authService.isAuthenticated();
        console.log('ProtectedRoute: Authentication result:', auth);
        setIsAuthenticated(auth);
        if (!auth) {
          console.log('ProtectedRoute: Not authenticated, redirecting to login');
          navigate('/login');
        }
      } catch (error) {
        console.error('ProtectedRoute: Error checking authentication:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    console.log('ProtectedRoute: Still loading, showing spinner');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  console.log('ProtectedRoute: Rendering children, isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute; 