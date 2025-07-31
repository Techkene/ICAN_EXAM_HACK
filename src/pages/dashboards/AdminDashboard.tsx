import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  FileText, 
  BarChart3,
  LogOut,
  GraduationCap,
  Database,
  Shield,
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  Upload,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Victoria Akintunde';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const platformStats = {
    totalUsers: 12847,
    activeUsers: 8923,
    totalQuestions: 52334,
    examsSessions: 1247,
    mentors: 234,
    admins: 12
  };

  const flaggedContent = [
    { id: 1, type: 'Question', content: 'What is the capital of...', reason: 'Irrelevant to ICAN', reporter: 'System Auto-flag', date: '2024-01-29' },
    { id: 2, type: 'Discussion', content: 'This exam is too hard...', reason: 'Inappropriate language', reporter: 'User Report', date: '2024-01-28' },
    { id: 3, type: 'Question', content: 'Calculate the NPV when...', reason: 'Duplicate content', reporter: 'Content AI', date: '2024-01-27' }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'John Doe', level: 'Foundation', time: '2 hours ago' },
    { action: 'Exam session completed', user: 'Jane Smith', level: 'Skills', time: '3 hours ago' },
    { action: 'Question flagged', user: 'System', level: 'N/A', time: '4 hours ago' },
    { action: 'Mentor approved', user: 'Dr. Johnson', level: 'All', time: '6 hours ago' }
  ];

  const questionBankStats = [
    { level: 'ATSWA', total: 8450, approved: 8234, pending: 156, flagged: 60 },
    { level: 'Foundation', total: 12340, approved: 12180, pending: 98, flagged: 62 },
    { level: 'Skills', total: 15890, approved: 15645, pending: 187, flagged: 58 },
    { level: 'Professional', total: 15654, approved: 15398, pending: 203, flagged: 53 }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform management and oversight for ExamHack</p>
          <Badge className="mt-2 bg-red-100 text-red-700">
            ICAN Staff Administrator
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalQuestions.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.examsSessions.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Exam Sessions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.mentors}</p>
                <p className="text-sm text-gray-600">Mentors</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="text-center">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{platformStats.admins}</p>
                <p className="text-sm text-gray-600">Admins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-1/2 grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Recent Platform Activity</CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{activity.action}</h4>
                        <p className="text-sm text-gray-600">{activity.user} • {activity.level}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Flagged Content */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Flagged Content Review
                  </CardTitle>
                  <CardDescription>Content requiring admin attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {flaggedContent.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">{item.content}</p>
                      <p className="text-xs text-gray-600 mb-2">Reason: {item.reason}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Button className="btn-primary">
                    <Users className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Users
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export User Data
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Role-based Access Control</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Student Accounts</span>
                      <Badge>11,234 active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Mentor Accounts</span>
                      <Badge>234 active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Admin Accounts</span>
                      <Badge>12 active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Question Bank Management</CardTitle>
                <CardDescription>Manage questions by ICAN stage and course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Button className="btn-primary">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Questions
                  </Button>
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Bulk Import
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Bank
                  </Button>
                </div>

                <div className="space-y-4">
                  {questionBankStats.map((level, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{level.level} Level</h4>
                        <Badge variant="outline">{level.total.toLocaleString()} total</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-medium text-green-700">{level.approved.toLocaleString()}</div>
                          <div className="text-green-600">Approved</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-medium text-yellow-700">{level.pending}</div>
                          <div className="text-yellow-600">Pending</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="font-medium text-red-700">{level.flagged}</div>
                          <div className="text-red-600">Flagged</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Platform usage and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Daily Active Users</span>
                      <span className="text-lg font-bold text-blue-600">3,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Exam Completion Rate</span>
                      <span className="text-lg font-bold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Average Session Time</span>
                      <span className="text-lg font-bold text-purple-600">45 min</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Platform Uptime</span>
                      <span className="text-lg font-bold text-green-600">99.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Export Reports</CardTitle>
                  <CardDescription>Generate and download analytical reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    User Activity Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exam Performance Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Content Usage Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Financial Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Security Audit Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;