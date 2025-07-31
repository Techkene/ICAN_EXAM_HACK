import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    // Get user's study progress and exam attempts
    const { data: studyProgress } = await supabaseClient
      .from('study_progress')
      .select('*')
      .eq('user_id', user.id)

    const { data: examAttempts } = await supabaseClient
      .from('exam_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    const { data: userProfile } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Generate recommendations based on performance
    const recommendations = generateRecommendations(userProfile, studyProgress, examAttempts)

    // Save recommendations to database
    for (const recommendation of recommendations) {
      await supabaseClient
        .from('ai_recommendations')
        .insert({
          user_id: user.id,
          recommendation_type: recommendation.type,
          content: recommendation.content,
          priority: recommendation.priority
        })
    }

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateRecommendations(userProfile: any, studyProgress: any[], examAttempts: any[]) {
  const recommendations = []

  if (!studyProgress || studyProgress.length === 0) {
    recommendations.push({
      type: 'study_start',
      content: {
        title: 'Start Your Learning Journey',
        message: 'Begin with foundational topics to build your accounting knowledge.',
        action: 'start_studying',
        subjects: getRecommendedSubjects(userProfile?.user_type)
      },
      priority: 1
    })
  }

  // Analyze weak areas from exam attempts
  if (examAttempts && examAttempts.length > 0) {
    const latestAttempt = examAttempts[0]
    if (latestAttempt.score < 70) {
      recommendations.push({
        type: 'weak_area_focus',
        content: {
          title: 'Focus on Weak Areas',
          message: `Your recent score was ${latestAttempt.score}%. Let's work on improving specific topics.`,
          action: 'practice_more',
          subjects: identifyWeakSubjects(latestAttempt.answers)
        },
        priority: 2
      })
    }
  }

  // Study consistency recommendations
  const lastStudyDate = studyProgress
    ?.map(p => new Date(p.last_accessed))
    .sort((a, b) => b.getTime() - a.getTime())[0]

  if (!lastStudyDate || (new Date().getTime() - lastStudyDate.getTime()) > 3 * 24 * 60 * 60 * 1000) {
    recommendations.push({
      type: 'consistency_reminder',
      content: {
        title: 'Stay Consistent',
        message: 'Regular study sessions improve retention. Try to study a little each day.',
        action: 'create_schedule',
        suggestion: 'Set aside 30 minutes daily for studying'
      },
      priority: 3
    })
  }

  return recommendations
}

function getRecommendedSubjects(userType: string) {
  const subjects = {
    atswa: ['Basic Accounting', 'Business Law', 'Communication Skills'],
    foundation: ['Financial Accounting', 'Quantitative Techniques', 'Business Law'],
    skills: ['Financial Reporting', 'Taxation', 'Performance Management'],
    professional: ['Strategic Financial Management', 'Advanced Audit', 'Corporate Reporting']
  }
  return subjects[userType as keyof typeof subjects] || subjects.foundation
}

function identifyWeakSubjects(answers: any) {
  // Analyze answers to identify weak topics
  // This is a simplified implementation
  return ['Financial Accounting', 'Taxation']
}