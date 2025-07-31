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
    const { examDate, userType, weeklyHours } = await req.json()
    
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

    // Generate personalized study plan
    const studyPlan = generateStudyPlan(examDate, userType, weeklyHours)

    // Save study plan to database
    const { error } = await supabaseClient
      .from('study_plans')
      .upsert({
        user_id: user.id,
        exam_date: examDate,
        plan_data: studyPlan,
        is_active: true
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ studyPlan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateStudyPlan(examDate: string, userType: string, weeklyHours: number) {
  const exam = new Date(examDate)
  const today = new Date()
  const weeksAvailable = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7))
  
  const subjects = getSubjectsByType(userType)
  const totalHours = weeksAvailable * weeklyHours
  const hoursPerSubject = Math.floor(totalHours / subjects.length)

  const plan = {
    totalWeeks: weeksAvailable,
    weeklyHours: weeklyHours,
    subjects: subjects.map(subject => ({
      name: subject.name,
      allocatedHours: hoursPerSubject,
      topics: subject.topics,
      priority: subject.priority
    })),
    schedule: generateWeeklySchedule(subjects, weeklyHours, weeksAvailable)
  }

  return plan
}

function getSubjectsByType(userType: string) {
  const curriculums = {
    atswa: [
      {
        name: 'Basic Accounting',
        topics: ['Introduction to Accounting', 'Double Entry', 'Trial Balance', 'Final Accounts'],
        priority: 1
      },
      {
        name: 'Business Law',
        topics: ['Contract Law', 'Partnership Law', 'Company Law', 'Employment Law'],
        priority: 2
      },
      {
        name: 'Cost Accounting',
        topics: ['Cost Classification', 'Job Costing', 'Process Costing', 'Budgeting'],
        priority: 3
      }
    ],
    foundation: [
      {
        name: 'Financial Accounting',
        topics: ['Conceptual Framework', 'Income Statement', 'Balance Sheet', 'Cash Flow'],
        priority: 1
      },
      {
        name: 'Quantitative Techniques',
        topics: ['Statistics', 'Probability', 'Linear Programming', 'Time Series'],
        priority: 2
      },
      {
        name: 'Management Information',
        topics: ['Data Processing', 'System Analysis', 'Database Design', 'Control Systems'],
        priority: 3
      }
    ],
    skills: [
      {
        name: 'Financial Reporting',
        topics: ['IFRS Standards', 'Consolidated Accounts', 'Financial Analysis', 'Interpretation'],
        priority: 1
      },
      {
        name: 'Taxation',
        topics: ['Personal Income Tax', 'Company Income Tax', 'VAT', 'Capital Gains Tax'],
        priority: 2
      },
      {
        name: 'Performance Management',
        topics: ['Budgeting', 'Variance Analysis', 'Performance Measurement', 'Transfer Pricing'],
        priority: 3
      }
    ],
    professional: [
      {
        name: 'Strategic Financial Management',
        topics: ['Investment Appraisal', 'Risk Management', 'Corporate Finance', 'Financial Strategy'],
        priority: 1
      },
      {
        name: 'Advanced Audit',
        topics: ['Audit Planning', 'Risk Assessment', 'Audit Evidence', 'Reporting'],
        priority: 2
      },
      {
        name: 'Corporate Reporting',
        topics: ['Complex IFRS', 'Group Accounts', 'Business Combinations', 'Ethical Issues'],
        priority: 3
      }
    ]
  }

  return curriculums[userType as keyof typeof curriculums] || curriculums.foundation
}

function generateWeeklySchedule(subjects: any[], weeklyHours: number, totalWeeks: number) {
  const schedule = []
  
  for (let week = 1; week <= totalWeeks; week++) {
    const weekSchedule = {
      week: week,
      focus: week <= totalWeeks * 0.7 ? 'learning' : 'revision',
      subjects: subjects.map(subject => ({
        name: subject.name,
        hours: Math.floor(weeklyHours / subjects.length),
        activities: week <= totalWeeks * 0.7 
          ? ['Read notes', 'Watch videos', 'Practice questions']
          : ['Revision', 'Mock tests', 'Problem solving']
      }))
    }
    schedule.push(weekSchedule)
  }

  return schedule
}