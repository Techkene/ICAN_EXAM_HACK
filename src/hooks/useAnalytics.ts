import { useEffect, useState } from 'react';
import { supabase, trackUserActivity, getUserAnalytics } from '@/lib/supabase';

interface AnalyticsData {
  studyProgress: any[];
  examAttempts: any[];
  activities: any[];
  totalStudyTime: number;
  averageScore: number;
  completedSubjects: number;
}

export const useAnalytics = (userId?: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, [userId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const analyticsData = await getUserAnalytics(userId);
      
      if (analyticsData) {
        const processedData = processAnalyticsData(analyticsData);
        setData(processedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (rawData: any): AnalyticsData => {
    const { studyProgress, examAttempts, activities } = rawData;

    // Calculate total study time
    const totalStudyTime = studyProgress?.reduce((total: number, item: any) => 
      total + (item.time_spent_minutes || 0), 0) || 0;

    // Calculate average score
    const averageScore = examAttempts?.length > 0 
      ? examAttempts.reduce((sum: number, attempt: any) => sum + (attempt.score || 0), 0) / examAttempts.length 
      : 0;

    // Count completed subjects
    const completedSubjects = studyProgress?.filter((p: any) => p.progress_percentage >= 100).length || 0;

    return {
      studyProgress: studyProgress || [],
      examAttempts: examAttempts || [],
      activities: activities || [],
      totalStudyTime,
      averageScore,
      completedSubjects
    };
  };

  const trackActivity = async (activityType: string, metadata: any = {}) => {
    try {
      await trackUserActivity(activityType, metadata);
      // Refresh analytics after tracking
      await loadAnalytics();
    } catch (err) {
      console.error('Error tracking activity:', err);
    }
  };

  const refetch = () => {
    loadAnalytics();
  };

  return {
    data,
    loading,
    error,
    trackActivity,
    refetch
  };
};

// Hook for real-time analytics subscriptions
export const useRealtimeAnalytics = (userId: string) => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const subscription = supabase
      .channel(`analytics-${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_activities',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        setActivities(prev => [payload.new, ...prev.slice(0, 49)]); // Keep last 50 activities
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return { activities };
};

// Hook for study session tracking
export const useStudySession = () => {
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [currentCourse, setCurrentCourse] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  const startSession = (courseId: string, topicId?: string) => {
    setSessionStart(new Date());
    setCurrentCourse(courseId);
    setCurrentTopic(topicId || null);
    
    trackUserActivity('study_session_start', {
      courseId,
      topicId,
      startTime: new Date().toISOString()
    });
  };

  const endSession = async () => {
    if (!sessionStart || !currentCourse) return;

    const duration = Math.round((new Date().getTime() - sessionStart.getTime()) / (1000 * 60));
    
    await trackUserActivity('study_session_end', {
      courseId: currentCourse,
      topicId: currentTopic,
      duration,
      endTime: new Date().toISOString()
    });

    // Reset session
    setSessionStart(null);
    setCurrentCourse(null);
    setCurrentTopic(null);

    return duration;
  };

  const getSessionDuration = () => {
    if (!sessionStart) return 0;
    return Math.round((new Date().getTime() - sessionStart.getTime()) / (1000 * 60));
  };

  return {
    isActive: !!sessionStart,
    duration: getSessionDuration(),
    startSession,
    endSession,
    currentCourse,
    currentTopic
  };
};