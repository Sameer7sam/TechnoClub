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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const membershipData = [
  { month: "Jan", count: 42, previousYear: 30, newMembers: 15, returningMembers: 27 },
  { month: "Feb", count: 56, previousYear: 35, newMembers: 26, returningMembers: 30 },
  { month: "Mar", count: 73, previousYear: 42, newMembers: 38, returningMembers: 35 },
  { month: "Apr", count: 85, previousYear: 58, newMembers: 42, returningMembers: 43 },
  { month: "May", count: 102, previousYear: 65, newMembers: 55, returningMembers: 47 },
  { month: "Jun", count: 120, previousYear: 72, newMembers: 58, returningMembers: 62 },
];

const collaborationData = [
  { name: "IEEE Events", count: 12, value: 25, engagement: 85, growth: 15 },
  { name: "ACM Workshops", count: 8, value: 20, engagement: 78, growth: 12 },
  { name: "GDG Hackathons", count: 5, value: 15, engagement: 92, growth: 20 },
  { name: "AWS Trainings", count: 7, value: 18, engagement: 75, growth: 8 },
  { name: "STIC Conferences", count: 3, value: 12, engagement: 80, growth: 10 },
];

const clubData = [
  { id: 1, name: "IEEE", members: 120, events: 15, lastEvent: "2023-12-10" },
  { id: 2, name: "ACM", members: 95, events: 12, lastEvent: "2023-12-05" },
  { id: 3, name: "GDG", members: 85, events: 8, lastEvent: "2023-11-20" },
  { id: 4, name: "AWS", members: 75, events: 10, lastEvent: "2023-12-01" },
  { id: 5, name: "STIC", members: 60, events: 6, lastEvent: "2023-11-15" },
];

const COLORS = [
  '#8B5CF6', '#EC4899', '#6366F1', '#F472B6', '#6EE7B7', '#10B981', 
  '#3B82F6', '#F59E0B', '#EF4444', '#14B8A6', '#8B5CF6', '#EC4899'
];

