
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Users, Award, CalendarPlus } from 'lucide-react';
import { toast } from 'sonner';
import { EventData } from '@/contexts/AuthContext';

// Define schema for the credits form
const creditsFormSchema = z.object({
  recipientId: z.string().min(1, { message: "Please enter a recipient ID" }),
  amount: z.number().min(1, { message: "Credits must be at least 1" }),
  reason: z.string().min(3, { message: "Please provide a reason" })
    .max(100, { message: "Reason should be less than 100 characters" })
});

// Define schema for the event form
const eventFormSchema = z.object({
  name: z.string().min(3, { message: "Event name must be at least 3 characters" })
    .max(50, { message: "Event name should be less than 50 characters" })
    .refine(value => !(/\s/.test(value)), { message: "Event name cannot contain whitespace" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description should be less than 500 characters" }),
  date: z.string().min(1, { message: "Please select a date" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  credits: z.number().min(1, { message: "Credits must be at least 1" })
});

// Define schema for adding members to events
const addMemberSchema = z.object({
  eventId: z.string().min(1, { message: "Please enter an event ID" }),
  memberId: z.string().min(1, { message: "Please enter a member ID" })
});

// Define the ClubHeadTools component
const ClubHeadTools: React.FC = () => {
  const { giveCredits, createEvent, addMemberToEvent } = useAuth();
  const [activeTab, setActiveTab] = useState('credits');
  
  // Create forms using react-hook-form and zod
  const creditsForm = useForm<z.infer<typeof creditsFormSchema>>({
    resolver: zodResolver(creditsFormSchema),
    defaultValues: {
      recipientId: "",
      amount: 1,
      reason: ""
    }
  });
  
  const eventForm = useForm<EventData & z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
      location: "",
      credits: 1
    }
  });
  
  const memberForm = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      eventId: "",
      memberId: ""
    }
  });
  
  // Handle form submissions
  async function handleCreditsSubmit(values: z.infer<typeof creditsFormSchema>) {
    try {
      await giveCredits(values.recipientId, values.amount, values.reason);
      creditsForm.reset();
    } catch (error) {
      console.error("Error giving credits:", error);
    }
  }
  
  async function handleEventSubmit(values: EventData & z.infer<typeof eventFormSchema>) {
    try {
      await createEvent(values);
      eventForm.reset();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }
  
  async function handleMemberSubmit(values: z.infer<typeof addMemberSchema>) {
    try {
      await addMemberToEvent(values.eventId, values.memberId);
      memberForm.reset();
    } catch (error) {
      console.error("Error adding member to event:", error);
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Head Tools</CardTitle>
        <CardDescription>Manage credits, events, and members</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="credits" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credits">
              <Award className="h-4 w-4 mr-2" />
              Award Credits
            </TabsTrigger>
            <TabsTrigger value="events">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Create Event
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Add Members
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="credits">
            <Form {...creditsForm}>
              <form onSubmit={creditsForm.handleSubmit(handleCreditsSubmit)} className="space-y-4">
                <FormField
                  control={creditsForm.control}
                  name="recipientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter member ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={creditsForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credits Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          step="1" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={creditsForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Reason for awarding credits" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={creditsForm.formState.isSubmitting}
                >
                  Award Credits
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="events">
            <Form {...eventForm}>
              <form onSubmit={eventForm.handleSubmit(handleEventSubmit)} className="space-y-4">
                <FormField
                  control={eventForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event name" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Event description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                          <Input type="date" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={eventForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Event location" {...field} />
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
                      <FormLabel>Credits</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          step="1" 
                          placeholder="Credits for attending" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={eventForm.formState.isSubmitting}
                >
                  Create Event
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="members">
            <Form {...memberForm}>
              <form onSubmit={memberForm.handleSubmit(handleMemberSubmit)} className="space-y-4">
                <FormField
                  control={memberForm.control}
                  name="eventId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event ID" {...field} />
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
                      <FormLabel>Member ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter member ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={memberForm.formState.isSubmitting}
                >
                  Add Member to Event
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
