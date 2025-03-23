
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/client';

type Profile = Tables['profiles'];

// Define user types
type AuthUser = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'member' | 'club_head';
  club: string;
  chapter: string;
  totalCredits: number;
  joinDate: string;
  // Additional fields for new registration form
  phoneNumber?: string;
  city?: string;
  state?: string;
  college?: string;
};

// Define event types
export type EventData = {
  name: string;
  description: string;
  date: string;
  credits: number;
  location: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'member' | 'club_head') => Promise<void>;
  logout: () => void;
  register: (userData: Omit<AuthUser, 'id' | 'totalCredits' | 'joinDate'> & { password: string }) => Promise<void>;
  giveCredits: (recipientId: string, amount: number, reason: string) => Promise<void>;
  createEvent: (eventData: EventData) => Promise<string>;
  addMemberToEvent: (eventId: string, memberId: string) => Promise<void>;
  isClubHead: () => boolean;
  getProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert Supabase profile to our AuthUser type
const profileToAuthUser = (profile: Profile): AuthUser => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    studentId: profile.student_id || '',
    role: profile.role as 'member' | 'club_head',
    club: profile.club || '',
    chapter: profile.chapter || '',
    totalCredits: profile.total_credits,
    joinDate: profile.join_date,
    phoneNumber: profile.phone_number || '',
    city: profile.city || '',
    state: profile.state || '',
    college: profile.college || '',
  };
};

// Create a user object from the Supabase user metadata when profile fetch fails
const userFromMetadata = (supabaseUser: User): AuthUser => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata.name || 'User',
    email: supabaseUser.email || '',
    studentId: supabaseUser.user_metadata.studentId || '',
    role: (supabaseUser.user_metadata.role as 'member' | 'club_head') || 'member',
    club: supabaseUser.user_metadata.club || '',
    chapter: supabaseUser.user_metadata.chapter || '',
    totalCredits: 0,
    joinDate: supabaseUser.created_at || new Date().toISOString(),
    phoneNumber: supabaseUser.user_metadata.phoneNumber || '',
    city: supabaseUser.user_metadata.city || '',
    state: supabaseUser.user_metadata.state || '',
    college: supabaseUser.user_metadata.college || '',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session and set up auth state listener
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching user profile:', error);
              // Use user metadata as fallback when profile fetch fails
              setUser(userFromMetadata(session.user));
            } else if (data) {
              setUser(profileToAuthUser(data));
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            // Use user metadata as fallback
            setUser(userFromMetadata(session.user));
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching user profile:', error);
              // Use user metadata as fallback
              setUser(userFromMetadata(session.user));
            } else if (data) {
              setUser(profileToAuthUser(data));
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the latest profile data
  const getProfile = async () => {
    if (!session?.user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        // Use user metadata as fallback
        setUser(userFromMetadata(session.user));
        return;
      }
      
      if (data) {
        setUser(profileToAuthUser(data));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

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
      setUser(null);
      toast.success('You have been logged out');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    }
  };

  // Check if user is club head
  const isClubHead = () => {
    return user?.role === 'club_head';
  };

  // Club head functions
  const giveCredits = async (recipientId: string, amount: number, reason: string) => {
    if (!isClubHead() || !user) {
      toast.error('Only club heads can give credits');
      throw new Error('Only club heads can give credits');
    }
    
    try {
      const { error } = await supabase.from('credit_transactions').insert({
        recipient_id: recipientId,
        awarded_by: user.id,
        amount: amount,
        reason: reason
      });
      
      if (error) throw error;
      
      toast.success(`Credits awarded successfully!`);
      
      // Refresh the user profile if credits were given to the current user
      if (recipientId === user.id) {
        await getProfile();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to award credits');
      throw error;
    }
  };

  const createEvent = async (eventData: EventData) => {
    if (!isClubHead() || !user) {
      toast.error('Only club heads can create events');
      throw new Error('Only club heads can create events');
    }
    
    try {
      const { data, error } = await supabase.from('events').insert({
        name: eventData.name,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        credits: eventData.credits,
        created_by: user.id
      }).select('id').single();
      
      if (error) throw error;
      
      toast.success(`Event created successfully!`);
      return data.id;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create event');
      throw error;
    }
  };

  const addMemberToEvent = async (eventId: string, memberId: string) => {
    if (!isClubHead()) {
      toast.error('Only club heads can add members to events');
      throw new Error('Only club heads can add members to events');
    }
    
    try {
      const { error } = await supabase.from('event_participants').insert({
        event_id: eventId,
        user_id: memberId
      });
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('This member is already registered for this event');
        }
        throw error;
      }
      
      toast.success(`Member added to event successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add member to event');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register, 
      giveCredits, 
      createEvent, 
      addMemberToEvent, 
      isClubHead,
      getProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
