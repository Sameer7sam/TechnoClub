
import { User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/client';

type Profile = Tables['profiles'];

// Define user types
export type AuthUser = {
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

// Helper function to convert Supabase profile to our AuthUser type
export const profileToAuthUser = (profile: Profile): AuthUser => {
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
export const userFromMetadata = (supabaseUser: User): AuthUser => {
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
