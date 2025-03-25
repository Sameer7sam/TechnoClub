
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/utils/authUtils';

export const useAuthOperations = () => {
  // Login with email/password
  const login = async (email: string, password: string, role: 'member' | 'club_head' | 'admin') => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // For admin login, check admin flag in profiles
        if (role === 'admin') {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('admin')
            .eq('id', data.user.id)
            .single();
            
          if (profileError) throw new Error('Error verifying admin status');
          
          if (!profileData?.admin) {
            // Sign out if not an admin
            await supabase.auth.signOut();
            throw new Error('This account does not have admin privileges');
          }
          
          toast.success(`Welcome back, Admin!`);
          return;
        }

        // For non-admin users, check role in profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) throw new Error('Error verifying user role');
        
        if (profileData?.role !== role) {
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
      // Always register as a member regardless of selected role
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            studentId: userData.studentId,
            role: 'member', // Always set as member initially
            phoneNumber: userData.phoneNumber,
            city: userData.city,
            state: userData.state,
            college: userData.college
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Registration successful! Please complete your membership profile to unlock features.');
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
