export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      case_studies: {
        Row: {
          content: Json | null
          description: string | null
          difficulty_level: string | null
          id: number
          status: string | null
          submitted_at: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          content?: Json | null
          description?: string | null
          difficulty_level?: string | null
          id?: never
          status?: string | null
          submitted_at?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          content?: Json | null
          description?: string | null
          difficulty_level?: string | null
          id?: never
          status?: string | null
          submitted_at?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      data_consent: {
        Row: {
          consent_date: string | null
          consent_status: boolean | null
          consent_type: string
          consent_version: string | null
          id: number
          revocation_date: string | null
          user_id: string | null
        }
        Insert: {
          consent_date?: string | null
          consent_status?: boolean | null
          consent_type: string
          consent_version?: string | null
          id?: never
          revocation_date?: string | null
          user_id?: string | null
        }
        Update: {
          consent_date?: string | null
          consent_status?: boolean | null
          consent_type?: string
          consent_version?: string | null
          id?: never
          revocation_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      data_deletion_requests: {
        Row: {
          id: number
          processed_by: string | null
          processed_date: string | null
          reason: string | null
          request_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          processed_by?: string | null
          processed_date?: string | null
          reason?: string | null
          request_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          processed_by?: string | null
          processed_date?: string | null
          reason?: string | null
          request_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      exam_attempts: {
        Row: {
          correct_answers: number | null
          duration_seconds: number | null
          end_time: string | null
          exam_metadata: Json | null
          exam_type: string
          id: number
          score: number | null
          start_time: string | null
          status: string | null
          total_questions: number | null
          user_id: string | null
        }
        Insert: {
          correct_answers?: number | null
          duration_seconds?: number | null
          end_time?: string | null
          exam_metadata?: Json | null
          exam_type: string
          id?: never
          score?: number | null
          start_time?: string | null
          status?: string | null
          total_questions?: number | null
          user_id?: string | null
        }
        Update: {
          correct_answers?: number | null
          duration_seconds?: number | null
          end_time?: string | null
          exam_metadata?: Json | null
          exam_type?: string
          id?: never
          score?: number | null
          start_time?: string | null
          status?: string | null
          total_questions?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      proctoring_sessions: {
        Row: {
          anomalies: string[] | null
          ended_at: string | null
          exam_type: string
          id: number
          proctor_notes: string | null
          session_metadata: Json | null
          started_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          anomalies?: string[] | null
          ended_at?: string | null
          exam_type: string
          id?: never
          proctor_notes?: string | null
          session_metadata?: Json | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          anomalies?: string[] | null
          ended_at?: string | null
          exam_type?: string
          id?: never
          proctor_notes?: string | null
          session_metadata?: Json | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          description: string | null
          id: number
          priority: string | null
          recommendation_date: string | null
          recommendation_metadata: Json | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: never
          priority?: string | null
          recommendation_date?: string | null
          recommendation_metadata?: Json | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: never
          priority?: string | null
          recommendation_date?: string | null
          recommendation_metadata?: Json | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      smart_alerts: {
        Row: {
          action_required: boolean | null
          alert_metadata: Json | null
          alert_type: string
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          severity: string | null
          user_id: string | null
        }
        Insert: {
          action_required?: boolean | null
          alert_metadata?: Json | null
          alert_type: string
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          message: string
          severity?: string | null
          user_id?: string | null
        }
        Update: {
          action_required?: boolean | null
          alert_metadata?: Json | null
          alert_type?: string
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          message?: string
          severity?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          end_date: string | null
          exam_date: string | null
          exam_type: string
          id: number
          plan_metadata: Json | null
          start_date: string | null
          status: string | null
          study_hours_per_week: number | null
          user_id: string | null
        }
        Insert: {
          end_date?: string | null
          exam_date?: string | null
          exam_type: string
          id?: never
          plan_metadata?: Json | null
          start_date?: string | null
          status?: string | null
          study_hours_per_week?: number | null
          user_id?: string | null
        }
        Update: {
          end_date?: string | null
          exam_date?: string | null
          exam_type?: string
          id?: never
          plan_metadata?: Json | null
          start_date?: string | null
          status?: string | null
          study_hours_per_week?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          duration_seconds: number | null
          end_time: string | null
          id: number
          progress_percentage: number | null
          session_metadata: Json | null
          start_time: string | null
          study_type: string | null
          subject: string
          user_id: string | null
        }
        Insert: {
          duration_seconds?: number | null
          end_time?: string | null
          id?: never
          progress_percentage?: number | null
          session_metadata?: Json | null
          start_time?: string | null
          study_type?: string | null
          subject: string
          user_id?: string | null
        }
        Update: {
          duration_seconds?: number | null
          end_time?: string | null
          id?: never
          progress_percentage?: number | null
          session_metadata?: Json | null
          start_time?: string | null
          study_type?: string | null
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          activity_details: Json | null
          activity_type: string
          id: number
          ip_address: unknown | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_details?: Json | null
          activity_type: string
          id?: never
          ip_address?: unknown | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_details?: Json | null
          activity_type?: string
          id?: never
          ip_address?: unknown | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_behavior: {
        Row: {
          action_timestamp: string | null
          action_type: string
          context: Json | null
          engagement_score: number | null
          id: number
          sentiment: string | null
          user_id: string | null
        }
        Insert: {
          action_timestamp?: string | null
          action_type: string
          context?: Json | null
          engagement_score?: number | null
          id?: never
          sentiment?: string | null
          user_id?: string | null
        }
        Update: {
          action_timestamp?: string | null
          action_type?: string
          context?: Json | null
          engagement_score?: number | null
          id?: never
          sentiment?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_modules: number | null
          id: number
          last_activity_date: string | null
          mastery_level: string | null
          progress_metadata: Json | null
          subject: string
          total_modules: number | null
          total_study_time_seconds: number | null
          user_id: string | null
        }
        Insert: {
          completed_modules?: number | null
          id?: never
          last_activity_date?: string | null
          mastery_level?: string | null
          progress_metadata?: Json | null
          subject: string
          total_modules?: number | null
          total_study_time_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          completed_modules?: number | null
          id?: never
          last_activity_date?: string | null
          mastery_level?: string | null
          progress_metadata?: Json | null
          subject?: string
          total_modules?: number | null
          total_study_time_seconds?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
