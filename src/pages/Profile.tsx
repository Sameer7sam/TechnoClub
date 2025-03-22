
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Calendar, Award, Coins, Zap, Star, LogOut, ClipboardList, BarChart } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null; // Should never happen because of ProtectedRoute
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-black relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-space-deepBlue to-space-navy opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_20%,rgba(120,50,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 stars-bg opacity-40"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow py-16 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-purple-300">Member Profile</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-blue-purple">Welcome, {user.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card className="glass-card cosmic-glow border-purple-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/20">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <h2 className="text-2xl font-bold text-white mr-2">{user.name}</h2>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                          {user.role === 'admin' ? 'Admin' : 'Member'}
                        </span>
                      </div>
                      <p className="text-gray-300">{user.email}</p>
                      <p className="text-gray-400 text-sm">Student ID: {user.studentId}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm mr-3">
                        <Coins className="h-5 w-5 text-yellow-300 mr-2" />
                        <div>
                          <p className="text-white text-xs font-medium">Credits</p>
                          <p className="text-white text-lg font-bold">{user.totalCredits}</p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="bg-red-500/20 text-red-300 hover:bg-red-500/30"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                      <Award className="h-3.5 w-3.5" />
                      {user.club} • {user.chapter}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                      <Calendar className="h-3.5 w-3.5" />
                      Member since {formatDate(user.joinDate)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                  Events
                </CardTitle>
                <CardDescription>Upcoming and past events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Link to="/collaboration" className="w-full">
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Events Calendar
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-400">
                    You have 3 upcoming events this month. Check your calendar for details.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-amber-400" />
                  Credits
                </CardTitle>
                <CardDescription>Your credit status and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Link to="/credits" className="w-full">
                    <Button className="w-full" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Manage Credits & Rewards
                    </Button>
                  </Link>
                  <div className="bg-gray-800/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Next Rank</span>
                      <span className="text-sm text-purple-400">Club Leader</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (user.totalCredits / 500) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{user.totalCredits}/500 credits needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-400" />
                  Reports
                </CardTitle>
                <CardDescription>View statistics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Link to="/reports" className="w-full">
                    <Button className="w-full" variant="outline">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-400">
                    Access detailed reports on events, member participation, and credit allocation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
