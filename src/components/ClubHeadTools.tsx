
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Calendar, Users, Award } from 'lucide-react';

// Credit assignment form schema
const creditFormSchema = z.object({
  memberId: z.string().min(1, { message: "Please enter member ID" }),
  creditAmount: z.coerce.number()
    .min(1, { message: "Credit amount must be at least 1" })
    .max(100, { message: "Credit amount cannot exceed 100" }),
  reason: z.string().min(5, { message: "Please provide a reason for the credits" }),
});

// Event creation form schema
const eventFormSchema = z.object({
  name: z.string().min(3, { message: "Event name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Please provide a detailed description" }),
  date: z.string().min(1, { message: "Please select a date" }),
  credits: z.coerce.number()
    .min(1, { message: "Credit value must be at least 1" })
    .max(100, { message: "Credit value cannot exceed 100" }),
  location: z.string().min(3, { message: "Please enter an event location" }),
});

// Member addition form schema
const memberFormSchema = z.object({
  eventId: z.string().min(1, { message: "Please enter event ID" }),
  memberId: z.string().min(1, { message: "Please enter member ID" }),
});

const ClubHeadTools: React.FC = () => {
  const { giveCredits, createEvent, addMemberToEvent } = useAuth();
  const [activeTab, setActiveTab] = useState("credits");

  // Credit form
  const creditForm = useForm<z.infer<typeof creditFormSchema>>({
    resolver: zodResolver(creditFormSchema),
    defaultValues: {
      memberId: "",
      creditAmount: 0,
      reason: "",
    },
  });

  // Event form
  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
      credits: 0,
      location: "",
    },
  });

  // Member addition form
  const memberForm = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      eventId: "",
      memberId: "",
    },
  });

  // Handle credit submission
  const onCreditSubmit = async (values: z.infer<typeof creditFormSchema>) => {
    try {
      await giveCredits(values.memberId, values.creditAmount, values.reason);
      toast.success("Credits assigned successfully!");
      creditForm.reset();
    } catch (error) {
      toast.error("Failed to assign credits. Try again.");
    }
  };

  // Handle event creation
  const onEventSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    try {
      await createEvent(values);
      toast.success("Event created successfully!");
      eventForm.reset();
    } catch (error) {
      toast.error("Failed to create event. Try again.");
    }
  };

  // Handle member addition to event
  const onMemberSubmit = async (values: z.infer<typeof memberFormSchema>) => {
    try {
      await addMemberToEvent(values.eventId, values.memberId);
      toast.success("Member added to event successfully!");
      memberForm.reset();
    } catch (error) {
      toast.error("Failed to add member to event. Try again.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass-card cosmic-glow border-purple-500/20">
      <CardHeader className="bg-gradient-to-r from-space-navy to-space-deepBlue border-b border-purple-500/20">
        <CardTitle className="text-2xl text-gradient">Club Head Tools</CardTitle>
        <CardDescription className="text-purple-300/80">
          Manage credits, events, and team members
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Assign Credits
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Create Events
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Add Team Members
            </TabsTrigger>
          </TabsList>
          
          {/* Credits Tab */}
          <TabsContent value="credits">
            <Form {...creditForm}>
              <form onSubmit={creditForm.handleSubmit(onCreditSubmit)} className="space-y-4">
                <FormField
                  control={creditForm.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Member ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter member ID" 
                          {...field} 
                          className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={creditForm.control}
                  name="creditAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Credit Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter credit amount" 
                          {...field} 
                          className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={creditForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Reason</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter reason for credit assignment" 
                          {...field} 
                          className="resize-none bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Assign Credits
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events">
            <Form {...eventForm}>
              <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-4">
                <FormField
                  control={eventForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Event Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter event name" 
                          {...field} 
                          className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter event description" 
                          {...field} 
                          className="resize-none bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={eventForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={eventForm.control}
                    name="credits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Credit Value</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter credit value" 
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
                  control={eventForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter event location" 
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members">
            <Form {...memberForm}>
              <form onSubmit={memberForm.handleSubmit(onMemberSubmit)} className="space-y-4">
                <FormField
                  control={memberForm.control}
                  name="eventId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Event ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter event ID" 
                          {...field} 
                          className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={memberForm.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Member ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter member ID" 
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClubHeadTools;
