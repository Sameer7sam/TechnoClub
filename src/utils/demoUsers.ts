
import { supabase } from '@/integrations/supabase/client';

// Create demo accounts for testing
export const createDemoAccounts = async () => {
  try {
    // Check if admin account already exists
    const { data: existingAdmin } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'admin@technoclub.com')
      .single();
      
    if (!existingAdmin) {
      // Create admin account
      const { data: adminUser, error: adminError } = await supabase.auth.signUp({
        email: 'admin@technoclub.com',
        password: 'admin123',
        options: {
          data: {
            name: 'Admin User',
            role: 'admin'
          }
        }
      });
      
      if (adminError) throw adminError;
      
      if (adminUser.user) {
        // Set admin flag in profile
        await supabase
          .from('profiles')
          .update({ 
            admin: true,
            total_credits: 5000,
            role: 'admin',
            member_level: 'Administrator'
          })
          .eq('id', adminUser.user.id);
      }
    }
    
    // Check if club head account already exists
    const { data: existingClubHead } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'clubhead@technoclub.com')
      .single();
      
    if (!existingClubHead) {
      // Create club head account
      const { data: clubHeadUser, error: clubHeadError } = await supabase.auth.signUp({
        email: 'clubhead@technoclub.com',
        password: 'clubhead123',
        options: {
          data: {
            name: 'Club Head',
            role: 'club_head'
          }
        }
      });
      
      if (clubHeadError) throw clubHeadError;
      
      if (clubHeadUser.user) {
        // Set club head details in profile
        await supabase
          .from('profiles')
          .update({ 
            role: 'club_head', 
            club: 'Web Development Club',
            chapter: 'Technology Chapter',
            total_credits: 2500,
            member_level: 'Club Head'
          })
          .eq('id', clubHeadUser.user.id);
      }
    }
    
    // Check if member account already exists
    const { data: existingMember } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'member@technoclub.com')
      .single();
      
    if (!existingMember) {
      // Create member account
      const { data: memberUser, error: memberError } = await supabase.auth.signUp({
        email: 'member@technoclub.com',
        password: 'member123',
        options: {
          data: {
            name: 'Regular Member',
            role: 'member'
          }
        }
      });
      
      if (memberError) throw memberError;
      
      if (memberUser.user) {
        // Set member details in profile
        await supabase
          .from('profiles')
          .update({ 
            role: 'member',
            total_credits: 150,
            member_level: 'General Member' 
          })
          .eq('id', memberUser.user.id);
      }
    }
    
    console.log('Demo accounts created successfully');
    return true;
  } catch (error) {
    console.error('Error creating demo accounts:', error);
    return false;
  }
};
