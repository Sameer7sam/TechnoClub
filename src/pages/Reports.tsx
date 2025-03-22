
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Calendar, Users, Award, Activity, Filter, BarChart, PieChart, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  LineChart,
  Line
} from 'recharts';

const membershipData = [
  { month: "Jan", count: 42, previousYear: 30 },
  { month: "Feb", count: 56, previousYear: 35 },
  { month: "Mar", count: 73, previousYear: 42 },
  { month: "Apr", count: 85, previousYear: 58 },
  { month: "May", count: 102, previousYear: 65 },
  { month: "Jun", count: 120, previousYear: 72 },
  { month: "Jul", count: 135, previousYear: 85 },
  { month: "Aug", count: 148, previousYear: 90 },
  { month: "Sep", count: 162, previousYear: 95 },
  { month: "Oct", count: 175, previousYear: 105 },
  { month: "Nov", count: 190, previousYear: 115 },
  { month: "Dec", count: 210, previousYear: 135 }
];

const collaborationData = [
  { name: "IEEE", value: 25 },
  { name: "ACM", value: 20 },
  { name: "GDG", value: 15 },
  { name: "AWS", value: 18 },
  { name: "STIC", value: 12 }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState("monthly");
  const [clubFilter, setClubFilter] = useState("all");

  const handleDownload = (reportType: string) => {
    toast({
      title: "Download Started",
      description: `${reportType} report will be downloaded shortly.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-space-deepBlue to-space-navy opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_20%,rgba(120,50,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 stars-bg opacity-40"></div>
      </div>
      
      <Navbar />
      
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 mt-20 z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reports Dashboard</h1>
          <p className="text-gray-400">View and analyze data across all tech clubs and activities.</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={clubFilter} onValueChange={setClubFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by club" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clubs</SelectItem>
                <SelectItem value="ieee">IEEE</SelectItem>
                <SelectItem value="acm">ACM</SelectItem>
                <SelectItem value="gdg">GDG</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="stic">STIC</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
          
          <Button onClick={() => handleDownload("Complete")}>
            <FileDown className="mr-2 h-4 w-4" />
            Download All Reports
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-400" />
                    Total Members
                  </CardTitle>
                  <CardDescription>Across all tech clubs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">635</div>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                    Active Events
                  </CardTitle>
                  <CardDescription>Ongoing & upcoming</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +8.3% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-purple-400" />
                    Credits Earned
                  </CardTitle>
                  <CardDescription>Total across platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18,750</div>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +15.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-purple-400" />
                    Membership Growth
                  </CardTitle>
                  <CardDescription>New member registrations over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={membershipData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorCount)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="previousYear" 
                        stroke="#82ca9d" 
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-purple-400" />
                    Club Participation
                  </CardTitle>
                  <CardDescription>Member distribution across clubs</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={collaborationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {collaborationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Membership Reports</CardTitle>
                    <CardDescription>Detailed membership statistics and demographics</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleDownload("Membership")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Select filters above to view membership reports.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Events Reports</CardTitle>
                    <CardDescription>Analytics on events, workshops, and hackathons</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleDownload("Events")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Select filters above to view event reports.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clubs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Performance</CardTitle>
                    <CardDescription>Compare activity and engagement across clubs</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleDownload("Clubs")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Select filters above to view club performance reports.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;
