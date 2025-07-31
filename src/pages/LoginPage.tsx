import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      // Get user profile to determine dashboard
      const getUserProfile = async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
        
        const userType = profile?.user_type || 'foundation';
        navigate(`/dashboard/${userType}`);
      };
      
      getUserProfile();
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))] animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
            <span className="ml-2 text-2xl font-bold text-gradient">ExamHack</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access your learning dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-[hsl(var(--examhack-blue))]"
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-[hsl(var(--examhack-blue))]"
                  onClick={() => navigate('/signup')}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-4 border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-700 text-center">
              <strong>New to ExamHack?</strong> Create an account to get started with your ICAN exam preparation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;