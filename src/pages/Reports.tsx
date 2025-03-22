import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileDown, Calendar, Users, Award, Activity, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

// Mock data for reports
const membershipData = [
  { month: 'Jan', members: 45 },
  { month: 'Feb', members: 52 },
  { month: 'Mar', members: 49 },
  { month: 'Apr', members: 62 },
  { month: 'May', members: 78 },
  { month: 'Jun', members: 94 },
];

const eventAttendanceData = [
  { event: 'AI Workshop', attendance: 86 },
  { event: 'Hackathon', attendance: 112 },
  { event: 'Web3 Talk', attendance: 45 },
  { event: 'Coding Contest', attendance: 72 },
  { event: 'Tech Meetup', attendance: 68 },
];

const contributionData = [
  { category: 'Development', value: 35, color: '#8B5CF6' },
  { category: 'Design', value: 25, color: '#D946EF' },
  { category: 'Content', value: 20, color: '#F97316' },
  { category: 'Mentorship', value: 15, color: '#0EA5E9' },
  { category: 'Other', value: 5, color: '#8A898C' },
];

const activityTrends = [
  { week: 'Week 1', activity: 42 },
  { week: 'Week 2', activity: 48 },
  { week: 'Week 3', activity: 39 },
  { week: 'Week 4', activity: 53 },
  { week: 'Week 5', activity: 62 },
  { week: 'Week 6', activity: 58 },
];

const membersList = [
  { id: 1, name: 'Alex Johnson', role: 'President', joined: '2023-01-15', credits: 450 },
  { id: 2, name: 'Sarah Chen', role: 'Developer', joined: '2023-02-22', credits: 320 },
  { id: 3, name: 'Michael Rodriguez', role: 'Designer', joined: '2023-01-30', credits: 285 },
  { id: 4, name: 'Jamie Singh', role: 'Content Creator', joined: '2023-03-12', credits: 310 },
  { id: 5, name: 'Taylor Kim', role: 'Mentor', joined: '2023-02-05', credits: 380 },
];

const eventsList = [
  { id: 1, name: 'AI Workshop', date: '2023-05-15', attendance: 86, organizer: 'AI Team' },
  { id: 2, name: 'Hackathon', date: '2023-04-22', attendance: 112, organizer: 'Dev Team' },
  { id: 3, name: 'Web3 Talk', date: '2023-06-10', attendance: 45, organizer: 'Blockchain Team' },
  { id: 4, name: 'Coding Contest', date: '2023-05-30', attendance: 72, organizer: 'Coding Team' },
  { id: 5, name: 'Tech Meetup', date: '2023-06-20', attendance: 68, organizer: 'Community Team' },
];

const Reports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  // Chart configurations
  const chartConfig = {
    primary: { color: '#8B5CF6' }, // Vivid Purple
    secondary: { color: '#D946EF' }, // Magenta Pink
    tertiary: { color: '#F97316' }, // Bright Orange
    quaternary: { color: '#0EA5E9' }, // Ocean Blue
    neutral: { color: '#403E43' }, // Charcoal Gray
  };

  const exportReport = (reportType: string) => {
    // In a real application, this would generate and download a CSV/PDF file
    toast({
      title: "Report Exported",
      description: `${reportType} report has been downloaded.`,
    });
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Generate and analyze club activity data with interactive reports.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-full sm:w-40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-full sm:w-40"
              />
            </div>
          </div>
          <Button variant="outline" className="gap-2 mt-4 sm:mt-auto">
            <Filter className="h-4 w-4" />
            <span>Apply Filters</span>
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Membership Growth
                  </CardTitle>
                  <CardDescription>Monthly member count over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={chartConfig} className="h-80">
                    <LineChart data={membershipData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="members" 
                        stroke="var(--color-primary)" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => exportReport('Membership Growth')}>
                    <FileDown className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Contribution Breakdown
                  </CardTitle>
                  <CardDescription>Distribution by activity type</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={chartConfig} className="h-80">
                    <PieChart>
                      <Pie
                        data={contributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => exportReport('Contribution Breakdown')}>
                    <FileDown className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Event Attendance
                  </CardTitle>
                  <CardDescription>Participation rates by event</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={chartConfig} className="h-80">
                    <BarChart data={eventAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="event" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar 
                        dataKey="attendance" 
                        fill="var(--color-tertiary)" 
                        barSize={30} 
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => exportReport('Event Attendance')}>
                    <FileDown className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Trends
                  </CardTitle>
                  <CardDescription>Weekly activity patterns</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ChartContainer config={chartConfig} className="h-80">
                    <LineChart data={activityTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="activity" 
                        stroke="var(--color-quaternary)" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => exportReport('Activity Trends')}>
                    <FileDown className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Members Report
                </CardTitle>
                <CardDescription>Detailed information about club members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {membersList.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{new Date(member.joined).toLocaleDateString()}</TableCell>
                          <TableCell>{member.credits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Members List')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Membership Growth
                </CardTitle>
                <CardDescription>Monthly member count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="members" 
                      stroke="var(--color-primary)" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Membership Growth')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Events Report
                </CardTitle>
                <CardDescription>Detailed information about club events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Organizer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventsList.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>{event.attendance}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Events List')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Event Attendance
                </CardTitle>
                <CardDescription>Participation rates by event</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <BarChart data={eventAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Bar 
                      dataKey="attendance" 
                      fill="var(--color-tertiary)" 
                      barSize={30} 
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Event Attendance')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Contributions Tab */}
          <TabsContent value="contributions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Contribution Breakdown
                </CardTitle>
                <CardDescription>Distribution by activity type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <PieChart>
                    <Pie
                      data={contributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Contribution Breakdown')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Trends
                </CardTitle>
                <CardDescription>Weekly activity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={activityTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="var(--color-quaternary)" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2" onClick={() => exportReport('Activity Trends')}>
                  <FileDown className="h-4 w-4" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
