
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Building2, 
  FolderPlus,
  RefreshCw,
  Users,
  UserPlus
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChapterData, ClubData } from '@/utils/authUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tables } from '@/integrations/supabase/client';

// Schema for adding chapters
const chapterFormSchema = z.object({
  name: z.string()
    .min(3, { message: "Chapter name must be at least 3 characters" })
    .max(50, { message: "Chapter name should be less than 50 characters" })
});

// Schema for adding clubs
const clubFormSchema = z.object({
  name: z.string()
    .min(3, { message: "Club name must be at least 3 characters" })
    .max(50, { message: "Club name should be less than 50 characters" }),
  chapterId: z.string()
    .min(1, { message: "Please select a chapter" })
});

// Schema for assigning club heads
const clubHeadFormSchema = z.object({
  userId: z.string()
    .min(1, { message: "Please select a user" }),
  clubId: z.string()
    .min(1, { message: "Please select a club" })
});

type ChapterFormValues = z.infer<typeof chapterFormSchema>;
type ClubFormValues = z.infer<typeof clubFormSchema>;
type ClubHeadFormValues = z.infer<typeof clubHeadFormSchema>;

const ManageClubs: React.FC = () => {
  const { createChapter, createClub, assignClubHead, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('chapters');
  const [chapters, setChapters] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create forms
  const chapterForm = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterFormSchema),
    defaultValues: {
      name: ""
    }
  });
  
  const clubForm = useForm<ClubFormValues>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      name: "",
      chapterId: ""
    }
  });
  
  const clubHeadForm = useForm<ClubHeadFormValues>({
    resolver: zodResolver(clubHeadFormSchema),
    defaultValues: {
      userId: "",
      clubId: ""
    }
  });
  
  // Fetch data for dropdowns
  const fetchChapters = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setChapters(data || []);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      toast.error('Failed to load chapters');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchClubs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, chapters(name)')
        .order('name');
      
      if (error) throw error;
      
      setClubs(data || []);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Failed to load clubs');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .order('name');
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAll = async () => {
    await Promise.all([
      fetchChapters(),
      fetchClubs(),
      fetchUsers()
    ]);
  };
  
  useEffect(() => {
    fetchAll();
  }, []);
  
  // Handle form submissions
  const handleChapterSubmit = async (values: ChapterFormValues) => {
    try {
      const chapterData: ChapterData = {
        name: values.name
      };
      await createChapter(chapterData);
      chapterForm.reset();
      fetchChapters(); // Refresh the chapters list
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };
  
  const handleClubSubmit = async (values: ClubFormValues) => {
    try {
      const clubData: ClubData = {
        name: values.name,
        chapterId: values.chapterId
      };
      await createClub(clubData);
      clubForm.reset();
      fetchClubs(); // Refresh the clubs list
      toast.success('Club created successfully');
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };
  
  const handleClubHeadSubmit = async (values: ClubHeadFormValues) => {
    try {
      await assignClubHead(values.userId, values.clubId);
      clubHeadForm.reset();
      fetchUsers(); // Refresh the users list to update roles
      toast.success('Club head assigned successfully');
    } catch (error) {
      console.error('Error assigning club head:', error);
    }
  };
  
  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex flex-col bg-space-black">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md bg-space-navy/50 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-red-400">Access Denied</CardTitle>
              <CardDescription className="text-gray-400">
                You don't have permission to access this page. Only administrators can manage clubs.
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Manage Clubs & Chapters</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Create and manage chapters, clubs, and assign club head roles to users.
            </p>
          </div>
          
          <Card className="bg-gradient-to-b from-space-navy/50 to-space-deepBlue/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Admin Management Console</CardTitle>
              <CardDescription className="text-gray-400">
                Create and manage organizational structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chapters" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="chapters" className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Manage Chapters
                  </TabsTrigger>
                  <TabsTrigger value="clubs" className="flex items-center">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Manage Clubs
                  </TabsTrigger>
                  <TabsTrigger value="clubheads" className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Club Heads
                  </TabsTrigger>
                </TabsList>
                
                {/* Chapters Tab */}
                <TabsContent value="chapters">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">Create New Chapter</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={fetchChapters}
                        disabled={isLoading}
                        className="text-gray-300 border-gray-700"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                    
                    <Form {...chapterForm}>
                      <form onSubmit={chapterForm.handleSubmit(handleChapterSubmit)} className="space-y-4">
                        <FormField
                          control={chapterForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Chapter Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="E.g., IEEE Chapter" 
                                  {...field} 
                                  className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          disabled={chapterForm.formState.isSubmitting}
                        >
                          {chapterForm.formState.isSubmitting ? (
                            <span className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                              Creating...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Building2 className="mr-2 h-4 w-4" />
                              Create Chapter
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                    
                    {/* Chapter List */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white mb-3">Existing Chapters</h3>
                      
                      {isLoading ? (
                        <div className="flex justify-center py-4">
                          <RefreshCw className="animate-spin h-6 w-6 text-purple-500" />
                        </div>
                      ) : chapters.length > 0 ? (
                        <div className="space-y-2">
                          {chapters.map((chapter) => (
                            <div 
                              key={chapter.id} 
                              className="p-3 bg-space-navy/30 rounded-md border border-purple-500/20"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-white">{chapter.name}</span>
                                <span className="text-xs text-gray-400">
                                  Created: {new Date(chapter.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-4">No chapters found. Create your first chapter above.</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Clubs Tab */}
                <TabsContent value="clubs">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">Create New Club</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={fetchAll}
                        disabled={isLoading}
                        className="text-gray-300 border-gray-700"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                    
                    <Form {...clubForm}>
                      <form onSubmit={clubForm.handleSubmit(handleClubSubmit)} className="space-y-4">
                        <FormField
                          control={clubForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Club Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="E.g., AWS Club" 
                                  {...field} 
                                  className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clubForm.control}
                          name="chapterId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Chapter</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select chapter" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border-purple-500/20">
                                  {chapters.map((chapter) => (
                                    <SelectItem key={chapter.id} value={chapter.id}>
                                      {chapter.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          disabled={clubForm.formState.isSubmitting || chapters.length === 0}
                        >
                          {clubForm.formState.isSubmitting ? (
                            <span className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                              Creating...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <FolderPlus className="mr-2 h-4 w-4" />
                              Create Club
                            </span>
                          )}
                        </Button>
                        
                        {chapters.length === 0 && (
                          <p className="text-amber-300 text-sm mt-2">
                            You need to create at least one chapter before you can create clubs.
                          </p>
                        )}
                      </form>
                    </Form>
                    
                    {/* Club List */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white mb-3">Existing Clubs</h3>
                      
                      {isLoading ? (
                        <div className="flex justify-center py-4">
                          <RefreshCw className="animate-spin h-6 w-6 text-purple-500" />
                        </div>
                      ) : clubs.length > 0 ? (
                        <div className="space-y-2">
                          {clubs.map((club) => (
                            <div 
                              key={club.id} 
                              className="p-3 bg-space-navy/30 rounded-md border border-purple-500/20"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium text-white">{club.name}</span>
                                  <p className="text-xs text-gray-400">
                                    Chapter: {club.chapters?.name || 'Unknown'}
                                  </p>
                                </div>
                                <span className="text-xs text-gray-400">
                                  Created: {new Date(club.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-4">No clubs found. Create your first club above.</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Club Heads Tab */}
                <TabsContent value="clubheads">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">Assign Club Head</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={fetchAll}
                        disabled={isLoading}
                        className="text-gray-300 border-gray-700"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh Data
                      </Button>
                    </div>
                    
                    <Form {...clubHeadForm}>
                      <form onSubmit={clubHeadForm.handleSubmit(handleClubHeadSubmit)} className="space-y-4">
                        <FormField
                          control={clubHeadForm.control}
                          name="userId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Select User</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select user" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border-purple-500/20 max-h-[300px]">
                                  {users.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                      {user.name} ({user.email}) - {user.role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clubHeadForm.control}
                          name="clubId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Select Club</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                    <SelectValue placeholder="Select club" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space-navy border-purple-500/20">
                                  {clubs.map((club) => (
                                    <SelectItem key={club.id} value={club.id}>
                                      {club.name} ({club.chapters?.name})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          disabled={clubHeadForm.formState.isSubmitting || clubs.length === 0 || users.length === 0}
                        >
                          {clubHeadForm.formState.isSubmitting ? (
                            <span className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                              Assigning...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Assign as Club Head
                            </span>
                          )}
                        </Button>
                        
                        {(clubs.length === 0 || users.length === 0) && (
                          <p className="text-amber-300 text-sm mt-2">
                            You need both clubs and users to assign club heads.
                          </p>
                        )}
                      </form>
                    </Form>
                    
                    {/* Club Heads List */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white mb-3">Current Club Heads</h3>
                      
                      {isLoading ? (
                        <div className="flex justify-center py-4">
                          <RefreshCw className="animate-spin h-6 w-6 text-purple-500" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {users.filter(user => user.role === 'club_head').length > 0 ? (
                            users.filter(user => user.role === 'club_head').map((user) => (
                              <div 
                                key={user.id} 
                                className="p-3 bg-space-navy/30 rounded-md border border-purple-500/20"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium text-white">{user.name}</span>
                                    <p className="text-xs text-gray-400">
                                      {user.email}
                                    </p>
                                  </div>
                                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                                    Club Head
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-center py-4">No club heads assigned yet.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManageClubs;
