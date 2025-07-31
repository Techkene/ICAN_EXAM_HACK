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
    const { sessionData, examAttemptId } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Analyze proctoring data
    const analysis = analyzeProctoringSession(sessionData)

    // Save proctoring session
    const { error } = await supabaseClient
      .from('proctoring_sessions')
      .insert({
        exam_attempt_id: examAttemptId,
        session_data: sessionData,
        risk_score: analysis.riskScore,
        flags: analysis.flags
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function analyzeProctoringSession(sessionData: any) {
  const flags = []
  let riskScore = 0

  // Analyze face detection issues
  if (!sessionData.faceDetected) {
    flags.push('No face detected during exam')
    riskScore += 25
  }

  if (sessionData.multipleFaces) {
    flags.push('Multiple faces detected')
    riskScore += 30
  }

  // Analyze behavior patterns
  if (sessionData.headTurns > 10) {
    flags.push('Excessive head movement')
    riskScore += 15
  }

  if (sessionData.tabSwitches > 0) {
    flags.push(`${sessionData.tabSwitches} tab switches detected`)
    riskScore += sessionData.tabSwitches * 10
  }

  // Analyze audio patterns
  if (sessionData.audioLevel > 50) {
    flags.push('Voice/audio detected during exam')
    riskScore += 20
  }

  // Analyze time patterns
  const examDuration = sessionData.examDuration || 120 // minutes
  if (examDuration < 30) {
    flags.push('Exam completed too quickly')
    riskScore += 20
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100)

  // Determine overall assessment
  let assessment = 'PASS'
  if (riskScore > 70) {
    assessment = 'HIGH_RISK'
  } else if (riskScore > 40) {
    assessment = 'MEDIUM_RISK'
  }

  return {
    riskScore,
    flags,
    assessment,
    recommendations: generateRecommendations(riskScore, flags)
  }
}

function generateRecommendations(riskScore: number, flags: string[]) {
  const recommendations = []

  if (riskScore > 70) {
    recommendations.push('Manual review required - high risk of academic dishonesty')
    recommendations.push('Consider additional verification measures')
  } else if (riskScore > 40) {
    recommendations.push('Review flagged incidents')
    recommendations.push('May require follow-up interview')
  } else {
    recommendations.push('Normal proctoring session')
    recommendations.push('No additional action required')
  }

  return recommendations
}