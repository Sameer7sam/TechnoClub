
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AuthUser, EventData, profileToAuthUser, userFromMetadata } from '@/utils/authUtils';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useUserOperations } from '@/hooks/useUserOperations';

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'member' | 'club_head') => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Omit<AuthUser, 'id' | 'totalCredits' | 'joinDate'> & { password: string }) => Promise<void>;
  giveCredits: (recipientId: string, amount: number, reason: string) => Promise<void>;
  createEvent: (eventData: EventData) => Promise<string>;
  addMemberToEvent: (eventId: string, memberId: string) => Promise<void>;
  isClubHead: () => boolean;
  getProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  console.log("AuthProvider initialized");
  
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

  // Auth operations
  const { login, register, logout } = useAuthOperations();
  
  // User operations
  const { isClubHead, giveCredits, createEvent, addMemberToEvent } = useUserOperations(user, getProfile);
  
  // Check for existing session and set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    const fetchInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", initialSession ? "Session found" : "No session");
        setSession(initialSession);
        
        if (initialSession?.user) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', initialSession.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching user profile:', error);
              // Use user metadata as fallback
              setUser(userFromMetadata(initialSession.user));
            } else if (data) {
              setUser(profileToAuthUser(data));
            }
          } catch (error) {
            console.error('Error fetching initial user profile:', error);
            setUser(userFromMetadata(initialSession.user));
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state change event:", event);
        setSession(newSession);
        
        if (newSession?.user) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', newSession.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching user profile on auth change:', error);
              // Use user metadata as fallback
              setUser(userFromMetadata(newSession.user));
            } else if (data) {
              setUser(profileToAuthUser(data));
            }
          } catch (error) {
            console.error('Error fetching user profile on auth change:', error);
            setUser(userFromMetadata(newSession.user));
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
