
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
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const AdminTools: React.FC = () => {
  const { createChapter, createClub } = useAuth();
  const [activeTab, setActiveTab] = useState('chapters');
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create forms
  const chapterForm = useForm<z.infer<typeof chapterFormSchema>>({
    resolver: zodResolver(chapterFormSchema),
    defaultValues: {
      name: ""
    }
  });
  
  const clubForm = useForm<z.infer<typeof clubFormSchema>>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      name: "",
      chapterId: ""
    }
  });
  
  // Fetch chapters for dropdown
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
  
  useEffect(() => {
    fetchChapters();
  }, []);
  
  // Handle form submissions
  const handleChapterSubmit = async (values: z.infer<typeof chapterFormSchema>) => {
    try {
      await createChapter(values);
      chapterForm.reset();
      fetchChapters(); // Refresh the chapters list
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };
  
  const handleClubSubmit = async (values: z.infer<typeof clubFormSchema>) => {
    try {
      await createClub(values);
      clubForm.reset();
      toast.success('Club created successfully');
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };
  
  return (
    <Card className="bg-gradient-to-b from-space-navy/50 to-space-deepBlue/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">Admin Tools</CardTitle>
        <CardDescription className="text-gray-400">
          Manage chapters and clubs across your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chapters" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chapters" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Manage Chapters
            </TabsTrigger>
            <TabsTrigger value="clubs" className="flex items-center">
              <FolderPlus className="h-4 w-4 mr-2" />
              Manage Clubs
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
              <h3 className="text-lg font-medium text-white">Create New Club</h3>
              
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminTools;
