import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Shield, 
  BookOpen, 
  Award, 
  TrendingUp,
  CheckCircle,
  User,
  LogIn
} from 'lucide-react';
import heroStudents from '@/assets/hero-students.jpg';
import professionalAccountants from '@/assets/professional-accountants.jpg';
import digitalLearning from '@/assets/digital-learning.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const learningPaths = [
    {
      title: "ATSWA Level",
      description: "Pre-ICAN technician exams (ATS 1-3)",
      courses: ["Basic Accounting", "Business Law", "Auditing", "Cost Accounting", "Communication Skills", "Tax"],
      features: ["Tiered dashboard", "Gamified progress", "Offline access", "Mentor pairing"],
      level: "Entry Level",
      duration: "6-12 months",
      route: "/signup?type=atswa"
    },
    {
      title: "Foundation Level",
      description: "For non-accounting graduates",
      courses: ["Quant Techniques", "Financial Accounting", "Management Info", "Business & Finance", "Business Law"],
      features: ["Study planner", "Beginner tutorials", "Mentor assistant", "Offline support"],
      level: "Foundation",
      duration: "8-12 months",
      route: "/signup?type=foundation"
    },
    {
      title: "Skills Level",
      description: "Advanced accounting and audit skills",
      courses: ["Financial Reporting", "Tax", "Performance Mgmt", "Audit", "Governance & Ethics"],
      features: ["AI feedback", "Mock testing", "Goal planner", "Analytics"],
      level: "Intermediate",
      duration: "12-18 months",
      route: "/signup?type=skills"
    },
    {
      title: "Professional Level",
      description: "Final ICAN professional qualification",
      courses: ["Case Study", "Corporate Reporting", "Strategic Financial Mgmt", "Advanced Audit", "Advanced Tax"],
      features: ["Case simulations", "Writing sessions", "Peer review", "Versioning"],
      level: "Advanced",
      duration: "12-24 months",
      route: "/signup?type=professional"
    }
  ];

  const portals = [
    {
      title: "Mentor Portal",
      description: "Guide and support ICAN candidates",
      features: ["Mentee management", "Progress tracking", "Feedback tools", "Appointment scheduling"],
      icon: Users,
      route: "/login?type=mentor"
    },
    {
      title: "Admin Portal",
      description: "Platform management and oversight",
      features: ["User management", "Content moderation", "Analytics", "Question bank CMS"],
      icon: Shield,
      route: "/login?type=admin"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students", icon: GraduationCap },
    { number: "500+", label: "Certified Mentors", icon: Users },
    { number: "95%", label: "Pass Rate", icon: Award },
    { number: "50,000+", label: "Practice Questions", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
              <span className="ml-2 text-2xl font-bold text-gradient">ExamHack</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => navigate('/login')}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
              <Button 
                className="btn-primary"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="mb-6">
                  <Badge className="bg-white/20 text-white border-white/30 mb-4">
                    SDG 4 - Quality Education
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                    Master ICAN Exams with 
                    <span className="block mt-2">AI-Powered Learning</span>
                  </h1>
                  <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
                    Secure, inclusive, and intelligent digital exam platform designed specifically for ICAN students across all levels.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-white text-[hsl(var(--examhack-blue))] hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                    onClick={() => navigate('/signup')}
                  >
                    Start Learning Today
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[hsl(var(--examhack-blue))] font-semibold px-8 py-4 text-lg"
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Live Proctoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>AI Feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Expert Mentors</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    src={heroStudents}
                    alt="Students learning with ExamHack"
                    className="rounded-lg shadow-2xl animate-float"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[hsl(var(--examhack-blue))]/10 rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[hsl(var(--examhack-blue))] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized study programs designed for each ICAN qualification level, 
              from entry-level ATSWA to professional certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="card-elevated hover:scale-105 transition-transform duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-[hsl(var(--examhack-blue))]/10 text-[hsl(var(--examhack-blue))]">
                      {path.level}
                    </Badge>
                    <span className="text-sm text-gray-500">{path.duration}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{path.title}</CardTitle>
                  <CardDescription className="text-gray-600">{path.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Core Courses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.courses.slice(0, 3).map((course, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{course}</Badge>
                      ))}
                      {path.courses.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{path.courses.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {path.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-[hsl(var(--examhack-green))] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full btn-primary mt-4"
                    onClick={() => navigate(path.route)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Professional Portals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated platforms for mentors and administrators to support student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portals.map((portal, index) => (
              <Card key={index} className="card-elevated hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[hsl(var(--examhack-blue))]/10 rounded-full flex items-center justify-center">
                      <portal.icon className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{portal.title}</CardTitle>
                  <CardDescription className="text-gray-600">{portal.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {portal.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-[hsl(var(--examhack-green))] mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full btn-primary mt-6"
                    onClick={() => navigate(portal.route)}
                  >
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Advanced Learning Features
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the future of education with our cutting-edge platform designed specifically for ICAN exam success.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--examhack-blue))] rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analytics</h3>
                    <p className="text-gray-600">Track your progress with intelligent insights and personalized recommendations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--examhack-green))] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Proctoring</h3>
                    <p className="text-gray-600">Secure exam environment with real-time monitoring and fraud detection.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--examhack-blue))] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Mentorship</h3>
                    <p className="text-gray-600">Connect with certified professionals for personalized guidance and support.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={digitalLearning}
                alt="Digital learning platform"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[hsl(var(--examhack-blue))]/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your ICAN Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful candidates who chose ExamHack for their ICAN exam preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[hsl(var(--examhack-blue))] hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              onClick={() => navigate('/signup')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[hsl(var(--examhack-blue))] font-semibold px-8 py-4 text-lg"
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
              <span className="ml-2 text-2xl font-bold">ExamHack</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering ICAN candidates with AI-driven education technology
            </p>
            <p className="text-sm text-gray-500">
              © 2024 ExamHack. Supporting SDG 4 - Quality Education. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;