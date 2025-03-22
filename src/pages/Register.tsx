
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
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
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  studentId: z.string().min(2, { message: "Student ID is required" }),
  club: z.string({ required_error: "Please select a club" }),
  chapter: z.string({ required_error: "Please select a chapter" }),
});

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      studentId: "",
      club: "",
      chapter: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  
  const clubs = ["IEEE", "ACM", "AWS", "GDG", "STIC"];
  const chapters = {
    "IEEE": ["Computer Society", "Signal Processing", "Robotics & Automation", "Women in Engineering"],
    "ACM": ["General", "SIGCHI", "SIGAI", "SIGSOFT"],
    "AWS": ["Cloud Computing", "Machine Learning", "DevOps", "Solutions Architecture"],
    "GDG": ["Web", "Mobile", "Cloud", "Machine Learning"],
    "STIC": ["Coding", "Design", "Hardware", "Research"],
  };
  
  const selectedClub = form.watch("club");
  const availableChapters = selectedClub ? chapters[selectedClub as keyof typeof chapters] : [];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        studentId: values.studentId,
        role: 'member',
        club: values.club,
        chapter: values.chapter,
      });
      toast.success("Registration successful!");
      navigate('/profile');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-space-black relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-space-deepBlue to-space-navy opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_20%,rgba(120,50,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 stars-bg opacity-40"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow py-16 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-md mx-auto glass-card cosmic-glow border-purple-500/20">
            <CardHeader className="bg-gradient-to-r from-space-navy to-space-deepBlue border-b border-purple-500/20">
              <CardTitle className="text-2xl text-gradient">Create Account</CardTitle>
              <CardDescription className="text-purple-300/80">Join the TechnoClubs community</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Student ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., A12345678" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="club"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Club</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("chapter", ""); // Reset chapter when club changes
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                              <SelectValue placeholder="Select club" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-space-navy border border-purple-500/20">
                            {clubs.map((club) => (
                              <SelectItem key={club} value={club}>{club}</SelectItem>
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
                        <FormLabel className="text-gray-300">Chapter</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedClub}>
                          <FormControl>
                            <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                              <SelectValue placeholder={selectedClub ? "Select chapter" : "Select a club first"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-space-navy border border-purple-500/20">
                            {availableChapters.map((chapter) => (
                              <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                        Registering...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pt-0">
              <div className="text-sm text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
