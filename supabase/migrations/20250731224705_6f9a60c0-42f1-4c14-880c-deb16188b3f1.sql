-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  user_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, user_type)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'foundation')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert dummy data for existing tables
INSERT INTO public.study_plans (user_id, exam_type, study_hours_per_week, exam_date, start_date, end_date) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ATSWA', 15, '2024-06-15', '2024-03-01', '2024-06-10'),
('550e8400-e29b-41d4-a716-446655440001', 'Foundation', 20, '2024-08-20', '2024-04-01', '2024-08-15'),
('550e8400-e29b-41d4-a716-446655440002', 'Skills', 25, '2024-09-25', '2024-05-01', '2024-09-20');

INSERT INTO public.recommendations (user_id, type, title, description, priority) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'study_plan', 'Focus on Financial Accounting', 'Your performance in financial accounting needs improvement. Spend more time on this topic.', 'high'),
('550e8400-e29b-41d4-a716-446655440001', 'practice_exam', 'Take More Practice Tests', 'Regular practice tests will help improve your exam performance.', 'medium'),
('550e8400-e29b-41d4-a716-446655440002', 'study_schedule', 'Adjust Study Schedule', 'Consider increasing your study hours per week for better preparation.', 'low');

INSERT INTO public.user_progress (user_id, subject, completed_modules, total_modules, mastery_level, total_study_time_seconds) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Financial Accounting', 8, 12, 'intermediate', 7200),
('550e8400-e29b-41d4-a716-446655440000', 'Cost Accounting', 5, 10, 'beginner', 3600),
('550e8400-e29b-41d4-a716-446655440001', 'Business Law', 10, 15, 'advanced', 9000),
('550e8400-e29b-41d4-a716-446655440002', 'Taxation', 12, 18, 'intermediate', 10800);

INSERT INTO public.exam_attempts (user_id, exam_type, score, correct_answers, total_questions, duration_seconds, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ATSWA', 75.5, 45, 60, 7200, 'completed'),
('550e8400-e29b-41d4-a716-446655440001', 'Foundation', 82.0, 82, 100, 10800, 'completed'),
('550e8400-e29b-41d4-a716-446655440002', 'Skills', 68.5, 137, 200, 14400, 'completed');

INSERT INTO public.smart_alerts (user_id, alert_type, message, severity, action_required) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'study_reminder', 'You have not studied in the past 3 days. Keep up with your schedule!', 'medium', true),
('550e8400-e29b-41d4-a716-446655440001', 'exam_reminder', 'Your exam is in 2 weeks. Time to intensify your preparation.', 'high', true),
('550e8400-e29b-41d4-a716-446655440002', 'progress_update', 'Great job! You completed 3 modules this week.', 'low', false);