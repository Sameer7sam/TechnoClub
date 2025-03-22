
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Shield, Lock } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Show an enhanced toast with icon to inform the user
    toast.error(
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-red-400" />
        <div>
          <p className="font-medium">Authentication Required</p>
          <p className="text-sm text-gray-300">Please log in to access this page</p>
        </div>
      </div>,
      {
        duration: 4000,
        position: 'top-center',
      }
    );
    
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