const gradients = {
  purple: ['#8B5CF6', '#D946EF'],
  blue: ['#3B82F6', '#06B6D4'],
  pink: ['#EC4899', '#F87171'],
  green: ['#10B981', '#6EE7B7'],
  orange: ['#F59E0B', '#FBBF24'],
};

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

  const membershipTooltipFormatter = (value: number, name: string) => {
    if (name === 'newMembers') return [`${value} New Members`, 'New Members'];
    if (name === 'returningMembers') return [`${value} Returning Members`, 'Returning Members'];
    if (name === 'previousYear') return [`${value} Last Year`, 'Previous Year'];
    return [`${value} Members`, name];
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-space-deepBlue to-space-navy opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_20%,rgba(120,50,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 stars-bg opacity-40"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-120 h-120 rounded-full bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
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
                  <ChartContainer 
                    className="h-full w-full" 
                    config={{
                      newMembers: { 
                        label: "New Members",
                        theme: { light: "#8B5CF6", dark: "#9333EA" }
                      },
                      returningMembers: { 
                        label: "Returning Members",
                        theme: { light: "#EC4899", dark: "#DB2777" } 
                      },
                      previousYear: { 
                        label: "Previous Year",
                        theme: { light: "#6EE7B7", dark: "#10B981" } 
                      }
                    }}
                  >
                    <AreaChart
                      data={membershipData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="membershipGradientNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="membershipGradientReturning" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="membershipGradientPrevious" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#a899df" 
                        tick={{ fill: '#a899df' }}
                        tickLine={{ stroke: '#a899df' }}
                        axisLine={{ stroke: '#a899df' }}
                      />
                      <YAxis 
                        stroke="#a899df" 
                        tick={{ fill: '#a899df' }}
                        tickLine={{ stroke: '#a899df' }}
                        axisLine={{ stroke: '#a899df' }}
                      />
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload?.length) {
                            return (
                              <div className="p-2 bg-space-navy border border-purple-500/30 rounded-lg shadow-xl backdrop-blur-sm">
                                <p className="font-medium text-white mb-1">{payload[0].payload.month}</p>
                                {payload.map((entry, index) => (
                                  <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-3 h-3 rounded-sm" 
                                        style={{ backgroundColor: entry.color }}
                                      />
                                      <span className="text-gray-300">{entry.dataKey === 'newMembers' ? 'New Members' : 
                                        entry.dataKey === 'returningMembers' ? 'Returning Members' : 'Previous Year'}</span>
                                    </div>
                                    <span className="font-medium text-white">{entry.value}</span>
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="newMembers" 
                        stackId="1"
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        fill="url(#membershipGradientNew)" 
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="returningMembers" 
                        stackId="1"
                        stroke="#EC4899" 
                        strokeWidth={2}
                        fill="url(#membershipGradientReturning)" 
                        animationDuration={1500}
                        animationBegin={300}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="previousYear" 
                        stroke="#6EE7B7" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4, strokeWidth: 2, fill: "#0F0C29" }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: "#6EE7B7" }}
                        animationDuration={1500}
                        animationBegin={600}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: 20 }}
                        payload={[
                          { value: 'New Members', type: 'line', color: '#8B5CF6' },
                          { value: 'Returning Members', type: 'line', color: '#EC4899' },
                          { value: 'Previous Year', type: 'line', color: '#6EE7B7' }
                        ]}
                      />
                    </AreaChart>
                  </ChartContainer>
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
                <CardContent className="h-80 relative">
                  <ChartContainer 
                    className="h-full w-full"
                    config={{
                      main: { label: "Distribution" }
                    }}
                  >
                    <PieChart>
                      <defs>
                        {COLORS.map((color, index) => (
                          <radialGradient 
                            key={`gradient-${index}`} 
                            id={`pieGradient${index}`} 
                            cx="50%" 
                            cy="50%" 
                            r="50%" 
                            fx="50%" 
                            fy="50%"
                          >
                            <stop 
                              offset="0%" 
                              stopColor={color} 
                              stopOpacity={0.9}
                            />
                            <stop 
                              offset="100%" 
                              stopColor={color} 
                              stopOpacity={0.7}
                            />
                          </radialGradient>
                        ))}
                      </defs>
                      <Pie
                        data={collaborationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        strokeWidth={2}
                        stroke="rgba(15, 12, 41, 0.8)"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelStyle={{ fill: '#fff', fontSize: 12, fontWeight: 500 }}
                        animationDuration={1500}
                        animationBegin={100}
                        animationEasing="ease-out"
                      >
                        {collaborationData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#pieGradient${index})`}
                            className="hover:opacity-80 transition-opacity duration-300"
                          />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload?.length) {
                            return (
                              <div className="p-3 bg-space-navy border border-purple-500/30 rounded-lg shadow-xl backdrop-blur-sm">
                                <p className="font-medium text-white mb-2 border-b border-purple-500/20 pb-1">
                                  {payload[0].name}
                                </p>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-300">Members:</span>
                                    <span className="font-medium text-white">{payload[0].value}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-300">Events:</span>
                                    <span className="font-medium text-white">{payload[0].payload.count}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-300">Engagement:</span>
                                    <span className="font-medium text-white">{payload[0].payload.engagement}%</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-300">Growth:</span>
                                    <span className="font-medium text-green-400">+{payload[0].payload.growth}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingTop: 20 }}
                      />
                    </PieChart>
                  </ChartContainer>
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
                        <ChartContainer 
                          className="h-full w-full"
                          config={{
                            count: { 
                              label: "New Members",
                              theme: { light: "#8B5CF6", dark: "#9333EA" }
                            }
                          }}
                        >
                          <AreaChart
                            data={membershipData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <defs>
                              <linearGradient id="membershipTrendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis 
                              dataKey="month" 
                              stroke="#a899df" 
                              tick={{ fill: '#a899df' }}
                              tickLine={{ stroke: '#a899df' }}
                            />
                            <YAxis 
                              stroke="#a899df" 
                              tick={{ fill: '#a899df' }}
                              tickLine={{ stroke: '#a899df' }}
                            />
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload?.length) {
                                  return (
                                    <div className="p-2 bg-space-navy border border-purple-500/30 rounded-lg shadow-xl backdrop-blur-sm">
                                      <p className="font-medium text-white mb-1">{payload[0].payload.month}</p>
                                      {payload.map((entry, index) => (
                                        <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
                                          <div className="flex items-center gap-2">
                                            <div 
                                              className="w-3 h-3 rounded-sm" 
                                              style={{ backgroundColor: entry.color }}
                                            />
                                            <span className="text-gray-300">{entry.dataKey === 'count' ? 'Members' : entry.dataKey}</span>
                                          </div>
                                          <span className="font-medium text-white">{entry.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="count" 
                              stroke="#8B5CF6" 
                              strokeWidth={2}
                              fill="url(#membershipTrendGradient)" 
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ChartContainer>
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
                        <ChartContainer 
                          className="h-full w-full"
                          config={{
                            main: { label: "Distribution" }
                          }}
                        >
                          <PieChart>
                            <defs>
                              {COLORS.map((color, index) => (
                                <linearGradient 
                                  key={`demogradient-${index}`} 
                                  id={`demoGradient${index}`} 
                                  x1="0" 
                                  y1="0" 
                                  x2="0" 
                                  y2="1"
                                >
                                  <stop offset="0%" stopColor={color} stopOpacity={0.9}/>
                                  <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                                </linearGradient>
                              ))}
                            </defs>
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
                              innerRadius={40}
                              stroke="#0F0C29"
                              strokeWidth={2}
                              paddingAngle={4}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              dataKey="value"
                              animationDuration={1500}
                              animationBegin={300}
                            >
                              {[0, 1, 2, 3, 4].map((index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={`url(#demoGradient${index})`} 
                                  className="hover:opacity-80 transition-opacity duration-300"
                                />
                              ))}
                            </Pie>
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload?.length) {
                                  return (
                                    <div className="p-2 bg-space-navy border border-purple-500/30 rounded-lg shadow-xl backdrop-blur-sm">
                                      <p className="font-medium text-white mb-1">{payload[0].name}</p>
                                      <div className="flex items-center justify-between gap-4">
                                        <span className="text-gray-300">Students:</span>
                                        <span className="font-medium text-white">{payload[0].value}</span>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend 
                              layout="horizontal" 
                              verticalAlign="bottom"
                              iconType="circle"
                              iconSize={8}
                              wrapperStyle={{ 
                                fontSize: '12px',
                                paddingTop: '10px'
                              }} 
                            />
                          </PieChart>
                        </ChartContainer>
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
