import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Home,
  Calendar,
  Book,
  BarChart3,
  Upload,
  Settings,
  LogOut,
  TrendingUp,
  CheckCircle,
  CalendarMinus,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UploadZone from "@/components/ui/upload-zone";
import ProgressRing from "@/components/ui/progress-ring";
import AttendanceCard from "@/components/AttendanceCard";
import CalendarWidget from "@/components/CalendarWidget";
import { Link } from "wouter";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  
  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ['/api/subjects'],
  });

  const { data: upcomingEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/schedule?upcoming=true'],
  });

  const overallAttendance = subjects?.reduce((acc: number, subject: any) => acc + subject.attendanceRate, 0) / (subjects?.length || 1) || 0;
  const totalClasses = subjects?.reduce((acc: number, subject: any) => acc + subject.attendedClasses, 0) || 0;
  const totalSkips = subjects?.reduce((acc: number, subject: any) => acc + subject.canSkip, 0) || 0;

  return (
    <div className="min-h-screen bg-schronix-grey-50" data-testid="dashboard-page">
      
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-schronix-grey-200 px-6 py-4" data-testid="nav-dashboard">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="text-2xl font-bold text-schronix-primary cursor-pointer" data-testid="text-schronix-nav-logo">
                Schronix
              </div>
            </Link>
            <span className="text-schronix-grey-400">|</span>
            <span className="text-schronix-grey-600" data-testid="text-dashboard-nav-title">Student Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="bg-schronix-grey-100 rounded-lg pr-10"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-schronix-grey-400" />
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-schronix-grey-600 hover:text-schronix-primary" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-schronix-warning text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-schronix-grey-700 font-medium" data-testid="text-user-name">John Doe</span>
                <ChevronDown className="h-4 w-4 text-schronix-grey-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-schronix-grey-200 min-h-screen p-6" data-testid="sidebar-dashboard">
          <nav className="space-y-2">
            <button 
              onClick={() => setSelectedTab("dashboard")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "dashboard" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-dashboard"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setSelectedTab("schedule")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "schedule" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-schedule"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </button>
            <button 
              onClick={() => setSelectedTab("subjects")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "subjects" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-subjects"
            >
              <Book className="h-4 w-4" />
              <span>Subjects</span>
            </button>
            <button 
              onClick={() => setSelectedTab("analytics")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "analytics" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-analytics"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </button>
            <button 
              onClick={() => setSelectedTab("upload")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "upload" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-upload"
            >
              <Upload className="h-4 w-4" />
              <span>Upload PDF</span>
            </button>
            <button 
              onClick={() => setSelectedTab("settings")}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "settings" 
                  ? "bg-schronix-primary text-white" 
                  : "text-schronix-grey-600 hover:bg-schronix-grey-100"
              }`}
              data-testid="button-nav-settings"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
          
          <div className="mt-auto pt-8">
            <button className="flex items-center space-x-3 text-schronix-grey-600 hover:text-schronix-warning px-4 py-3 w-full" data-testid="button-logout">
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            
            {selectedTab === "dashboard" && (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-schronix-grey-800 mb-2" data-testid="text-greeting">Hello John!</h1>
                      <p className="text-schronix-grey-600" data-testid="text-greeting-message">
                        You have {upcomingEvents?.length || 0} upcoming events. Let's manage your attendance strategically!
                      </p>
                    </div>
                    <Card className="p-4">
                      <div className="text-sm text-schronix-grey-600">Today</div>
                      <div className="text-2xl font-bold text-schronix-grey-800" data-testid="text-today-date">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </Card>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="hover:shadow-lg transition-shadow" data-testid="card-overall-attendance">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-schronix-grey-600">Overall Attendance</div>
                        <div className="w-12 h-12 bg-schronix-primary/10 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-schronix-primary" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-schronix-grey-800 mb-2" data-testid="text-overall-attendance-percentage">
                        {overallAttendance.toFixed(1)}%
                      </div>
                      <div className="text-sm text-schronix-accent">Maintaining good attendance</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow" data-testid="card-classes-attended">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-schronix-grey-600">Classes Attended</div>
                        <div className="w-12 h-12 bg-schronix-accent/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-schronix-accent" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-schronix-grey-800 mb-2" data-testid="text-classes-attended-count">
                        {totalClasses}
                      </div>
                      <div className="text-sm text-schronix-accent">Great progress!</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow" data-testid="card-available-skips">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-schronix-grey-600">Available Skips</div>
                        <div className="w-12 h-12 bg-schronix-warning/10 rounded-full flex items-center justify-center">
                          <CalendarMinus className="h-5 w-5 text-schronix-warning" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-schronix-grey-800 mb-2" data-testid="text-available-skips-count">
                        {totalSkips}
                      </div>
                      <div className="text-sm text-schronix-warning">Use strategically</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow" data-testid="card-next-class">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-schronix-grey-600">Next Class</div>
                        <div className="w-12 h-12 bg-schronix-secondary/10 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-schronix-secondary" />
                        </div>
                      </div>
                      <div className="text-xl font-bold text-schronix-grey-800 mb-1" data-testid="text-next-class-name">
                        {upcomingEvents?.[0]?.title || "No upcoming classes"}
                      </div>
                      <div className="text-sm text-schronix-secondary" data-testid="text-next-class-time">
                        {upcomingEvents?.[0] ? "In 45 minutes" : "Check your schedule"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Subject-wise Attendance */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Subject-wise Attendance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {subjectsLoading ? (
                            <div className="col-span-2 text-center py-8" data-testid="text-subjects-loading">
                              Loading subjects...
                            </div>
                          ) : subjects?.length ? (
                            subjects.map((subject: any) => (
                              <AttendanceCard key={subject.id} subject={subject} />
                            ))
                          ) : (
                            <div className="col-span-2 text-center py-8 text-schronix-grey-600" data-testid="text-no-subjects">
                              No subjects found. Upload your timetable to get started.
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Calendar Widget */}
                  <CalendarWidget events={upcomingEvents} />
                </div>
              </>
            )}

            {selectedTab === "upload" && (
              <div>
                <h2 className="text-2xl font-bold text-schronix-grey-800 mb-6" data-testid="text-upload-title">Upload Academic Documents</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UploadZone 
                    type="calendar"
                    title="Upload Academic Calendar"
                    description="Upload your academic calendar PDF to automatically sync important dates"
                    icon="calendar"
                  />
                  <UploadZone 
                    type="timetable"
                    title="Upload Class Timetable"
                    description="Upload your timetable PDF to track classes and calculate optimal skip strategy"
                    icon="table"
                  />
                </div>
              </div>
            )}

            {selectedTab === "subjects" && (
              <div>
                <h2 className="text-2xl font-bold text-schronix-grey-800 mb-6" data-testid="text-subjects-title">Subjects</h2>
                {subjectsLoading ? (
                  <div className="text-center py-8" data-testid="text-subjects-loading">Loading subjects...</div>
                ) : subjects?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject: any) => (
                      <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <ProgressRing 
                              percentage={subject.attendanceRate} 
                              color={subject.status === 'safe' ? '#10B981' : '#EF4444'}
                            />
                            <h4 className="font-semibold text-schronix-grey-800 mt-4" data-testid={`text-subject-name-${subject.id}`}>
                              {subject.name}
                            </h4>
                            <p className="text-sm text-schronix-grey-600" data-testid={`text-subject-attendance-${subject.id}`}>
                              {subject.attendedClasses}/{subject.totalClasses} classes
                            </p>
                            <Badge 
                              variant={subject.status === 'safe' ? 'default' : 'destructive'}
                              className="mt-2"
                              data-testid={`badge-subject-status-${subject.id}`}
                            >
                              {subject.canSkip > 0 ? `${subject.canSkip} skips available` : 'No skips available'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-schronix-grey-600" data-testid="text-no-subjects">
                        No subjects found. Upload your timetable to get started.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {selectedTab === "schedule" && (
              <div>
                <h2 className="text-2xl font-bold text-schronix-grey-800 mb-6" data-testid="text-schedule-title">Schedule</h2>
                <CalendarWidget events={upcomingEvents} showFullCalendar={true} />
              </div>
            )}

            {selectedTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold text-schronix-grey-800 mb-6" data-testid="text-analytics-title">Analytics</h2>
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-schronix-grey-600" data-testid="text-analytics-coming-soon">
                      Advanced analytics coming soon! Upload your documents to see detailed insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-schronix-grey-800 mb-6" data-testid="text-settings-title">Settings</h2>
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-schronix-grey-600" data-testid="text-settings-coming-soon">
                      Settings panel coming soon! Customize your attendance requirements and notifications.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
