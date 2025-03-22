
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Coins, 
  Trophy, 
  BadgeCheck, 
  Award, 
  ArrowUpRight, 
  PiggyBank, 
  Star, 
  Calendar, 
  User, 
  FileText, 
  Building,
  Sparkles,
  GraduationCap,
  Code,
  Laptop,
  Zap
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  studentId: "A12345678",
  totalCredits: 850,
  rank: "Senior Contributor",
  joinDate: "2023-05-15",
  clubs: [
    { name: "IEEE", role: "Member", credits: 450 },
    { name: "ACM", role: "Secretary", credits: 200 },
    { name: "GDG", role: "Volunteer", credits: 150 },
    { name: "AWS", role: "Member", credits: 50 }
  ],
  recentActivities: [
    { id: 1, description: "Organized AI Workshop", credits: 75, date: "2024-05-01", type: "event_organization" },
    { id: 2, description: "Speaker at Cloud Computing Panel", credits: 65, date: "2024-04-22", type: "content_creation" },
    { id: 3, description: "Hackathon Mentor", credits: 50, date: "2024-04-15", type: "mentorship" },
    { id: 4, description: "Created React Tutorial Series", credits: 60, date: "2024-04-05", type: "content_creation" },
    { id: 5, description: "Represented IEEE at Tech Fair", credits: 40, date: "2024-03-28", type: "representation" },
    { id: 6, description: "ML Study Group Facilitator", credits: 35, date: "2024-03-20", type: "mentorship" },
    { id: 7, description: "Participated in Coding Competition", credits: 30, date: "2024-03-10", type: "participation" },
    { id: 8, description: "Blockchain Workshop Volunteer", credits: 25, date: "2024-03-01", type: "participation" }
  ],
  rewards: [
    { id: 1, name: "Advanced AI Workshop Certificate", cost: 150, redeemed: true, date: "2024-04-10", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Tech Conference VIP Pass", cost: 300, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Campus Innovation Hub Access", cost: 175, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Premium Club Merchandise Pack", cost: 125, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Priority Event Registration (1 Year)", cost: 200, redeemed: true, date: "2024-03-05", image: "https://images.unsplash.com/photo-1560439514-e960a3ef5019?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Private Mentoring Session", cost: 250, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Cloud Computing Certification Voucher", cost: 350, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Tech Startup Incubator Visit", cost: 225, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ],
  stats: {
    eventsOrganized: 12,
    workshopsAttended: 28,
    mentoringSessions: 15,
    contentCreated: 8,
    totalHours: 145
  },
  achievements: [
    { name: "Workshop Master", description: "Organized 10+ workshops", progress: 100, icon: <Laptop className="h-5 w-5 text-purple-500" /> },
    { name: "Mentor Extraordinaire", description: "Mentored 25+ students", progress: 60, icon: <GraduationCap className="h-5 w-5 text-blue-500" /> },
    { name: "Content Creator", description: "Created 10+ learning resources", progress: 80, icon: <FileText className="h-5 w-5 text-pink-500" /> },
    { name: "Hackathon Hero", description: "Participated in 5+ hackathons", progress: 100, icon: <Code className="h-5 w-5 text-green-500" /> },
    { name: "Community Leader", description: "Take leadership role in club", progress: 100, icon: <Users className="h-5 w-5 text-amber-500" /> }
  ]
};

const activityTypes = {
  event_organization: <Calendar className="h-4 w-4 text-green-500" />,
  participation: <User className="h-4 w-4 text-blue-500" />,
  mentorship: <GraduationCap className="h-4 w-4 text-purple-500" />,
  content_creation: <FileText className="h-4 w-4 text-amber-500" />,
  representation: <Building className="h-4 w-4 text-rose-500" />
};

const RankBadge: React.FC<{ rank: string }> = ({ rank }) => {
  let colors = "bg-gray-100 text-gray-800";
  
  if (rank === "Junior Member") {
    colors = "bg-blue-100 text-blue-800";
  } else if (rank === "Active Contributor") {
    colors = "bg-green-100 text-green-800";
  } else if (rank === "Senior Contributor") {
    colors = "bg-purple-100 text-purple-800";
  } else if (rank === "Club Leader") {
    colors = "bg-amber-100 text-amber-800";
  }
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      <BadgeCheck className="h-3.5 w-3.5" />
      {rank}
    </span>
  );
};

const activityFormSchema = z.object({
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  type: z.string({ required_error: "Please select an activity type" }),
  date: z.string({ required_error: "Please select a date" }),
  club: z.string({ required_error: "Please select a club" }),
});

