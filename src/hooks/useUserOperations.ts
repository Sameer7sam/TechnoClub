
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, EventData } from '@/utils/authUtils';

export const useUserOperations = (user: AuthUser | null, getProfile: () => Promise<void>) => {
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

  return {
    isClubHead,
    giveCredits,
    createEvent,
    addMemberToEvent
  };
};
