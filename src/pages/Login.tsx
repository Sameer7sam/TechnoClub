
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogIn, KeySquare } from 'lucide-react';
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

// Define form schema with validation
const formSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .refine(value => !(/\s/.test(value)), { message: "Email cannot contain whitespace" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .refine(value => !(/\s/.test(value)), { message: "Password cannot contain whitespace" }),
  role: z.enum(['member', 'club_head'], {
    required_error: "Please select your role",
  }),
});

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/profile';

  // If already authenticated, redirect to profile
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "member",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password, values.role);
      // Don't navigate here - we'll let the useEffect handle it
      // This avoids race conditions with auth state updates
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your email, password, and role.");
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
      
      <main className="flex-grow py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-md mx-auto glass-card cosmic-glow border-purple-500/20">
            <CardHeader className="bg-gradient-to-r from-space-navy to-space-deepBlue border-b border-purple-500/20">
              <CardTitle className="text-2xl text-gradient">Login</CardTitle>
              <CardDescription className="text-purple-300/80">Access your TechnoClubs account</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input 
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
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-300">Login As</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2 rounded-md border border-purple-500/20 p-3 bg-space-navy/30">
                              <RadioGroupItem value="member" id="member" />
                              <label htmlFor="member" className="cursor-pointer text-gray-200 flex items-center">
                                <span className="ml-2">Club Member</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border border-purple-500/20 p-3 bg-space-navy/30">
                              <RadioGroupItem value="club_head" id="club_head" />
                              <label htmlFor="club_head" className="cursor-pointer text-gray-200 flex items-center">
                                <span className="ml-2">Club Head</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
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
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pt-0">
              <div className="text-sm text-center text-gray-400">
                Don't have an account yet?{' '}
                <Link to="/register" className="text-purple-400 hover:text-purple-300">
                  Register
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

export default Login;
