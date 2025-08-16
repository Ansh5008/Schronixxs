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
import { Link } from "wouter";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  
  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ['/api/subjects'],
  });

  const { data: upcomingEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/schedule?upcoming=true'],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800" data-testid="dashboard-page">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Dashboard for student</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium" data-testid="button-light-mode">
              Light mode
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-500/30 backdrop-blur-sm min-h-screen p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-white font-semibold text-lg">Smart</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard', active: true },
              { id: 'student', icon: Book, label: 'Student' },
              { id: 'schedule', icon: Calendar, label: 'Schedule' },
              { id: 'materials', icon: Book, label: 'Materials' },
              { id: 'forum', icon: BarChart3, label: 'Forum' },
              { id: 'assessments', icon: CheckCircle, label: 'Assessments' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedTab === item.id || item.active
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                data-testid={`nav-${item.id}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="mt-auto pt-8">
            <button className="flex items-center space-x-3 text-white/70 hover:text-white w-full px-4 py-3" data-testid="button-logout">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-tl-3xl p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Input 
                type="text" 
                placeholder="Search" 
                className="w-80 bg-gray-50 border-0 rounded-lg"
                data-testid="input-search"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">ENG</span>
              <Bell className="h-5 w-5 text-gray-400" />
              <Avatar data-testid="avatar-user">
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Grace Stanley</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* Welcome Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2" data-testid="text-hello-grace">Hello Grace!</h2>
                      <p className="text-gray-600 mb-4">You have 3 new tasks. It is a lot of work for today! So let's start</p>
                      <button className="text-blue-600 font-medium">more →</button>
                    </div>
                    <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                      {/* Illustration placeholder */}
                      <div className="text-4xl">👩‍💻</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Performance</h3>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-600">The best lessons:</span>
                  <select className="text-sm border-0 bg-transparent">
                    <option>December</option>
                  </select>
                </div>

                {/* Attendance Chart */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-600">95.4</div>
                    <div className="text-sm text-gray-500">average</div>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="flex items-end justify-center space-x-2 h-32">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                      <div key={month} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-blue-500 rounded-t mb-2"
                          style={{ height: `${70 + index * 10}px` }}
                        ></div>
                        <span className="text-xs text-gray-500">{month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Circular Progress Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">All lessons</span>
                    <select className="text-sm border-0">
                      <option>December</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">My visit</span>
                    <select className="text-sm border-0">
                      <option>December</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: 92, label: 'My progress', color: 'blue' },
                    { value: 83, label: 'Course progress', color: 'blue' },
                    { value: 76, label: 'Database progress', color: 'orange' },
                    { value: 97, label: 'Web develop', color: 'green' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-blue-500 mx-auto mb-2 flex items-center justify-center">
                        <span className="font-bold text-sm">{item.value}%</span>
                      </div>
                      <div className="text-xs text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Teachers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Linked Teachers</h3>
                  <button className="text-blue-600 text-sm">See all</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Mary Johnson (mentor)', progress: 94, status: 'Learning' },
                    { name: 'James Brown', progress: 87, status: 'Teaching' }
                  ].map((teacher, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar data-testid={`avatar-teacher-${index}`}>
                          <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
                            <span className="text-xs font-bold">{teacher.progress}%</span>
                          </div>
                          <span className="text-sm text-gray-600">{teacher.status}</span>
                        </div>
                        <button className="text-gray-400">⋮</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Calendar */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Calendar</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Today</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { subject: 'Electronics lesson', time: '09:30-10:15 (45 min)', color: 'blue' },
                      { subject: 'Electronics lesson', time: 'On time - 7:30-8:15 (45 min)', color: 'blue' },
                      { subject: 'Robotics lesson', time: '10:30-11:45 (45 min)', color: 'orange' },
                      { subject: 'C++ lesson', time: '12:15-13:15 (1h 30 min)', color: 'purple' }
                    ].map((lesson, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div>
                          <div className="font-medium text-sm">{lesson.subject}</div>
                          <div className="text-xs text-gray-500">{lesson.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Upcoming events</CardTitle>
                    <button className="text-blue-600 text-sm">See all</button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Webinar of new tools in Minecraft Robot', 
                        subtitle: 'Pon - will coming soon 🚧',
                        date: '23 • December 2023 - 7:45 PM',
                        avatar: '🤖'
                      },
                      { 
                        title: 'Webinar of new tools in Minecraft', 
                        date: '24 • December 2023 - 11:05 PM',
                        avatar: '⚡'
                      }
                    ].map((event, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                          {event.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{event.title}</div>
                          {event.subtitle && <div className="text-xs text-gray-500">{event.subtitle}</div>}
                          <div className="text-xs text-gray-400 mt-1">{event.date}</div>
                        </div>
                        <button className="text-gray-400">⋮</button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}