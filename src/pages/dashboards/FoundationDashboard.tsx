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
  Award,
  PlayCircle
} from 'lucide-react';

const FoundationDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Kenechukwu Anoliefo';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const courses = [
    { name: 'Quantitative Techniques', progress: 88, status: 'In Progress', difficulty: 'Beginner' },
    { name: 'Financial Accounting', progress: 92, status: 'Completed', difficulty: 'Beginner' },
    { name: 'Management Information', progress: 75, status: 'In Progress', difficulty: 'Intermediate' },
    { name: 'Business & Finance', progress: 68, status: 'In Progress', difficulty: 'Intermediate' },
    { name: 'Business Law', progress: 85, status: 'In Progress', difficulty: 'Beginner' }
  ];

  const quickActions = [
    {
      title: 'Beginner Quiz',
      description: 'Take foundation-level quizzes',
      icon: PenTool,
      action: () => navigate('/quiz/foundation'),
      color: 'bg-blue-500'
    },
    {
      title: 'Video Tutorials', 
      description: 'Watch beginner-friendly videos',
      icon: PlayCircle,
      action: () => navigate('/videos/foundation'),
      color: 'bg-green-500'
    },
    {
      title: 'Mentor Assistant',
      description: 'Get help with onboarding',
      icon: Users,
      action: () => navigate('/mentor-assistant'),
      color: 'bg-purple-500'
    },
    {
      title: 'Take Real Exam',
      description: 'Start your Foundation exam',
      icon: Award,
      action: () => navigate('/exam/real/foundation'),
      color: 'bg-red-500'
    }
  ];

  const studyPlan = [
    { week: 1, topic: 'Quantitative Methods Basics', status: 'completed' },
    { week: 2, topic: 'Financial Statements Introduction', status: 'completed' },
    { week: 3, topic: 'Management Principles', status: 'current' },
    { week: 4, topic: 'Business Environment', status: 'upcoming' },
    { week: 5, topic: 'Legal Framework', status: 'upcoming' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Foundation Level Dashboard</h1>
          <p className="text-gray-600">Your pathway to ICAN Skills Level</p>
          <Badge className="mt-2 bg-[hsl(var(--examhack-green))]/10 text-[hsl(var(--examhack-green))]">
            Non-accounting Graduate Track
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
                  <p className="text-2xl font-bold text-gray-900">1/5</p>
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
                  <p className="text-2xl font-bold text-gray-900">81%</p>
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
                  <p className="text-sm font-medium text-gray-600">Quizzes Passed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
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
                  <p className="text-sm font-medium text-gray-600">Study Streak</p>
                  <p className="text-2xl font-bold text-gray-900">15 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Modular Study Planner */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Modular Study Planner</CardTitle>
                <CardDescription>Structured learning path for foundation subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyPlan.map((week, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      week.status === 'completed' ? 'bg-green-100 text-green-700' :
                      week.status === 'current' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {week.week}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{week.topic}</h4>
                      <Badge className={`text-xs mt-1 ${
                        week.status === 'completed' ? 'bg-green-100 text-green-700' :
                        week.status === 'current' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {week.status}
                      </Badge>
                    </div>
                    {week.status === 'current' && (
                      <Button size="sm" className="btn-primary">Continue</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Track your foundation-level subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{course.difficulty}</Badge>
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
                        Tutorial
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Offline
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
                <CardDescription>Foundation-level activities and resources</CardDescription>
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
            {/* Mentor Onboarding */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Mentor Onboarding</CardTitle>
                <CardDescription>Get personalized guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h4 className="font-semibold text-gray-900">Dr. Michael Chen</h4>
                  <p className="text-sm text-gray-600 mb-3">Foundation Specialist</p>
                  <Button size="sm" className="w-full btn-primary mb-2">
                    Schedule Session
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>This Week's Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Complete 3 tutorials</span>
                  <Badge className="bg-green-100 text-green-700">2/3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Take 2 quizzes</span>
                  <Badge className="bg-blue-100 text-blue-700">1/2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Study 5 hours</span>
                  <Badge className="bg-yellow-100 text-yellow-700">3.5/5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="card-elevated bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Great Progress!</h4>
                <p className="text-sm text-gray-600">15-day study streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationDashboard;