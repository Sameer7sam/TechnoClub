
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
import { useAuth } from '@/contexts/AuthContext';
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
  Code,
  PenTool,
  Cpu,
  Lightbulb,
  Video,
  BookOpen,
  Edit,
  MessageSquare
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Task type definitions
interface Task {
  id: number;
  title: string;
  description: string;
  credits: number;
  category: string;
  chapter: string;
  club: string;
  deadline: string;
  image: string;
  icon: React.ReactNode;
}

// Define specific task activities with relevant images
const taskActivities: Task[] = [
  {
    id: 1,
    title: "AI Workshop Organization",
    description: "Organize a workshop on artificial intelligence and machine learning fundamentals.",
    credits: 50,
    category: "event_organization",
    chapter: "SIGAI",
    club: "ACM",
    deadline: "2024-04-15",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
    icon: <Lightbulb className="h-4 w-4 text-amber-500" />
  },
  {
    id: 2,
    title: "Web Development Tutorial",
    description: "Create a comprehensive tutorial on modern web development techniques.",
    credits: 40,
    category: "content_creation",
    chapter: "Web",
    club: "GDG",
    deadline: "2024-04-20",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    icon: <Code className="h-4 w-4 text-blue-500" />
  },
  {
    id: 3,
    title: "Mentorship Program",
    description: "Mentor junior members in software development best practices.",
    credits: 30,
    category: "mentorship",
    chapter: "Computer Society",
    club: "IEEE",
    deadline: "2024-05-10",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    icon: <User className="h-4 w-4 text-purple-500" />
  },
  {
    id: 4,
    title: "Tech Conference Representation",
    description: "Represent the club at the upcoming technology conference.",
    credits: 45,
    category: "representation",
    chapter: "Signal Processing",
    club: "IEEE",
    deadline: "2024-04-30",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80",
    icon: <Building className="h-4 w-4 text-rose-500" />
  },
  {
    id: 5,
    title: "Hardware Hackathon",
    description: "Organize a hardware hackathon focused on IoT devices.",
    credits: 55,
    category: "event_organization",
    chapter: "Hardware",
    club: "STIC",
    deadline: "2024-05-15",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
    icon: <Cpu className="h-4 w-4 text-green-500" />
  },
  {
    id: 6,
    title: "UX Design Workshop",
    description: "Lead a workshop on user experience design principles.",
    credits: 35,
    category: "content_creation",
    chapter: "SIGCHI",
    club: "ACM",
    deadline: "2024-05-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    icon: <PenTool className="h-4 w-4 text-pink-500" />
  },
  {
    id: 7,
    title: "Cloud Computing Seminar",
    description: "Create and present a seminar on cloud computing technologies.",
    credits: 40,
    category: "content_creation",
    chapter: "Cloud Computing",
    club: "AWS",
    deadline: "2024-04-25",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
    icon: <Video className="h-4 w-4 text-blue-500" />
  },
  {
    id: 8,
    title: "Technical Documentation",
    description: "Create detailed documentation for club resources and tools.",
    credits: 30,
    category: "content_creation",
    chapter: "SIGSOFT",
    club: "ACM",
    deadline: "2024-05-20",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    icon: <FileText className="h-4 w-4 text-amber-500" />
  },
  {
    id: 9,
    title: "Research Paper Review",
    description: "Review and summarize recent research papers in machine learning.",
    credits: 25,
    category: "content_creation",
    chapter: "Machine Learning",
    club: "AWS",
    deadline: "2024-05-08",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&q=80",
    icon: <BookOpen className="h-4 w-4 text-indigo-500" />
  },
  {
    id: 10,
    title: "Blog Post Creation",
    description: "Write a blog post about emerging technologies for the club website.",
    credits: 20,
    category: "content_creation",
    chapter: "Mobile",
    club: "GDG",
    deadline: "2024-04-18",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    icon: <Edit className="h-4 w-4 text-emerald-500" />
  },
  {
    id: 11,
    title: "Discussion Forum Moderation",
    description: "Moderate the club's online discussion forum for a month.",
    credits: 30,
    category: "mentorship",
    chapter: "DevOps",
    club: "AWS",
    deadline: "2024-05-25",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    icon: <MessageSquare className="h-4 w-4 text-purple-500" />
  }
];

const activityFormSchema = z.object({
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  type: z.string({ required_error: "Please select an activity type" }),
  date: z.string({ required_error: "Please select a date" }),
  club: z.string({ required_error: "Please select a club" }),
  chapter: z.string({ required_error: "Please select a chapter" }),
});

const activityTypes = {
  event_organization: <Calendar className="h-4 w-4 text-green-500" />,
  participation: <User className="h-4 w-4 text-blue-500" />,
  mentorship: <User className="h-4 w-4 text-purple-500" />,
  content_creation: <FileText className="h-4 w-4 text-amber-500" />,
  representation: <Building className="h-4 w-4 text-rose-500" />
};

