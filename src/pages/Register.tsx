
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
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus } from 'lucide-react';
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

// Improved form schema with enhanced validation
const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .refine(value => !(/\s/.test(value)), { message: "First name cannot contain whitespace" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .refine(value => !(/\s/.test(value)), { message: "Last name cannot contain whitespace" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .refine(value => !(/\s/.test(value)), { message: "Email cannot contain whitespace" })
    .refine(value => value.endsWith('@gmail.com'), { message: "Only Gmail addresses are allowed" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
    .refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
    .refine(value => /[0-9]/.test(value), { message: "Password must contain at least one number" })
    .refine(value => /[^A-Za-z0-9]/.test(value), { message: "Password must contain at least one special character" })
    .refine(value => !(/\s/.test(value)), { message: "Password cannot contain whitespace" }),
  phoneNumber: z.string()
    .min(10, { message: "Phone number must have at least 10 digits" })
    .max(10, { message: "Phone number cannot have more than 10 digits" })
    .regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number" })
    .refine(value => !(/\s/.test(value)), { message: "Phone number cannot contain whitespace" }),
  city: z.string()
    .min(2, { message: "City is required" })
    .refine(value => !(/\s/.test(value.trim())), { message: "City cannot contain leading/trailing whitespace" }),
  state: z.string()
    .min(2, { message: "State is required" })
    .refine(value => !(/\s/.test(value.trim())), { message: "State cannot contain leading/trailing whitespace" }),
  college: z.string()
    .min(2, { message: "College name is required" }),
  role: z.enum(['member', 'club_head'], {
    required_error: "Please select your role",
  }),
});

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      city: "",
      state: "",
      college: "",
      role: "member",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Prevent registering with admin email
      if (values.email === 'admin@gmail.com') {
        toast.error('This email is reserved for admin use');
        return;
      }
      
      // Combine first and last name for the name field
      const fullName = `${values.firstName} ${values.lastName}`;
      
      await register({
        name: fullName,
        email: values.email,
        password: values.password,
        studentId: "TBD", // Default value as we're not collecting this now
        role: values.role,
        club: "Unassigned", // Default value as we're not collecting this now
        chapter: "Unassigned", // Default value as we're not collecting this now
        // These fields aren't in the User type but we'll pass them anyway
        phoneNumber: values.phoneNumber,
        city: values.city,
        state: values.state,
        college: values.college,
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John" 
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe" 
                              {...field} 
                              className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
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
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 1234567890" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">City</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your City" 
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
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">State</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your State" 
                              {...field} 
                              className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">College</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your College/University" 
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
                        <FormLabel className="text-gray-300">Register As</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2 rounded-md border border-purple-500/20 p-3 bg-space-navy/30">
                              <RadioGroupItem value="member" id="r-member" />
                              <label htmlFor="r-member" className="cursor-pointer text-gray-200 flex items-center">
                                <span className="ml-2">Club Member</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border border-purple-500/20 p-3 bg-space-navy/30">
                              <RadioGroupItem value="club_head" id="r-club_head" />
                              <label htmlFor="r-club_head" className="cursor-pointer text-gray-200 flex items-center">
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
