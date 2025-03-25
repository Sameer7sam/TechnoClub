
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import ClubHeadTools from '@/components/ClubHeadTools';
import AdminTools from '@/components/AdminTools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createDemoAccounts } from '@/utils/demoUsers';

const Profile: React.FC = () => {
  const { user, isClubHead, isAdmin, getProfile } = useAuth();
  const [userClubs, setUserClubs] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isCreatingAccounts, setIsCreatingAccounts] = useState(false);

  // Fetch the latest profile data when the component mounts
  useEffect(() => {
    getProfile();
    
    // Fetch clubs the user is a member of
    const fetchUserClubs = async () => {
      if (user) {
        try {
          // For club heads and admin, show all clubs
          if (isClubHead() || isAdmin()) {
            const { data, error } = await supabase
              .from('clubs')
              .select('*, chapters(name)')
              .order('name');
              
            if (error) throw error;
            setUserClubs(data || []);
          } else {
            // For regular members, show only clubs they are part of
            const { data, error } = await supabase
              .from('club_members')
              .select('clubs(*, chapters(name))')
              .eq('user_id', user.id);
              
            if (error) throw error;
            setUserClubs(data?.map(item => item.clubs) || []);
          }
        } catch (error) {
          console.error('Error fetching clubs:', error);
        }
      }
    };
    
    fetchUserClubs();
  }, [user?.id]);

  // Handle creating demo accounts for testing
  const handleCreateDemoAccounts = async () => {
    if (!isAdmin()) return;
    
    setIsCreatingAccounts(true);
    try {
      const result = await createDemoAccounts();
      if (result) {
        toast.success('Demo accounts created successfully');
      } else {
        toast.error('Failed to create demo accounts');
      }
    } catch (error) {
      console.error('Error creating demo accounts:', error);
      toast.error('Error creating demo accounts');
    } finally {
      setIsCreatingAccounts(false);
    }
  };

  // Calculate progress to next level
  const calculateProgress = () => {
    if (!user) return 0;
    
    const currentPoints = user.totalCredits;
    
    if (user.role === 'admin') return 100;
    
    const levels = [
      { name: 'General Member', min: 0, max: 249 },
      { name: 'Diamond Member', min: 250, max: 499 },
      { name: 'Elite Member', min: 500, max: 749 },
      { name: 'Core Team Member', min: 750, max: 999 },
      { name: 'Club Head', min: 1000, max: 2000 }
    ];
    
    const currentLevel = levels.find(level => 
      currentPoints >= level.min && currentPoints <= level.max
    );
    
    if (!currentLevel) return 100;
    
    const nextLevel = levels.find(level => level.min > currentLevel.max);
    
    if (!nextLevel) return 100;
    
    const progressToNextLevel = (currentPoints - currentLevel.min) / (currentLevel.max - currentLevel.min) * 100;
    return Math.min(Math.max(progressToNextLevel, 0), 100);
  };

  const getPointsToNextLevel = () => {
    if (!user) return 0;
    
    const currentPoints = user.totalCredits;
    
    if (user.role === 'admin') return 0;
    
    const levels = [
      { name: 'General Member', min: 0, max: 249 },
      { name: 'Diamond Member', min: 250, max: 499 },
      { name: 'Elite Member', min: 500, max: 749 },
      { name: 'Core Team Member', min: 750, max: 999 },
      { name: 'Club Head', min: 1000, max: 2000 }
    ];
    
    const currentLevel = levels.find(level => 
      currentPoints >= level.min && currentPoints <= level.max
    );
    
    if (!currentLevel) return 0;
    
    const nextLevel = levels.find(level => level.min > currentLevel.max);
    
    if (!nextLevel) return 0;
    
    return nextLevel.min - currentPoints;
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-b from-space-navy/50 to-space-deepBlue/50 border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-white">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {user && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                            {user.memberLevel || user.role}
                          </Badge>
                          {isAdmin() && (
                            <Badge variant="secondary" className="bg-red-500/20 text-red-300 hover:bg-red-500/30">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Member Level Progress */}
                    {user.role !== 'admin' && (
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Progress to Next Level</span>
                          <span className="text-xs text-gray-400">{getPointsToNextLevel()} points needed</span>
                        </div>
                        <Progress value={calculateProgress()} className="h-2 bg-gray-700" />
                      </div>
                    )}
                    
                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email:</span>
                          <span className="text-gray-200">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Role:</span>
                          <span className="text-gray-200">{user.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Credits:</span>
                          <span className="text-gray-200">{user.totalCredits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Joined:</span>
                          <span className="text-gray-200">{new Date(user.joinDate).toLocaleDateString()}</span>
                        </div>
                        {user.phoneNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Phone:</span>
                            <span className="text-gray-200">{user.phoneNumber}</span>
                          </div>
                        )}
                        {user.city && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">City:</span>
                            <span className="text-gray-200">{user.city}</span>
                          </div>
                        )}
                        {user.state && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">State:</span>
                            <span className="text-gray-200">{user.state}</span>
                          </div>
                        )}
                        {user.college && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">College:</span>
                            <span className="text-gray-200">{user.college}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <button
                        onClick={() => navigate('/collaboration')}
                        className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-md hover:bg-purple-500/30 transition"
                      >
                        View Events
                      </button>
                      <button
                        onClick={() => navigate('/credits')}
                        className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-md hover:bg-pink-500/30 transition"
                      >
                        View Credits
                      </button>
                    </div>
                    
                    {/* Admin-only: Create demo accounts button */}
                    {isAdmin() && (
                      <div className="pt-4">
                        <button
                          onClick={handleCreateDemoAccounts}
                          disabled={isCreatingAccounts}
                          className="w-full px-4 py-2 bg-amber-500/20 text-amber-300 rounded-md hover:bg-amber-500/30 transition"
                        >
                          {isCreatingAccounts ? (
                            <span className="flex items-center justify-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-amber-300 border-opacity-50 border-t-amber-300 rounded-full"></div>
                              Creating Demo Accounts...
                            </span>
                          ) : (
                            "Create Demo Accounts"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Clubs List */}
            <Card className="bg-gradient-to-b from-space-navy/50 to-space-deepBlue/50 border-purple-500/20 mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-white">
                  {isAdmin() ? "All Clubs" : "Your Clubs"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userClubs.length > 0 ? (
                  <div className="space-y-3">
                    {userClubs.map((club, index) => (
                      <div key={index} className="p-3 bg-space-navy/30 rounded-md border border-purple-500/20">
                        <h3 className="font-medium text-white">{club.name}</h3>
                        <p className="text-sm text-gray-400">
                          {club.chapters?.name || club.chapter}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    {isAdmin() ? "No clubs found in the system." : "You are not a member of any clubs yet."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Tool Sections based on role */}
          <div className="lg:col-span-2">
            {isAdmin() ? (
              <AdminTools />
            ) : isClubHead() ? (
              <ClubHeadTools />
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-gradient-to-b from-space-navy/50 to-space-deepBlue/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">Member Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        Welcome to your member dashboard. View your credits, upcoming events, and track your progress.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => navigate('/collaboration')}
                          className="p-4 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition text-left"
                        >
                          <h3 className="font-medium text-white mb-1">Upcoming Events</h3>
                          <p className="text-sm text-gray-400">View and register for upcoming events</p>
                        </button>
                        
                        <button
                          onClick={() => navigate('/credits')}
                          className="p-4 bg-pink-500/20 rounded-lg hover:bg-pink-500/30 transition text-left"
                        >
                          <h3 className="font-medium text-white mb-1">Credit History</h3>
                          <p className="text-sm text-gray-400">Track your credit history and progress</p>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