const EnhancedCredits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'rewards' | 'tasks'>('overview');
  const { user } = useAuth();
  
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

  // Filter tasks based on user's club and chapter
  const userSpecificTasks = user ? taskActivities.filter(task => 
    task.club === user.club && task.chapter === user.chapter
  ) : [];

  // Activities the user has completed
  const userRecentActivities = [
    { id: 1, description: "Organized workshop on Web Development", credits: 50, date: "2024-03-15", type: "event_organization" },
    { id: 2, description: "Participated in Hackathon 2024", credits: 30, date: "2024-03-01", type: "participation" },
    { id: 3, description: "Mentored new club members", credits: 25, date: "2024-02-20", type: "mentorship" },
    { id: 4, description: "Created tutorial content", credits: 20, date: "2024-02-10", type: "content_creation" },
    { id: 5, description: "Represented club at university fair", credits: 15, date: "2024-01-25", type: "representation" }
  ];

  // Rewards the user can redeem
  const userRewards = [
    { id: 1, name: "Workshop Certificate", cost: 100, redeemed: true, date: "2024-01-15", image: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=600&q=80" },
    { id: 2, name: "Tech Conference Pass", cost: 300, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
    { id: 3, name: "Campus Cafe Voucher", cost: 50, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1606790190211-aa9c14239773?w=600&q=80" },
    { id: 4, name: "Club Merchandise", cost: 75, redeemed: false, date: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80" },
    { id: 5, name: "Priority Event Registration", cost: 120, redeemed: true, date: "2024-02-05", image: "https://images.unsplash.com/photo-1560439514-e960a3ef5019?w=600&q=80" }
  ];

  const userClubs = [
    { name: user?.club || "IEEE", role: "Member", credits: 250 },
  ];

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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Credit System</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Track your contributions, earn credits, and redeem rewards for your active participation.
            </p>
          </div>
          
          <Card className="mb-8 overflow-hidden bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{user?.name || "Alex Johnson"}</h2>
                  <p className="opacity-90">{user?.email || "alex.johnson@example.com"}</p>
                  <p className="opacity-80 text-sm">Student ID: {user?.studentId || "A12345678"}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <Coins className="h-7 w-7 text-yellow-300 mr-2" />
                  <div>
                    <p className="text-white text-sm font-medium">Total Credits</p>
                    <p className="text-white text-2xl font-bold">{user?.totalCredits || 450}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Senior Contributor
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {new Date(user?.joinDate || "2023-08-15").toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                </span>
                {userClubs.map((club, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    <Award className="h-3.5 w-3.5" />
                    {club.name} • {user?.chapter || "Computer Society"}
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
                  variant={activeTab === 'tasks' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('tasks')}
                  className="rounded-full"
                >
                  Chapter Tasks
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
              </div>
            </div>
          </Card>
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-400" />
                    Credit Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userClubs.map((club, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{club.name}</span>
                          <span className="text-sm text-gray-500">{club.credits} credits</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${calculatePercentage(club.credits, user?.totalCredits || 450)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-amber-400" />
                    Next Rank
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="inline-block p-3 bg-amber-100 text-amber-700 rounded-full">
                      <Trophy className="h-8 w-8" />
                    </span>
                    <h3 className="text-lg font-semibold mt-3">Club Leader</h3>
                    <p className="text-sm text-gray-500 mt-1">50 credits needed</p>
                  </div>
                  <div className="h-2.5 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                  <p className="mt-3 text-sm">{user?.totalCredits || 450} / 500 credits</p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    View Benefits
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-space-navy/40 backdrop-blur-md border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-rose-400" />
                    Available Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userRewards.filter(reward => !reward.redeemed).slice(0, 3).map((reward, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <p className="font-medium">{reward.name}</p>
                          <p className="text-xs text-gray-400">{reward.cost} credits</p>
                        </div>
                        <Button size="sm" variant="outline" className="h-8">
                          Redeem
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-2">
                    View All Rewards
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(userSpecificTasks.length > 0 ? userSpecificTasks : taskActivities.slice(0, 6)).map((task) => (
                  <Card key={task.id} className="overflow-hidden bg-space-navy/40 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={task.image} 
                          alt={task.title}
                          className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                        />
                      </AspectRatio>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            {task.icon}
                            <span className="text-xs font-medium text-gray-400 ml-1">{task.category.replace('_', ' ')}</span>
                          </div>
                          <CardTitle className="text-xl">{task.title}</CardTitle>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-purple-900/30 rounded-md">
                          <Coins className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{task.credits}</span>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-gray-400 line-clamp-2">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm pt-0">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Club:</span>
                          <span>{task.club}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Chapter:</span>
                          <span>{task.chapter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deadline:</span>
                          <span className="text-amber-400">{new Date(task.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Take This Task
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
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
                      {userRecentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              {activityTypes[activity.type as keyof typeof activityTypes]}
                            </div>
                            <div>
                              <p className="font-medium">{activity.description}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(activity.date).toLocaleDateString('en-US', {
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="h-4 w-4 text-yellow-500" />
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
                                <Input placeholder="Describe your activity" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
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
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select activity type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border border-purple-500/20">
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
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select club" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border border-purple-500/20">
                                  {userClubs.map((club, idx) => (
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
                          name="chapter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chapter</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select chapter" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border border-purple-500/20">
                                  <SelectItem value="Computer Society">Computer Society</SelectItem>
                                  <SelectItem value="Signal Processing">Signal Processing</SelectItem>
                                  <SelectItem value="Robotics & Automation">Robotics & Automation</SelectItem>
                                  <SelectItem value="Women in Engineering">Women in Engineering</SelectItem>
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
                                <Input type="date" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Submit Activity</Button>
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
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{user?.totalCredits || 450} credits available</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRewards.map((reward) => (
                  <Card key={reward.id} className={`bg-space-navy/40 backdrop-blur-md border border-purple-500/20 ${reward.redeemed ? 'opacity-70' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle>{reward.name}</CardTitle>
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
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{reward.cost} credits</span>
                      </div>
                      <Button 
                        disabled={reward.redeemed || (user?.totalCredits || 450) < reward.cost} 
                        variant={reward.redeemed ? 'outline' : 'default'}
                        className={reward.redeemed ? "" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"}
                      >
                        {reward.redeemed ? 'Redeemed' : 'Redeem Now'}
                      </Button>
                    </CardFooter>
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

export default EnhancedCredits;

function Gift(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}
