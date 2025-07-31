import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client with proper error handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Analytics tracking functions
export const trackUserActivity = async (activityType: string, metadata: any = {}) => {
  if (!supabase) {
    console.warn('Supabase not initialized - skipping activity tracking')
    return
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('user_activities')
    .insert({
      user_id: user.id,
      activity_type: activityType,
      metadata: metadata,
      duration_minutes: metadata.duration || 0,
      course_id: metadata.courseId || null,
      topic_id: metadata.topicId || null
    })

  if (error) console.error('Error tracking activity:', error)
}

// Study progress tracking
export const updateStudyProgress = async (courseId: string, topicId: string, progressPercentage: number, timeSpent: number) => {
  if (!supabase) {
    console.warn('Supabase not initialized - skipping progress tracking')
    return
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('study_progress')
    .upsert({
      user_id: user.id,
      course_id: courseId,
      topic_id: topicId,
      progress_percentage: progressPercentage,
      time_spent_minutes: timeSpent,
      last_accessed: new Date().toISOString()
    }, {
      onConflict: 'user_id,course_id,topic_id'
    })

  if (error) console.error('Error updating study progress:', error)
}

// Exam attempt tracking
export const saveExamAttempt = async (examData: {
  examType: string
  level: string
  score: number
  totalQuestions: number
  timeTaken: number
  completionStatus: string
  answers: any
  proctoringData?: any
}) => {
  if (!supabase) {
    console.warn('Supabase not initialized - skipping exam attempt save')
    return null
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { data, error } = await supabase
    .from('exam_attempts')
    .insert({
      user_id: user.id,
      exam_type: examData.examType,
      level: examData.level,
      score: examData.score,
      total_questions: examData.totalQuestions,
      time_taken_minutes: examData.timeTaken,
      completion_status: examData.completionStatus,
      answers: examData.answers,
      proctoring_data: examData.proctoringData || {}
    })
    .select()
    .single()

  if (error) console.error('Error saving exam attempt:', error)
  return data
}

// Get user analytics
export const getUserAnalytics = async (userId?: string) => {
  if (!supabase) {
    console.warn('Supabase not initialized - returning null analytics')
    return null
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  const targetUserId = userId || user?.id
  
  if (!targetUserId) return null

  // Get study progress
  const { data: studyProgress } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', targetUserId)

  // Get exam attempts
  const { data: examAttempts } = await supabase
    .from('exam_attempts')
    .select('*')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false })

  // Get recent activities
  const { data: activities } = await supabase
    .from('user_activities')
    .select('*')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false })
    .limit(50)

  return {
    studyProgress,
    examAttempts,
    activities
  }
}

// Real-time subscriptions
export const subscribeToUserActivities = (userId: string, callback: (payload: any) => void) => {
  if (!supabase) {
    console.warn('Supabase not initialized - skipping subscription')
    return { unsubscribe: () => {} }
  }
  
  return supabase
    .channel('user-activities')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'user_activities',
      filter: `user_id=eq.${userId}`
    }, callback)
    .subscribe()
}