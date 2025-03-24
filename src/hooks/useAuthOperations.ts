
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/utils/authUtils';

export const useAuthOperations = () => {
  // Login with email/password
  const login = async (email: string, password: string, role: 'member' | 'club_head') => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Don't check profile role here since it's causing errors
        // We'll use the user metadata role instead
        const userRole = data.user.user_metadata.role;
        
        if (userRole && userRole !== role) {
          // Sign out if roles don't match
          await supabase.auth.signOut();
          throw new Error(`Invalid role. This account is not registered as a ${role}.`);
        }
        
        toast.success(`Welcome back!`);
      }
    } catch (error: any) {
      console.error("Login error details:", error);
      toast.error(error.message || 'Failed to log in');
      throw error;
    }
  };

  // Register new user
  const register = async (userData: Omit<AuthUser, 'id' | 'totalCredits' | 'joinDate'> & { password: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            studentId: userData.studentId,
            role: userData.role,
            club: userData.club,
            chapter: userData.chapter,
            phoneNumber: userData.phoneNumber,
            city: userData.city,
            state: userData.state,
            college: userData.college
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('You have been logged out');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    }
  };

  return {
    login,
    register,
    logout
  };
};
