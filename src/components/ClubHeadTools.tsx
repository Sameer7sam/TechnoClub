
import React, { useState, useEffect } from 'react';
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
import { CreditCard, Calendar, Users, Award, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  eventId: z.string().min(1, { message: "Please select an event" }),
  memberId: z.string().min(1, { message: "Please enter member ID" }),
});

// Member search schema
const searchFormSchema = z.object({
  searchTerm: z.string().min(1, { message: "Please enter a search term" }),
});

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Event = {
  id: string;
  name: string;
  date: string;
};

const ClubHeadTools: React.FC = () => {
  const { giveCredits, createEvent, addMemberToEvent } = useAuth();
  const [activeTab, setActiveTab] = useState("credits");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

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

  // Search form
  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const { data, error } = await supabase
          .from('events')
          .select('id, name, date')
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle credit submission
  const onCreditSubmit = async (values: z.infer<typeof creditFormSchema>) => {
    try {
      await giveCredits(values.memberId, values.creditAmount, values.reason);
      creditForm.reset();
    } catch (error) {
      // Error is already handled in giveCredits
    }
  };

  // Handle event creation
  const onEventSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    try {
      const eventId = await createEvent(values);
      
      // Add the new event to the events list
      setEvents(prev => [
        { id: eventId, name: values.name, date: values.date },
        ...prev
      ]);
      
      eventForm.reset();
    } catch (error) {
      // Error is already handled in createEvent
    }
  };

  // Handle member addition to event
  const onMemberSubmit = async (values: z.infer<typeof memberFormSchema>) => {
    try {
      await addMemberToEvent(values.eventId, values.memberId);
      memberForm.reset();
    } catch (error) {
      // Error is already handled in addMemberToEvent
    }
  };

  // Handle member search
  const onSearchSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .or(`name.ilike.%${values.searchTerm}%,email.ilike.%${values.searchTerm}%`)
        .limit(10);
      
      if (error) throw error;
      
      setMembers(data || []);
      
      if (data.length === 0) {
        toast.info('No members found matching your search');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to search members');
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a member
  const selectMember = (memberId: string) => {
    if (activeTab === 'credits') {
      creditForm.setValue('memberId', memberId);
    } else if (activeTab === 'members') {
      memberForm.setValue('memberId', memberId);
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
        <div className="mb-6">
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="flex space-x-2">
              <FormField
                control={searchForm.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input 
                          placeholder="Search members by name or email" 
                          {...field} 
                          className="bg-space-navy/50 border-purple-500/20 focus:border-purple-500/50" 
                        />
                      </FormControl>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Search className="h-4 w-4 mr-1" />
                        Search
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          
          {members.length > 0 && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded-lg max-h-60 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Search Results</h3>
              <div className="space-y-2">
                {members.map(member => (
                  <div 
                    key={member.id} 
                    className="flex justify-between items-center p-2 hover:bg-gray-700/50 rounded cursor-pointer"
                    onClick={() => selectMember(member.id)}
                  >
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.email} • {member.role}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectMember(member.id);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
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
                      <FormDescription>
                        Use the search above to find and select a member
                      </FormDescription>
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
                      <FormLabel className="text-gray-300">Event</FormLabel>
                      <select
                        {...field}
                        className="w-full bg-space-navy/50 border border-purple-500/20 focus:border-purple-500/50 rounded-md p-2 text-white"
                      >
                        <option value="">Select an event</option>
                        {loadingEvents ? (
                          <option disabled>Loading events...</option>
                        ) : (
                          events.map(event => (
                            <option key={event.id} value={event.id}>
                              {event.name} ({new Date(event.date).toLocaleDateString()})
                            </option>
                          ))
                        )}
                      </select>
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
                      <FormDescription>
                        Use the search above to find and select a member
                      </FormDescription>
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
