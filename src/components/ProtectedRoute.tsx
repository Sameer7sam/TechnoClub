
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log('User not authenticated, redirecting to login');
      toast.error('Please log in to access this page', {
        id: 'auth-required',
        duration: 3000
      });
    } else if (isAuthenticated === true) {
      console.log('User authenticated, accessing protected route', user?.name);
      // Only show welcome toast when coming from login page
      if (location.state && (location.state as any).from === '/login') {
        toast.success(`Welcome, ${user?.name}!`, {
          id: 'auth-success',
          duration: 3000
        });
      }
    }
  }, [isAuthenticated, user, location]);

  // If isAuthenticated is undefined, we're still loading
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

  // If we know the user is not authenticated, redirect to login
  if (isAuthenticated === false) {
    // Redirect to login if not authenticated, preserving the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
