
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  CollapsibleContent, 
  CollapsibleTrigger, 
  Collapsible 
} from '@/components/ui/collapsible';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendarPlus, Users, MessageSquare, FileText, ChevronDown, Plus, Calendar } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Event {
  id: string;
  title: string;
  date: string;
  club: string;
  description: string;
  status: 'planning' | 'ongoing' | 'completed';
  teams: Team[];
  tasks: Task[];
  discussions: Discussion[];
}

interface Team {
  id: string;
  name: string;
  members: string[];
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
}

interface Discussion {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
}

// Sample data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Hackathon 2024',
    date: '2024-05-15',
    club: 'IEEE',
    description: 'A 48-hour hackathon focusing on sustainable technology solutions.',
    status: 'planning',
    teams: [
      {
        id: 't1',
        name: 'Logistics Team',
        members: ['Alex Johnson', 'Maria Garcia', 'Sam Lee'],
      },
      {
        id: 't2',
        name: 'Technical Support',
        members: ['Jamie Smith', 'Ryan Chen'],
      },
      {
        id: 't3',
        name: 'Judging Panel',
        members: ['Prof. Williams', 'Dr. Patel', 'Eng. Gonzalez'],
      },
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Secure venue',
        assignee: 'Alex Johnson',
        status: 'completed',
        dueDate: '2024-03-15',
      },
      {
        id: 'task2',
        title: 'Contact sponsors',
        assignee: 'Maria Garcia',
        status: 'in-progress',
        dueDate: '2024-04-01',
      },
      {
        id: 'task3',
        title: 'Prepare technical infrastructure',
        assignee: 'Jamie Smith',
        status: 'todo',
        dueDate: '2024-04-30',
      },
    ],
    discussions: [
      {
        id: 'd1',
        user: 'Alex Johnson',
        message: "I've contacted the university about using the main hall. They need a formal request letter.",
        timestamp: '2024-03-10T14:32:00',
        avatar: '',
      },
      {
        id: 'd2',
        user: 'Maria Garcia',
        message: 'I have a list of potential sponsors we worked with last year. Should I reach out to all of them again?',
        timestamp: '2024-03-11T09:15:00',
        avatar: '',
      },
      {
        id: 'd3',
        user: 'Jamie Smith',
        message: "We'll need to ensure we have reliable Wi-Fi for at least 100 participants. I'll check with IT.",
        timestamp: '2024-03-12T11:20:00',
        avatar: '',
      },
    ],
  },
  {
    id: '2',
    title: 'Tech Workshop Series',
    date: '2024-04-10',
    club: 'ACM',
    description: 'A series of workshops covering web development, mobile app development, and cloud computing.',
    status: 'ongoing',
    teams: [
      {
        id: 't1',
        name: 'Workshop Leaders',
        members: ['Emily Wong', 'David Kumar', 'Lisa Chen'],
      },
      {
        id: 't2',
        name: 'Outreach Team',
        members: ['Michael Brown', 'Sarah Johnson'],
      },
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Finalize workshop topics',
        assignee: 'Emily Wong',
        status: 'completed',
        dueDate: '2024-03-01',
      },
      {
        id: 'task2',
        title: 'Create promotional materials',
        assignee: 'Michael Brown',
        status: 'completed',
        dueDate: '2024-03-15',
      },
      {
        id: 'task3',
        title: 'Set up registration system',
        assignee: 'Sarah Johnson',
        status: 'in-progress',
        dueDate: '2024-03-25',
      },
    ],
    discussions: [
      {
        id: 'd1',
        user: 'Emily Wong',
        message: 'The web development workshop will focus on React and Node.js. Is that good with everyone?',
        timestamp: '2024-03-05T10:45:00',
        avatar: '',
      },
      {
        id: 'd2',
        user: 'Michael Brown',
        message: "I've created some flyer designs. Will share them for feedback soon.",
        timestamp: '2024-03-07T15:30:00',
        avatar: '',
      },
    ],
  },
];