const Credits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'rewards' | 'achievements'>('overview');
  
  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      description: "",
      date: new Date().toISOString().split('T')[0],
    },
  });
  
  const onSubmit = (values: z.infer<typeof activityFormSchema>) => {
    console.log(values);
    toast.success("Activity logged successfully! Credits will be awarded after verification.");
    form.reset();
  };
  
  const calculatePercentage = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  const nextRankCredits = 1000;
  const currentProgress = Math.min(100, Math.round((userData.totalCredits / nextRankCredits) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-space-black">
      <Navbar />
      
      <main className="flex-grow py-12 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-pink-900/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,65,165,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(100,65,165,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Credit System</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Credit System</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Track your contributions, earn credits, and redeem rewards for your active participation.
            </p>
          </div>
          
          <Card className="mb-8 overflow-hidden bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="opacity-90">{userData.email}</p>
                  <p className="opacity-80 text-sm">Student ID: {userData.studentId}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <Coins className="h-7 w-7 text-yellow-300 mr-2" />
                  <div>
                    <p className="text-white text-sm font-medium">Total Credits</p>
                    <p className="text-white text-2xl font-bold">{userData.totalCredits}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <RankBadge rank={userData.rank} />
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {new Date(userData.joinDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                </span>
                {userData.clubs.map((club, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    <Award className="h-3.5 w-3.5" />
                    {club.name} • {club.role}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex space-x-4 overflow-x-auto pb-2">
                <Button 
                  variant={activeTab === 'overview' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('overview')}
                  className="rounded-full"
                >
                  Overview
                </Button>
                <Button 
                  variant={activeTab === 'activities' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('activities')}
                  className="rounded-full"
                >
                  Activities
                </Button>
                <Button 
                  variant={activeTab === 'rewards' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('rewards')}
                  className="rounded-full"
                >
                  Rewards
                </Button>
                <Button 
                  variant={activeTab === 'achievements' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('achievements')}
                  className="rounded-full"
                >
                  Achievements
                </Button>
              </div>
            </div>
          </Card>
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-xl">Credit Distribution</CardTitle>
                  <CardDescription>Credits earned by club</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.clubs.map((club, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{club.name}</span>
                          <span className="text-sm text-gray-400">{club.credits} credits</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${calculatePercentage(club.credits, userData.totalCredits)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-xl">Next Rank Progress</CardTitle>
                  <CardDescription>Club Leader</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="mb-6">
                      <span className="inline-block p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 rounded-full">
                        <Star className="h-8 w-8" />
                      </span>
                      <h3 className="text-lg font-semibold mt-3">Club Leader</h3>
                      <p className="text-sm text-gray-400 mt-1">{nextRankCredits} credits needed</p>
                    </div>
                    <div className="h-2.5 bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${currentProgress}%` }}
                      ></div>
                    </div>
                    <p className="mt-3 text-sm">{userData.totalCredits} / {nextRankCredits} credits</p>
                    <Button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      View Benefits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-xl">Activity Stats</CardTitle>
                  <CardDescription>Your contribution summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-space-deepBlue/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        <span>Events Organized</span>
                      </div>
                      <span className="font-semibold">{userData.stats.eventsOrganized}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-space-deepBlue/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-purple-400" />
                        <span>Workshops Attended</span>
                      </div>
                      <span className="font-semibold">{userData.stats.workshopsAttended}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-space-deepBlue/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-pink-400" />
                        <span>Mentoring Sessions</span>
                      </div>
                      <span className="font-semibold">{userData.stats.mentoringSessions}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-space-deepBlue/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-green-400" />
                        <span>Content Created</span>
                      </div>
                      <span className="font-semibold">{userData.stats.contentCreated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                  <CardHeader>
                    <CardTitle>Activity History</CardTitle>
                    <CardDescription>Recent activities that earned you credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-space-deepBlue/50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              {activityTypes[activity.type as keyof typeof activityTypes]}
                            </div>
                            <div>
                              <p className="font-medium">{activity.description}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(activity.date).toLocaleDateString('en-US', {
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="h-4 w-4 text-yellow-400" />
                            <span className="font-semibold">+{activity.credits}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">Load More Activities</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                  <CardHeader>
                    <CardTitle>Log New Activity</CardTitle>
                    <CardDescription>Record your contributions to earn credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Activity Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Describe your activity" className="bg-space-deepBlue/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Activity Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-deepBlue/50">
                                    <SelectValue placeholder="Select activity type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border-purple-500/20">
                                  <SelectItem value="event_organization">Event Organization</SelectItem>
                                  <SelectItem value="participation">Event Participation</SelectItem>
                                  <SelectItem value="mentorship">Mentorship</SelectItem>
                                  <SelectItem value="content_creation">Content Creation</SelectItem>
                                  <SelectItem value="representation">Club Representation</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="club"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Club</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-deepBlue/50">
                                    <SelectValue placeholder="Select club" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border-purple-500/20">
                                  {userData.clubs.map((club, idx) => (
                                    <SelectItem key={idx} value={club.name}>{club.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" className="bg-space-deepBlue/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Submit Activity
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Rewards Catalog</h2>
                <div className="flex items-center space-x-2 bg-space-deepBlue/50 px-4 py-2 rounded-lg">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">{userData.totalCredits} credits available</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userData.rewards.map((reward) => (
                  <Card key={reward.id} className={`bg-space-navy/40 backdrop-blur-md border border-purple-500/20 ${reward.redeemed ? 'opacity-70' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <CardDescription>
                        {reward.redeemed 
                          ? `Redeemed on ${new Date(reward.date || '').toLocaleDateString()}` 
                          : 'Available for redemption'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-md">
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={reward.image} 
                            alt={reward.name}
                            className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                          />
                        </AspectRatio>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-1">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{reward.cost} credits</span>
                      </div>
                      <Button 
                        disabled={reward.redeemed || userData.totalCredits < reward.cost} 
                        variant={reward.redeemed ? 'outline' : 'default'}
                        className={!reward.redeemed ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}
                      >
                        {reward.redeemed ? 'Redeemed' : 'Redeem Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Achievements</h2>
                <div className="bg-space-deepBlue/50 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {userData.achievements.filter(a => a.progress === 100).length} / {userData.achievements.length} Completed
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.achievements.map((achievement, idx) => (
                  <Card key={idx} className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {achievement.icon}
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        </div>
                        {achievement.progress === 100 && (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                            <BadgeCheck className="h-5 w-5 text-green-400" />
                          </span>
                        )}
                      </div>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              achievement.progress === 100 
                                ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                                : "bg-gradient-to-r from-purple-500 to-pink-500"
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Credits;
