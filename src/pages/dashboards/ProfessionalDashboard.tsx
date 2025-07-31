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
  Brain,
  BarChart3,
  Briefcase,
  FileCheck
} from 'lucide-react';

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Isidore Okolie';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const courses = [
    { name: 'Case Study', progress: 78, status: 'In Progress', complexity: 'Expert', deadline: '2024-03-15' },
    { name: 'Corporate Reporting', progress: 85, status: 'In Progress', complexity: 'Advanced', deadline: '2024-03-20' },
    { name: 'Strategic Financial Management', progress: 92, status: 'Completed', complexity: 'Expert', deadline: '2024-02-28' },
    { name: 'Advanced Audit', progress: 68, status: 'In Progress', complexity: 'Expert', deadline: '2024-04-10' },
    { name: 'Advanced Tax', progress: 88, status: 'In Progress', complexity: 'Advanced', deadline: '2024-04-05' }
  ];

  const quickActions = [
    {
      title: 'Case Simulations',
      description: 'Practice real-world scenarios',
      icon: Briefcase,
      action: () => navigate('/case-simulator/professional'),
      color: 'bg-indigo-500'
    },
    {
      title: 'Writing Sessions',
      description: 'Time-boxed practice sessions',
      icon: PenTool,
      action: () => navigate('/writing-sessions/professional'),
      color: 'bg-blue-500'
    },
    {
      title: 'Peer Review',
      description: 'Collaborate with colleagues',
      icon: Users,
      action: () => navigate('/peer-review/professional'),
      color: 'bg-green-500'
    },
    {
      title: 'Take Real Exam',
      description: 'Start your Professional exam',
      icon: Award,
      action: () => navigate('/exam/real/professional'),
      color: 'bg-red-500'
    }
  ];

  const caseStudies = [
    { title: 'Manufacturing Company Restructure', difficulty: 'Expert', timeLimit: '4 hours', status: 'pending' },
    { title: 'Retail Chain Acquisition Analysis', difficulty: 'Advanced', timeLimit: '3.5 hours', status: 'completed' },
    { title: 'Tech Startup Valuation', difficulty: 'Expert', timeLimit: '4 hours', status: 'in-progress' },
    { title: 'Banking Sector Risk Assessment', difficulty: 'Expert', timeLimit: '4.5 hours', status: 'pending' }
  ];

  const recentSubmissions = [
    { title: 'Strategic Analysis Report v2.1', date: '2024-01-28', status: 'Under Review', mentor: 'Dr. Johnson' },
    { title: 'Tax Planning Case Study v1.3', date: '2024-01-25', status: 'Approved', mentor: 'Prof. Williams' },
    { title: 'Audit Framework Document v1.0', date: '2024-01-22', status: 'Needs Revision', mentor: 'Ms. Chen' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Level Dashboard</h1>
          <p className="text-gray-600">Final ICAN professional qualification with advanced case studies</p>
          <Badge className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            Expert Level
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Case Studies</p>
                  <p className="text-2xl font-bold text-gray-900">8/12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Peer Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overall Score</p>
                  <p className="text-2xl font-bold text-gray-900">91%</p>
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
                <CardTitle>Professional Course Progress</CardTitle>
                <CardDescription>Advanced subjects with submission deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{course.complexity}</Badge>
                          <Badge 
                            className={`text-xs ${course.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                          >
                            {course.status}
                          </Badge>
                          <Badge className="text-xs bg-red-100 text-red-700">
                            Due: {course.deadline}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Briefcase className="h-4 w-4 mr-1" />
                        Cases
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Submit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Case Study Simulator */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Case Study Simulator</CardTitle>
                <CardDescription>Real-world business scenarios for professional practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {caseStudies.map((caseStudy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{caseStudy.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{caseStudy.difficulty}</Badge>
                        <span className="text-xs text-gray-500">{caseStudy.timeLimit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${
                        caseStudy.status === 'completed' ? 'bg-green-100 text-green-700' :
                        caseStudy.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {caseStudy.status}
                      </Badge>
                      {caseStudy.status === 'pending' && (
                        <Button size="sm" className="btn-primary">Start</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Professional-level tools and resources</CardDescription>
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
            {/* Recent Submissions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSubmissions.map((submission, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">{submission.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{submission.date} • {submission.mentor}</p>
                    <Badge className={`text-xs mt-2 ${
                      submission.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      submission.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {submission.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900">Case Study Final</h4>
                  <p className="text-sm text-red-700">Due in 5 days</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900">Corporate Reporting</h4>
                  <p className="text-sm text-yellow-700">Due in 12 days</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">Advanced Audit Project</h4>
                  <p className="text-sm text-blue-700">Due in 28 days</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="card-elevated bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-indigo-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Excellence Award!</h4>
                <p className="text-sm text-gray-600">Top performer in case studies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;