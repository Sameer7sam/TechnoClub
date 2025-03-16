
import React from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, GraduationCap, Building } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  studentId: z.string().min(2, { message: "Student ID is required" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  year: z.string({ required_error: "Please select your year of study" }),
  major: z.string().min(2, { message: "Please enter your major" }),
  club: z.string({ required_error: "Please select a club" }),
  chapter: z.string({ required_error: "Please select a chapter" }),
  skills: z.string().optional(),
  interests: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const Membership: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      studentId: "",
      phoneNumber: "",
      major: "",
      skills: "",
      interests: "",
      agreement: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Membership application submitted successfully! We'll contact you soon.");
    form.reset();
  }

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
      
      <main className="flex-grow py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-purple-300">Join Our Tech Community</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-blue-purple">Club Membership</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Join our tech clubs and start your journey! Fill out the form below to apply for membership.
            </p>
          </div>
          
          <Card className="max-w-3xl mx-auto glass-card cosmic-glow border-purple-500/20">
            <CardHeader className="bg-gradient-to-r from-space-navy to-space-deepBlue border-b border-purple-500/20">
              <CardTitle className="text-2xl text-gradient">Membership Application</CardTitle>
              <CardDescription className="text-purple-300/80">Please fill out all required fields</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
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
                          <FormLabel className="text-gray-300">Email*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
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
                          <FormLabel className="text-gray-300">Student ID*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., A12345678" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
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
                          <FormLabel className="text-gray-300">Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1234567890" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Year of Study*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-space-navy border border-purple-500/20">
                              <SelectItem value="1">First Year</SelectItem>
                              <SelectItem value="2">Second Year</SelectItem>
                              <SelectItem value="3">Third Year</SelectItem>
                              <SelectItem value="4">Fourth Year</SelectItem>
                              <SelectItem value="5">Fifth Year</SelectItem>
                              <SelectItem value="Graduate">Graduate Student</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Major/Program*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" />
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
                          <FormLabel className="text-gray-300">Club*</FormLabel>
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
                          <FormLabel className="text-gray-300">Chapter*</FormLabel>
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Technical Skills (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List your technical skills (e.g., programming languages, tools, platforms)" 
                            className="resize-none bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Areas of Interest (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What areas of technology are you most interested in?" 
                            className="resize-none bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-space-navy/30 border border-purple-500/10">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-300">
                            I agree to the club's code of conduct and understand membership responsibilities
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine"
                  >
                    Submit Application
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Membership;
