import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase, getUserAnalytics, trackUserActivity } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Clock, BookOpen, Target, TrendingUp, Award, AlertCircle } from 'lucide-react';

interface AnalyticsDashboardProps {
  userId?: string;
  userType: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId, userType }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
    trackUserActivity('dashboard_view', { userType, section: 'analytics' });
  }, [userId, userType]);

  const loadAnalytics = async () => {
    try {
      const data = await getUserAnalytics(userId);
      setAnalytics(data);
      
      // Process data for charts
      if (data) {
        const processedData = processAnalyticsData(data);
        setAnalytics({ ...data, ...processedData });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (data: any) => {
    const { studyProgress, examAttempts, activities } = data;

    // Calculate study time by subject
    const studyTimeBySubject = studyProgress?.reduce((acc: any, item: any) => {
      acc[item.course_id] = (acc[item.course_id] || 0) + item.time_spent_minutes;
      return acc;
    }, {}) || {};

    // Calculate score progression
    const scoreProgression = examAttempts?.map((attempt: any) => ({
      date: new Date(attempt.created_at).toLocaleDateString(),
      score: attempt.score,
      examType: attempt.exam_type
    })) || [];

    // Calculate activity distribution
    const activityTypes = activities?.reduce((acc: any, activity: any) => {
      acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1;
      return acc;
    }, {}) || {};

    // Overall stats
    const totalStudyTime = Object.values(studyTimeBySubject).reduce((a: any, b: any) => a + b, 0);
    const averageScore = examAttempts?.length > 0 
      ? examAttempts.reduce((sum: number, attempt: any) => sum + attempt.score, 0) / examAttempts.length 
      : 0;
    const completedSubjects = studyProgress?.filter((p: any) => p.progress_percentage >= 100).length || 0;

    return {
      studyTimeBySubject: Object.entries(studyTimeBySubject).map(([subject, time]) => ({
        subject,
        time: time as number
      })),
      scoreProgression,
      activityDistribution: Object.entries(activityTypes).map(([type, count]) => ({
        type,
        count: count as number
      })),
      totalStudyTime,
      averageScore,
      completedSubjects
    };
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24 bg-muted rounded-lg"></div>
          </Card>
        ))}
      </div>
    );
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6 p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics?.totalStudyTime / 60) || 0}h</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.totalStudyTime % 60 || 0} minutes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics?.averageScore) || 0}%</div>
            <Badge variant={analytics?.averageScore >= 70 ? "default" : "destructive"}>
              {analytics?.averageScore >= 70 ? "Good" : "Needs Improvement"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Subjects</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.completedSubjects || 0}</div>
            <p className="text-xs text-muted-foreground">
              Out of {analytics?.studyProgress?.length || 0} subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Attempts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.examAttempts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total attempts made
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Time by Subject</CardTitle>
            <CardDescription>Time spent studying each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.studyTimeBySubject || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="time" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Progression</CardTitle>
            <CardDescription>Your exam scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.scoreProgression || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Your learning activities breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.activityDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(analytics?.activityDistribution || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
            <CardDescription>Current progress in each subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics?.studyProgress?.map((subject: any) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{subject.course_id}</span>
                  <span>{subject.progress_percentage}%</span>
                </div>
                <Progress value={subject.progress_percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Section */}
      <AIRecommendations userType={userType} />
    </div>
  );
};

const AIRecommendations: React.FC<{ userType: string }> = ({ userType }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-recommendations');
      if (error) throw error;
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Personalized suggestions to improve your learning</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{rec.content.title}</h4>
                  <Badge variant="outline">Priority {rec.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.content.message}</p>
                {rec.content.subjects && (
                  <div className="flex flex-wrap gap-2">
                    {rec.content.subjects.map((subject: string) => (
                      <Badge key={subject} variant="secondary">{subject}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recommendations available yet. Complete some study sessions or exams to get personalized suggestions.</p>
          </div>
        )}
        <div className="mt-4">
          <Button onClick={generateRecommendations} disabled={loading}>
            {loading ? 'Generating...' : 'Refresh Recommendations'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};