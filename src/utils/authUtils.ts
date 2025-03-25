
import { User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/client';

type Profile = Tables['profiles'];

// Define user types
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'member' | 'club_head' | 'admin';
  club: string;
  chapter: string;
  totalCredits: number;
  joinDate: string;
  // Additional fields for new registration form
  phoneNumber?: string;
  city?: string;
  state?: string;
  college?: string;
  // New fields for the enhanced role system
  admin?: boolean;
  memberLevel?: string;
};

// Define event types
export type EventData = {
  name: string;
  description: string;
  date: string;
  credits: number;
  location: string;
};

// Define club types
export type ChapterData = {
  name: string;
};

export type ClubData = {
  name: string;
  chapterId: string;
};

// Helper function to convert Supabase profile to our AuthUser type
export const profileToAuthUser = (profile: Profile): AuthUser => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    studentId: profile.student_id || '',
    role: profile.role as 'member' | 'club_head' | 'admin',
    club: profile.club || '',
    chapter: profile.chapter || '',
    totalCredits: profile.total_credits,
    joinDate: profile.join_date,
    phoneNumber: profile.phone_number || '',
    city: profile.city || '',
    state: profile.state || '',
    college: profile.college || '',
    admin: profile.admin || false,
    memberLevel: profile.member_level || 'General Member',
  };
};

// Create a user object from the Supabase user metadata when profile fetch fails
export const userFromMetadata = (supabaseUser: User): AuthUser => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata.name || 'User',
    email: supabaseUser.email || '',
    studentId: supabaseUser.user_metadata.studentId || '',
    role: (supabaseUser.user_metadata.role as 'member' | 'club_head' | 'admin') || 'member',
    club: supabaseUser.user_metadata.club || '',
    chapter: supabaseUser.user_metadata.chapter || '',
    totalCredits: 0,
    joinDate: supabaseUser.created_at || new Date().toISOString(),
    phoneNumber: supabaseUser.user_metadata.phoneNumber || '',
    city: supabaseUser.user_metadata.city || '',
    state: supabaseUser.user_metadata.state || '',
    college: supabaseUser.user_metadata.college || '',
    admin: supabaseUser.user_metadata.admin || false,
    memberLevel: supabaseUser.user_metadata.memberLevel || 'General Member',
  };
};
