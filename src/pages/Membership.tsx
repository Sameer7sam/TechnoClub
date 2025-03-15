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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Club Membership</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join our tech clubs and start your journey! Fill out the form below to apply for membership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <UserPlus className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Get Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Join a community of like-minded tech enthusiasts and build your professional network.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <CardHeader className="pb-2">
                <GraduationCap className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Learn & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Access workshops, training sessions, and resources to enhance your technical skills.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
              <CardHeader className="pb-2">
                <Building className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle>Build Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Participate in projects, hackathons, and events to gain real-world experience.</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Membership Application</CardTitle>
              <CardDescription className="text-blue-100">Please fill out all required fields</CardDescription>
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
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                          <FormLabel>Student ID*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., A12345678" {...field} />
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
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1234567890" {...field} />
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
                          <FormLabel>Year of Study*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                          <FormLabel>Major/Program*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} />
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
                          <FormLabel>Club*</FormLabel>
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("chapter", ""); // Reset chapter when club changes
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select club" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                          <FormLabel>Chapter*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedClub}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={selectedClub ? "Select chapter" : "Select a club first"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                        <FormLabel>Technical Skills (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List your technical skills (e.g., programming languages, tools, platforms)" 
                            className="resize-none" 
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
                        <FormLabel>Areas of Interest (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What areas of technology are you most interested in?" 
                            className="resize-none" 
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
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the club's code of conduct and understand membership responsibilities
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
