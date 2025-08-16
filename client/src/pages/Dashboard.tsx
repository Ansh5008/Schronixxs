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
  
  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useQuery({
    queryKey: ['/api', 'subjects'],
  });

  const { data: upcomingEvents, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['/api', 'schedule'],
    queryFn: async () => {
      const response = await fetch('/api/schedule?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    }
  });

  const { data: uploadedDocuments, isLoading: documentsLoading, error: documentsError } = useQuery({
    queryKey: ['/api', 'documents'],
  });

  // Debug logging - removed for cleaner console

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
                  selectedTab === item.id
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
              <h2 className="text-2xl font-bold capitalize">{selectedTab}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Input 
                type="text" 
                placeholder="Search" 
                className="w-60 bg-gray-50 border-0 rounded-lg"
                data-testid="input-search"
              />
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

          {/* Dynamic Content Based on Selected Tab */}
          {selectedTab === 'dashboard' && (
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

                {/* Subjects Overview */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-600">
                      {subjectsLoading ? '...' : Array.isArray(subjects) ? Math.round(subjects.reduce((acc: number, s: any) => acc + s.attendanceRate, 0) / subjects.length * 10) / 10 : '0'}
                    </div>
                    <div className="text-sm text-gray-500">average attendance</div>
                  </div>
                  
                  {/* Subjects List */}
                  <div className="space-y-3">
                    {subjectsLoading ? (
                      <div className="animate-pulse space-y-2">
                        {[1,2,3].map(i => <div key={i} className="h-4 bg-gray-200 rounded"></div>)}
                      </div>
                    ) : Array.isArray(subjects) ? (
                      subjects.map((subject: any) => (
                        <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{subject.name}</div>
                            <div className="text-xs text-gray-500">{subject.attendedClasses}/{subject.totalClasses} classes</div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            subject.status === 'safe' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {subject.attendanceRate}%
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500 text-sm">No subjects found</div>
                    )}
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

              {/* Uploaded Documents */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {Array.isArray(uploadedDocuments) ? uploadedDocuments.length : 0} files
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {documentsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : Array.isArray(uploadedDocuments) && uploadedDocuments.length > 0 ? (
                    <div className="space-y-4">
                      {uploadedDocuments.map((doc: any, index: number) => (
                        <div key={doc.id} className="flex space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                            {doc.type === 'calendar' ? '📅' : '📋'}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{doc.filename}</div>
                            <div className="text-xs text-gray-500 capitalize">{doc.type}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {doc.processed ? (
                                <span className="text-green-600">✓ Processed</span>
                              ) : (
                                <span className="text-orange-500">⏳ Processing...</span>
                              )}
                            </div>
                          </div>
                          <Badge variant={doc.processed ? "default" : "secondary"} className="text-xs">
                            {doc.processed ? "Ready" : "Processing"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No documents uploaded yet</p>
                      <Link href="/">
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload Documents
                        </Button>
                      </Link>
                    </div>
                  )}
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
                  {eventsLoading ? (
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event: any, index: number) => (
                        <div key={event.id} className="flex space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                            {event.type === 'class' ? '📚' : event.type === 'exam' ? '📝' : '📋'}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{event.title}</div>
                            <div className="text-xs text-gray-500">{event.location || 'Online'}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(event.startTime).toLocaleDateString()} - {new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                          <button className="text-gray-400">⋮</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No upcoming events</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              </div>
            </div>
          )}

          {/* Student Tab */}
          {selectedTab === 'student' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Personal Information</h4>
                      <p><strong>Name:</strong> Grace Stanley</p>
                      <p><strong>Student ID:</strong> ST2024001</p>
                      <p><strong>Email:</strong> grace.stanley@university.edu</p>
                      <p><strong>Program:</strong> Computer Science</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Academic Status</h4>
                      <p><strong>Year:</strong> 3rd Year</p>
                      <p><strong>Semester:</strong> Fall 2024</p>
                      <p><strong>GPA:</strong> 3.8/4.0</p>
                      <p><strong>Credits:</strong> 120/180</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Schedule Tab */}
          {selectedTab === 'schedule' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventsLoading ? (
                      <div className="animate-pulse space-y-2">
                        {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
                      </div>
                    ) : Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event: any) => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{new Date(event.startTime).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                {new Date(event.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">No scheduled events</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Materials Tab */}
          {selectedTab === 'materials' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentsLoading ? (
                      <div className="animate-pulse space-y-2">
                        {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-200 rounded"></div>)}
                      </div>
                    ) : Array.isArray(uploadedDocuments) && uploadedDocuments.length > 0 ? (
                      uploadedDocuments.map((doc: any) => (
                        <div key={doc.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              {doc.type === 'calendar' ? '📅' : '📋'}
                            </div>
                            <div>
                              <h4 className="font-medium">{doc.filename}</h4>
                              <p className="text-sm text-gray-600 capitalize">{doc.type}</p>
                            </div>
                          </div>
                          <Badge variant={doc.processed ? "default" : "secondary"}>
                            {doc.processed ? "Processed" : "Processing"}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No materials uploaded yet</p>
                        <Link href="/">
                          <Button className="mt-4">Upload Materials</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Forum Tab */}
          {selectedTab === 'forum' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Discussion Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Forum features coming soon</p>
                    <p className="text-sm text-gray-400 mt-2">Connect with classmates and discuss course topics</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Assessments Tab */}
          {selectedTab === 'assessments' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessments & Grades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectsLoading ? (
                      <div className="animate-pulse space-y-2">
                        {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
                      </div>
                    ) : Array.isArray(subjects) ? (
                      subjects.map((subject: any) => (
                        <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{subject.name}</h4>
                              <p className="text-sm text-gray-600">Attendance: {subject.attendanceRate}%</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={subject.status === 'safe' ? 'default' : 'destructive'}>
                                {subject.status === 'safe' ? 'On Track' : 'At Risk'}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">
                                {subject.attendedClasses}/{subject.totalClasses} classes
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">No assessment data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Email Notifications</span>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Theme</span>
                          <Button variant="outline" size="sm">Light Mode</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Language</span>
                          <Button variant="outline" size="sm">English</Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Account</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Change Password</span>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Export Data</span>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}