import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare,
  LogOut,
  GraduationCap,
  Clock,
  Target,
  Award,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Mallam Haruna Nma';
  const [filterLevel, setFilterLevel] = useState('all');

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const mentees = [
    { 
      name: 'Chimaobi Okolo', 
      level: 'ATSWA', 
      progress: 72, 
      status: 'Active', 
      lastSession: '2024-01-28',
      subjects: ['Basic Accounting', 'Business Law'],
      performance: 'Good'
    },
    { 
      name: 'Kenechukwu Anoliefo', 
      level: 'Foundation', 
      progress: 81, 
      status: 'Active', 
      lastSession: '2024-01-26',
      subjects: ['Financial Accounting', 'Quant Techniques'],
      performance: 'Excellent'
    },
    { 
      name: 'Williams A', 
      level: 'Skills', 
      progress: 86, 
      status: 'Active', 
      lastSession: '2024-01-29',
      subjects: ['Financial Reporting', 'Tax'],
      performance: 'Very Good'
    },
    { 
      name: 'Isidore Okolie', 
      level: 'Professional', 
      progress: 91, 
      status: 'Active', 
      lastSession: '2024-01-27',
      subjects: ['Case Study', 'Corporate Reporting'],
      performance: 'Outstanding'
    },
    { 
      name: 'Sarah Mohammed', 
      level: 'Foundation', 
      progress: 45, 
      status: 'Needs Attention', 
      lastSession: '2024-01-20',
      subjects: ['Management Info', 'Business Law'],
      performance: 'Below Average'
    }
  ];

  const upcomingAppointments = [
    { mentee: 'Chimaobi Okolo', subject: 'Basic Accounting Review', date: '2024-02-01', time: '10:00 AM' },
    { mentee: 'Williams A', subject: 'Tax Planning Discussion', date: '2024-02-01', time: '2:00 PM' },
    { mentee: 'Kenechukwu Anoliefo', subject: 'Career Guidance', date: '2024-02-02', time: '11:00 AM' },
    { mentee: 'Isidore Okolie', subject: 'Case Study Review', date: '2024-02-02', time: '4:00 PM' }
  ];

  const badgeProgress = {
    sessionsCompleted: 47,
    totalFeedback: 125,
    menteeSuccessRate: 94,
    responseTime: '2.3 hours'
  };

  const filteredMentees = filterLevel === 'all' 
    ? mentees 
    : mentees.filter(mentee => mentee.level.toLowerCase() === filterLevel);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">Guide and support ICAN candidates across all levels</p>
          <Badge className="mt-2 bg-[hsl(var(--examhack-green))]/10 text-[hsl(var(--examhack-green))]">
            AATWA Certified Professional
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Mentees</p>
                  <p className="text-2xl font-bold text-gray-900">{mentees.filter(m => m.status === 'Active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{badgeProgress.menteeSuccessRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sessions Done</p>
                  <p className="text-2xl font-bold text-gray-900">{badgeProgress.sessionsCompleted}</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900">{badgeProgress.responseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentee Management */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mentee Management</CardTitle>
                    <CardDescription>Track and support your mentees' progress</CardDescription>
                  </div>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="atswa">ATSWA</SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="skills">Skills</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredMentees.map((mentee, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{mentee.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{mentee.level}</Badge>
                          <Badge className={`text-xs ${
                            mentee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {mentee.status}
                          </Badge>
                          <Badge className={`text-xs ${
                            mentee.performance === 'Outstanding' || mentee.performance === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                            mentee.performance === 'Very Good' || mentee.performance === 'Good' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {mentee.performance}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600">{mentee.progress}%</div>
                        <div className="text-xs text-gray-500">Last: {mentee.lastSession}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-1">Current Subjects:</div>
                      <div className="flex gap-1 flex-wrap">
                        {mentee.subjects.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Feedback
                      </Button>
                      <Button size="sm" className="btn-primary">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Feedback Tools */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Feedback Form</CardTitle>
                <CardDescription>Provide subject-specific feedback to mentees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Mentee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentees.map((mentee, index) => (
                        <SelectItem key={index} value={mentee.name}>{mentee.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accounting">Basic Accounting</SelectItem>
                      <SelectItem value="audit">Auditing</SelectItem>
                      <SelectItem value="tax">Taxation</SelectItem>
                      <SelectItem value="law">Business Law</SelectItem>
                      <SelectItem value="finance">Financial Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button className="btn-primary">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Feedback
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm">{appointment.mentee}</h4>
                    <p className="text-sm text-gray-600">{appointment.subject}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{appointment.date}</span>
                      <span className="text-xs font-medium text-blue-600">{appointment.time}</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full btn-secondary mt-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Badge System */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Mentor Engagement Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Gold Mentor</h4>
                  <p className="text-sm text-gray-600">Level 4 Achievement</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sessions to Platinum</span>
                    <span className="text-blue-600">3 more</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Feedback Score</span>
                    <span className="text-green-600">4.9/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Rate</span>
                    <span className="text-green-600">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Browse New Mentees
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Study Plan
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Group Discussion
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;