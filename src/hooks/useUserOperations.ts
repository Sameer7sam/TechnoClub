
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, EventData, ChapterData, ClubData } from '@/utils/authUtils';

export const useUserOperations = (user: AuthUser | null, getProfile: () => Promise<void>) => {
  // Check if user is club head
  const isClubHead = () => {
    return user?.role === 'club_head';
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin' || user?.admin === true;
  };

  // Update club membership for a user
  const updateMembership = async (clubId: string, chapterId: string) => {
    if (!user) {
      toast.error('You must be logged in to update membership');
      throw new Error('User not logged in');
    }
    
    try {
      // First update the user's profile with club and chapter
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          club: clubId,
          chapter: chapterId
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Add user to club_members table
      const { error: memberError } = await supabase
        .from('club_members')
        .insert({
          club_id: clubId,
          user_id: user.id
        });
      
      // If it's a duplicate, don't throw an error
      if (memberError && memberError.code !== '23505') {
        throw memberError;
      }
      
      toast.success('Membership updated successfully!');
      await getProfile(); // Refresh profile data
    } catch (error: any) {
      toast.error(error.message || 'Failed to update membership');
      throw error;
    }
  };

  // Club head functions
  const giveCredits = async (recipientId: string, amount: number, reason: string, eventId?: string) => {
    if (!isClubHead() && !isAdmin()) {
      toast.error('Only club heads and admins can give credits');
      throw new Error('Only club heads and admins can give credits');
    }
    
    try {
      const { error } = await supabase.from('credit_transactions').insert({
        recipient_id: recipientId,
        awarded_by: user?.id,
        amount: amount,
        reason: reason,
        event_id: eventId || null
      });
      
      if (error) throw error;
      
      toast.success(`Credits awarded successfully!`);
      
      // Refresh the user profile if credits were given to the current user
      if (recipientId === user?.id) {
        await getProfile();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to award credits');
      throw error;
    }
  };

  const createEvent = async (eventData: EventData) => {
    if (!isClubHead() && !isAdmin()) {
      toast.error('Only club heads and admins can create events');
      throw new Error('Only club heads and admins can create events');
    }
    
    if (!user) {
      toast.error('You must be logged in to create events');
      throw new Error('User not logged in');
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
    if (!isClubHead() && !isAdmin()) {
      toast.error('Only club heads and admins can add members to events');
      throw new Error('Only club heads and admins can add members to events');
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

  const markAttendance = async (eventId: string, memberId: string) => {
    if (!isClubHead() && !isAdmin()) {
      toast.error('Only club heads and admins can mark attendance');
      throw new Error('Only club heads and admins can mark attendance');
    }
    
    try {
      // First update the attendance status
      const { error: attendanceError } = await supabase
        .from('event_participants')
        .update({ attended: true })
        .match({ event_id: eventId, user_id: memberId });
      
      if (attendanceError) throw attendanceError;
      
      // Get event details to know how many credits to award
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('credits')
        .eq('id', eventId)
        .single();
      
      if (eventError) throw eventError;
      
      // Award credits for attending the event
      const { error: creditError } = await supabase
        .from('credit_transactions')
        .insert({
          recipient_id: memberId,
          awarded_by: user?.id,
          amount: eventData.credits,
          reason: `Attendance at event`,
          event_id: eventId
        });
      
      if (creditError) throw creditError;
      
      toast.success(`Attendance marked and credits awarded!`);
      
      // Refresh the user profile if attendance was marked for the current user
      if (memberId === user?.id) {
        await getProfile();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to mark attendance');
      throw error;
    }
  };

  // Admin functions
  const createChapter = async (chapterData: ChapterData) => {
    if (!isAdmin() || !user) {
      toast.error('Only admins can create chapters');
      throw new Error('Only admins can create chapters');
    }
    
    try {
      const { data, error } = await supabase.from('chapters').insert({
        name: chapterData.name,
        created_by: user.id
      }).select('id').single();
      
      if (error) throw error;
      
      toast.success(`Chapter created successfully!`);
      return data.id;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create chapter');
      throw error;
    }
  };

  const createClub = async (clubData: ClubData) => {
    if (!isAdmin() || !user) {
      toast.error('Only admins can create clubs');
      throw new Error('Only admins can create clubs');
    }
    
    try {
      const { data, error } = await supabase.from('clubs').insert({
        name: clubData.name,
        chapter_id: clubData.chapterId,
        created_by: user.id
      }).select('id').single();
      
      if (error) throw error;
      
      toast.success(`Club created successfully!`);
      return data.id;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create club');
      throw error;
    }
  };

  const assignClubHead = async (userId: string, clubId: string) => {
    if (!isAdmin()) {
      toast.error('Only admins can assign club heads');
      throw new Error('Only admins can assign club heads');
    }
    
    try {
      // Update user's role to club_head
      const { error: roleError } = await supabase
        .from('profiles')
        .update({ role: 'club_head', club: clubId })
        .eq('id', userId);
      
      if (roleError) throw roleError;
      
      // Ensure user is a member of the club
      const { error: membershipError } = await supabase
        .from('club_members')
        .upsert({
          club_id: clubId,
          user_id: userId,
          joined_at: new Date().toISOString()
        });
      
      if (membershipError) throw membershipError;
      
      toast.success(`Club head assigned successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign club head');
      throw error;
    }
  };

  return {
    isClubHead,
    isAdmin,
    giveCredits,
    createEvent,
    addMemberToEvent,
    markAttendance,
    createChapter,
    createClub,
    assignClubHead,
    updateMembership
  };
};
