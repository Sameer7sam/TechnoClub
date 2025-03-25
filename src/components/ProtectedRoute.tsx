
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { AuthUser } from '@/utils/authUtils';

interface ProtectedRouteProps {
  children: (user: AuthUser | null) => React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log('User not authenticated, redirecting to login');
    } else if (isAuthenticated === true) {
      console.log('User authenticated, accessing protected route', user?.name);
    }
  }, [isAuthenticated, user]);

  // If we're still loading, show a loading spinner
  if (isAuthenticated === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-12 w-12 border-4 border-purple-500 rounded-full border-t-transparent mb-4"></div>
          <div className="text-purple-300 text-sm">Verifying authentication...</div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children(user)}</>;
};

export default ProtectedRoute;