// Status badge component
const StatusBadge: React.FC<{ status: 'planning' | 'ongoing' | 'completed' }> = ({ status }) => {
  const classes = {
    planning: 'bg-amber-100 text-amber-800 border-amber-200',
    ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  };
  
  const labels = {
    planning: 'Planning',
    ongoing: 'Ongoing',
    completed: 'Completed',
  };
  
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${classes[status]}`}>
      {labels[status]}
    </span>
  );
};

const Collaboration: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedEvent) return;
    
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          discussions: [
            ...event.discussions,
            {
              id: `d${Date.now()}`,
              user: 'You',
              message: newMessage,
              timestamp: new Date().toISOString(),
              avatar: '',
            },
          ],
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    setSelectedEvent(updatedEvents.find(e => e.id === selectedEvent.id) || null);
    setNewMessage('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Event Collaboration Hub</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Plan, organize, and execute successful events together with your club members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar - Event List */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Club Events</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="sm">
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      New Event
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Create New Event</SheetTitle>
                      <SheetDescription>
                        Add the details for your new club event.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input id="event-title" placeholder="Enter event title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Event Date</Label>
                        <Input id="event-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-club">Club</Label>
                        <Input id="event-club" placeholder="Enter club name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-description">Description</Label>
                        <Textarea id="event-description" placeholder="Enter event description" className="min-h-[100px]" />
                      </div>
                      <div className="space-y-2">
                        <Label>Event Status</Label>
                        <RadioGroup defaultValue="planning">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="planning" id="planning" />
                            <Label htmlFor="planning">Planning</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ongoing" id="ongoing" />
                            <Label htmlFor="ongoing">Ongoing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="completed" id="completed" />
                            <Label htmlFor="completed">Completed</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Button className="w-full">Create Event</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="space-y-4">
                {events.map((event) => (
                  <Card 
                    key={event.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${selectedEvent?.id === event.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <StatusBadge status={event.status} />
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      <div className="mt-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          {event.teams.reduce((acc, team) => acc + team.members.length, 0)} Members
                        </div>
                        <div className="flex items-center mt-1">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          {event.discussions.length} Comments
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Main Content - Event Details */}
            <div className="lg:col-span-3">
              {selectedEvent ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{selectedEvent.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {selectedEvent.club} • {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </CardDescription>
                        </div>
                        <StatusBadge status={selectedEvent.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedEvent.description}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Teams */}
                  <Card>
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="py-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Users className="mr-2 h-5 w-5 text-gray-500" />
                              <CardTitle className="text-lg">Teams & Members</CardTitle>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            {selectedEvent.teams.map((team) => (
                              <div key={team.id} className="border rounded-lg p-4">
                                <h4 className="font-medium text-base mb-2">{team.name}</h4>
                                <div className="space-y-2">
                                  {team.members.map((member, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback>{member.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <span>{member}</span>
                                    </div>
                                  ))}
                                </div>
                                <Button variant="outline" size="sm" className="mt-3">
                                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                                  Add Member
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Create New Team
                            </Button>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                  
                  {/* Tasks */}
                  <Card>
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="py-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-gray-500" />
                              <CardTitle className="text-lg">Tasks</CardTitle>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {selectedEvent.tasks.map((task) => (
                              <div 
                                key={task.id} 
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  task.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="pt-0.5">
                                    <input 
                                      type="checkbox" 
                                      checked={task.status === 'completed'} 
                                      className="rounded text-primary focus:ring-primary"
                                      readOnly
                                    />
                                  </div>
                                  <div>
                                    <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                      {task.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Assigned to: {task.assignee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                                    task.status === 'todo' ? 'bg-gray-100 text-gray-800' : 
                                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {task.status === 'todo' ? 'To Do' : 
                                     task.status === 'in-progress' ? 'In Progress' : 
                                     'Completed'}
                                  </span>
                                </div>
                              </div>
                            ))}
                            <Button variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Add New Task
                            </Button>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                  
                  {/* Discussion */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-gray-500" />
                        <CardTitle className="text-lg">Discussion</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4">
                        {selectedEvent.discussions.map((discussion) => (
                          <div key={discussion.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{discussion.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline">
                                <p className="font-medium">{discussion.user}</p>
                                <span className="text-xs text-gray-500 ml-2">
                                  {new Date(discussion.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-1">{discussion.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Type your message..." 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage}>Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="flex items-center justify-center h-96">
                  <CardContent className="text-center p-6">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <CardTitle className="text-xl mb-2">No Event Selected</CardTitle>
                    <CardDescription>
                      Select an event from the list or create a new one to start collaborating.
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collaboration;
