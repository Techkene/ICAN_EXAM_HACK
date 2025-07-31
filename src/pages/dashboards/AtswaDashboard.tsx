import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Users, 
  Trophy, 
  Calendar,
  FileText,
  Video,
  PenTool,
  LogOut,
  GraduationCap,
  Clock,
  Target,
  Award
} from 'lucide-react';

const AtswaDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Chimaobi Okolo';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const courses = [
    { name: 'Basic Accounting', progress: 85, level: 'ATS 1', status: 'In Progress' },
    { name: 'Business Law', progress: 92, level: 'ATS 1', status: 'Completed' },
    { name: 'Auditing', progress: 65, level: 'ATS 2', status: 'In Progress' },
    { name: 'Cost Accounting', progress: 78, level: 'ATS 2', status: 'In Progress' },
    { name: 'Communication Skills', progress: 88, level: 'ATS 3', status: 'In Progress' },
    { name: 'Tax', progress: 45, level: 'ATS 3', status: 'In Progress' }
  ];

  const quickActions = [
    {
      title: 'Take Mock Exam',
      description: 'Practice with timed mock exams',
      icon: PenTool,
      action: () => navigate('/exam/mock/atswa'),
      color: 'bg-blue-500'
    },
    {
      title: 'Study Materials',
      description: 'Download offline study guides',
      icon: Download,
      action: () => navigate('/materials/atswa'),
      color: 'bg-green-500'
    },
    {
      title: 'Find a Mentor',
      description: 'Connect with AATWA mentors',
      icon: Users,
      action: () => navigate('/mentors'),
      color: 'bg-purple-500'
    },
    {
      title: 'Take Real Exam',
      description: 'Start your official ATSWA exam',
      icon: Award,
      action: () => navigate('/exam/real/atswa'),
      color: 'bg-red-500'
    }
  ];

  const upcomingEvents = [
    { title: 'ATS 2 Mock Exam', date: '2024-02-15', time: '10:00 AM' },
    { title: 'Mentor Session', date: '2024-02-18', time: '3:00 PM' },
    { title: 'Study Group', date: '2024-02-20', time: '6:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
              <span className="ml-2 text-2xl font-bold text-gradient">ExamHack</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {userName}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ATSWA Dashboard</h1>
          <p className="text-gray-600">Track your progress through ATS 1, 2, and 3 levels</p>
          <Badge className="mt-2 bg-[hsl(var(--examhack-blue))]/10 text-[hsl(var(--examhack-blue))]">
            Pre-ICAN Technician Level
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Courses Completed</p>
                  <p className="text-2xl font-bold text-gray-900">1/6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-gray-900">72%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mock Exams Taken</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Study Hours</p>
                  <p className="text-2xl font-bold text-gray-900">124</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Progress */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Course Progress by Level</CardTitle>
                <CardDescription>Track your progress across ATS 1, 2, and 3 levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{course.level}</Badge>
                          <Badge 
                            className={`text-xs ${course.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                          >
                            {course.status}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-1" />
                        Videos
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Notes
                      </Button>
                      <Button size="sm" variant="outline">
                        <PenTool className="h-4 w-4 mr-1" />
                        Quiz
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      onClick={action.action}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mentor Matching */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recommended Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h4 className="font-semibold text-gray-900">Sarah Adebayo</h4>
                  <p className="text-sm text-gray-600 mb-3">AATWA Certified Professional</p>
                  <Button size="sm" className="w-full btn-primary">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="card-elevated bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Achievement Unlocked!</h4>
                <p className="text-sm text-gray-600">Completed 8 mock exams</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtswaDashboard;