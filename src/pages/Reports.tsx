
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
import { BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for reports
const membershipData = [
  { month: "Jan", count: 42 },
  { month: "Feb", count: 56 },
  { month: "Mar", count: 73 },
  { month: "Apr", count: 85 },
  { month: "May", count: 102 },
  { month: "Jun", count: 120 },
];

const collaborationData = [
  { name: "IEEE Events", count: 12, value: 25 },
  { name: "ACM Workshops", count: 8, value: 20 },
  { name: "GDG Hackathons", count: 5, value: 15 },
  { name: "AWS Trainings", count: 7, value: 18 },
  { name: "STIC Conferences", count: 3, value: 12 },
];

const clubData = [
  { id: 1, name: "IEEE", members: 120, events: 15, lastEvent: "2023-12-10" },
  { id: 2, name: "ACM", members: 95, events: 12, lastEvent: "2023-12-05" },
  { id: 3, name: "GDG", members: 85, events: 8, lastEvent: "2023-11-20" },
  { id: 4, name: "AWS", members: 75, events: 10, lastEvent: "2023-12-01" },
  { id: 5, name: "STIC", members: 60, events: 6, lastEvent: "2023-11-15" },
];

// Custom color palette for the charts
const COLORS = ['#8B5CF6', '#EC4899', '#6366F1', '#F472B6', '#6EE7B7', '#10B981'];

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
      
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 mt-20 z-10">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-300">Analytics Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reports Dashboard</h1>
          <p className="text-gray-400">View and analyze data across all tech clubs and activities.</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px] bg-space-navy/50 border-purple-500/20">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-space-navy border-purple-500/20">
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={clubFilter} onValueChange={setClubFilter}>
              <SelectTrigger className="w-[180px] bg-space-navy/50 border-purple-500/20">
                <SelectValue placeholder="Filter by club" />
              </SelectTrigger>
              <SelectContent className="bg-space-navy border-purple-500/20">
                <SelectItem value="all">All Clubs</SelectItem>
                <SelectItem value="ieee">IEEE</SelectItem>
                <SelectItem value="acm">ACM</SelectItem>
                <SelectItem value="gdg">GDG</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="stic">STIC</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2 bg-space-navy/50 border-purple-500/20 hover:bg-purple-500/20">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
          
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-shine" onClick={() => handleDownload("Complete")}>
            <FileDown className="mr-2 h-4 w-4" />
            Download All Reports
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-space-navy/50 border border-purple-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Overview</TabsTrigger>
            <TabsTrigger value="membership" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Membership</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Events</TabsTrigger>
            <TabsTrigger value="clubs" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Clubs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card cosmic-glow border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-400" />
                    Total Members
                  </CardTitle>
                  <CardDescription>Across all tech clubs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">435</div>
                  <p className="text-sm text-green-400 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card cosmic-glow border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                    Active Events
                  </CardTitle>
                  <CardDescription>Ongoing & upcoming</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">26</div>
                  <p className="text-sm text-green-400 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +8.3% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card cosmic-glow border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-purple-400" />
                    Credits Earned
                  </CardTitle>
                  <CardDescription>Total across platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">12,850</div>
                  <p className="text-sm text-green-400 flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +15.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="glass-card cosmic-glow border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-purple-400" />
                    Membership Growth
                  </CardTitle>
                  <CardDescription>New member registrations over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={membershipData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#a899df" 
                        tick={{ fill: '#a899df' }}
                      />
                      <YAxis 
                        stroke="#a899df" 
                        tick={{ fill: '#a899df' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ color: '#e2e8f0' }}
                      />
                      <Bar 
                        dataKey="count" 
                        name="New Members" 
                        fill="url(#membershipGradient)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="membershipGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#EC4899" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="glass-card cosmic-glow border-purple-500/20">
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
                        outerRadius={120}
                        innerRadius={60}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {collaborationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }}
                        formatter={(value, name) => [`${value} Members`, name]}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          color: '#e2e8f0',
                          paddingTop: '20px'
                        }} 
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="membership">
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Membership Reports</CardTitle>
                    <CardDescription>Detailed membership statistics and demographics</CardDescription>
                  </div>
                  <Button variant="outline" className="bg-space-navy/50 border-purple-500/20 hover:bg-purple-500/20" onClick={() => handleDownload("Membership")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-space-navy/30 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20">
                      <h3 className="text-lg font-medium text-white mb-4">Membership Growth Trend</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={membershipData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis 
                              dataKey="month" 
                              stroke="#a899df" 
                              tick={{ fill: '#a899df' }}
                            />
                            <YAxis 
                              stroke="#a899df" 
                              tick={{ fill: '#a899df' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '8px',
                                color: '#e2e8f0'
                              }} 
                            />
                            <Bar 
                              dataKey="count" 
                              name="New Members" 
                              fill="url(#membershipGradient2)" 
                              radius={[4, 4, 0, 0]}
                            />
                            <defs>
                              <linearGradient id="membershipGradient2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                                <stop offset="100%" stopColor="#EC4899" stopOpacity={0.6}/>
                              </linearGradient>
                            </defs>
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Total New Members</p>
                          <p className="text-2xl font-bold text-gradient">{membershipData.reduce((acc, item) => acc + item.count, 0)}</p>
                        </div>
                        <div className="bg-purple-500/10 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Average Monthly Growth</p>
                          <p className="text-2xl font-bold text-gradient">{Math.round(membershipData.reduce((acc, item) => acc + item.count, 0) / membershipData.length)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-space-navy/30 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20">
                      <h3 className="text-lg font-medium text-white mb-4">Member Demographics</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={[
                                { name: "Computer Science", value: 42 },
                                { name: "Electrical Engineering", value: 28 },
                                { name: "Mechanical Engineering", value: 15 },
                                { name: "Information Technology", value: 25 },
                                { name: "Other", value: 10 }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              dataKey="value"
                              paddingAngle={3}
                            >
                              {COLORS.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '8px',
                                color: '#e2e8f0'
                              }}
                            />
                            <Legend 
                              wrapperStyle={{ 
                                color: '#e2e8f0',
                                fontSize: '12px',
                                paddingTop: '10px'
                              }} 
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Students</p>
                          <p className="text-2xl font-bold text-gradient">85%</p>
                        </div>
                        <div className="bg-purple-500/10 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Professionals</p>
                          <p className="text-2xl font-bold text-gradient">15%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Events Reports</CardTitle>
                    <CardDescription>Analytics on events, workshops, and hackathons</CardDescription>
                  </div>
                  <Button variant="outline" className="bg-space-navy/50 border-purple-500/20 hover:bg-purple-500/20" onClick={() => handleDownload("Events")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-space-navy/30 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20">
                      <h3 className="text-lg font-medium text-white mb-4">Event Participation by Club</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={collaborationData}
                            layout="vertical"
                            margin={{
                              top: 20,
                              right: 30,
                              left: 100,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis type="number" stroke="#a899df" tick={{ fill: '#a899df' }} />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              stroke="#a899df" 
                              tick={{ fill: '#a899df' }}
                              width={100}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '8px',
                                color: '#e2e8f0'
                              }} 
                            />
                            <Bar 
                              dataKey="count" 
                              name="Event Count" 
                              fill="url(#eventGradient)" 
                              radius={[0, 4, 4, 0]}
                            />
                            <defs>
                              <linearGradient id="eventGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#EC4899" stopOpacity={0.6}/>
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                              </linearGradient>
                            </defs>
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-space-navy/30 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20">
                      <h3 className="text-lg font-medium text-white mb-4">Event Attendance Statistics</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={[
                              { name: "Workshops", virtual: 120, inPerson: 85 },
                              { name: "Hackathons", virtual: 50, inPerson: 90 },
                              { name: "Conferences", virtual: 110, inPerson: 60 },
                              { name: "Tech Talks", virtual: 140, inPerson: 40 },
                            ]}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" stroke="#a899df" tick={{ fill: '#a899df' }} />
                            <YAxis stroke="#a899df" tick={{ fill: '#a899df' }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '8px',
                                color: '#e2e8f0'
                              }} 
                            />
                            <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                            <Bar dataKey="virtual" name="Virtual" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="inPerson" name="In-Person" fill="#EC4899" radius={[4, 4, 0, 0]} />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clubs">
            <Card className="glass-card cosmic-glow border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Clubs Performance</CardTitle>
                    <CardDescription>Comparative analysis of tech clubs activities</CardDescription>
                  </div>
                  <Button variant="outline" className="bg-space-navy/50 border-purple-500/20 hover:bg-purple-500/20" onClick={() => handleDownload("Clubs")}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left py-3 px-4">Club Name</th>
                        <th className="text-left py-3 px-4">Members</th>
                        <th className="text-left py-3 px-4">Events</th>
                        <th className="text-left py-3 px-4">Last Event</th>
                        <th className="text-left py-3 px-4">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clubData.map((club) => (
                        <tr key={club.id} className="border-b border-purple-500/10 hover:bg-purple-500/10">
                          <td className="py-3 px-4 font-medium">{club.name}</td>
                          <td className="py-3 px-4">{club.members}</td>
                          <td className="py-3 px-4">{club.events}</td>
                          <td className="py-3 px-4">{new Date(club.lastEvent).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              +{Math.floor(Math.random() * 20) + 5}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Reports;
