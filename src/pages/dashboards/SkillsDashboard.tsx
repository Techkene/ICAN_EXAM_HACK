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
  Zap
} from 'lucide-react';

const SkillsDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Williams A';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const courses = [
    { name: 'Financial Reporting', progress: 85, status: 'In Progress', difficulty: 'Advanced', aiScore: 88 },
    { name: 'Tax', progress: 92, status: 'Completed', difficulty: 'Advanced', aiScore: 94 },
    { name: 'Performance Management', progress: 78, status: 'In Progress', difficulty: 'Intermediate', aiScore: 82 },
    { name: 'Audit', progress: 68, status: 'In Progress', difficulty: 'Advanced', aiScore: 75 },
    { name: 'Governance & Ethics', progress: 89, status: 'In Progress', difficulty: 'Intermediate', aiScore: 91 }
  ];

  const quickActions = [
    {
      title: 'AI Revision Path',
      description: 'Smart study recommendations',
      icon: Brain,
      action: () => navigate('/ai-revision/skills'),
      color: 'bg-purple-500'
    },
    {
      title: 'Mock Testing Engine',
      description: 'Advanced practice exams',
      icon: PenTool,
      action: () => navigate('/mock-engine/skills'),
      color: 'bg-blue-500'
    },
    {
      title: 'Course Analytics',
      description: 'Detailed performance insights',
      icon: BarChart3,
      action: () => navigate('/analytics/skills'),
      color: 'bg-green-500'
    },
    {
      title: 'Take Real Exam',
      description: 'Start your Skills level exam',
      icon: Award,
      action: () => navigate('/exam/real/skills'),
      color: 'bg-red-500'
    }
  ];

  const weeklyGoals = [
    { goal: 'Complete Financial Reporting Module 3', progress: 80, target: 100 },
    { goal: 'Take 2 Advanced Mock Tests', progress: 50, target: 100 },
    { goal: 'Review AI Feedback Points', progress: 75, target: 100 },
    { goal: 'Study Group Participation', progress: 100, target: 100 }
  ];

  const aiInsights = [
    {
      type: 'strength',
      subject: 'Tax',
      message: 'Excellent grasp of VAT calculations. Consider advanced scenarios.',
      icon: '💪'
    },
    {
      type: 'improvement',
      subject: 'Audit',
      message: 'Focus on risk assessment procedures. Practice more case studies.',
      icon: '📈'
    },
    {
      type: 'recommendation',
      subject: 'Financial Reporting',
      message: 'Review IFRS 16 - your weakest area in recent assessments.',
      icon: '💡'
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skills Level Dashboard</h1>
          <p className="text-gray-600">Advanced accounting and audit skills with AI-powered insights</p>
          <Badge className="mt-2 bg-[hsl(var(--examhack-blue))]/10 text-[hsl(var(--examhack-blue))]">
            Intermediate Level
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
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">AI Performance</p>
                  <p className="text-2xl font-bold text-gray-900">86%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mock Tests Passed</p>
                  <p className="text-2xl font-bold text-gray-900">15/18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Study Intensity</p>
                  <p className="text-2xl font-bold text-gray-900">High</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Progress with AI Insights */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Course Progress & AI Analysis</CardTitle>
                <CardDescription>Advanced subjects with intelligent feedback</CardDescription>
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
                          <Badge className="text-xs bg-purple-100 text-purple-700">
                            AI Score: {course.aiScore}%
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Brain className="h-4 w-4 mr-1" />
                        AI Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <PenTool className="h-4 w-4 mr-1" />
                        Mock Test
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Goals Planner */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Weekly Goal Planner</CardTitle>
                <CardDescription>Track your weekly objectives and targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{goal.goal}</span>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Advanced tools for Skills level preparation</CardDescription>
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
            {/* AI Insights */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{insight.icon}</span>
                      <span className="font-medium text-sm text-gray-900">{insight.subject}</span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Analytics */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--examhack-blue))] mb-1">86%</div>
                  <p className="text-sm text-gray-600">Overall Performance</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Strengths</span>
                    <span className="text-green-600">Tax, Ethics</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Focus Areas</span>
                    <span className="text-orange-600">Audit, Financial Reporting</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Milestone</span>
                    <span className="text-blue-600">Professional Level</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="card-elevated bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">AI Mastery!</h4>
                <p className="text-sm text-gray-600">Top 10% in AI-assisted learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsDashboard;