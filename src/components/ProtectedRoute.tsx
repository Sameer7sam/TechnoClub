
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check for authentication state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
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
