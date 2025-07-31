import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Clock, 
  Shield, 
  Eye, 
  Camera, 
  Mic, 
  Monitor, 
  AlertTriangle,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

const ExamPreparation = () => {
  const navigate = useNavigate();
  const { level } = useParams<{ level: string }>();
  
  const examInfo = {
    atswa: { name: 'ATSWA', duration: '3 hours', questions: 50, passing: '50%' },
    foundation: { name: 'Foundation Level', duration: '3.5 hours', questions: 50, passing: '50%' },
    skills: { name: 'Skills Level', duration: '4 hours', questions: 50, passing: '50%' },
    professional: { name: 'Professional Level', duration: '4.5 hours', questions: 50, passing: '50%' }
  };

  const currentExam = examInfo[level as keyof typeof examInfo] || examInfo.atswa;

  const requirements = [
    { icon: Camera, text: 'Working webcam for facial monitoring', status: 'required' },
    { icon: Mic, text: 'Microphone for audio monitoring', status: 'required' },
    { icon: Monitor, text: 'Stable internet connection', status: 'required' },
    { icon: Shield, text: 'Close all other applications', status: 'warning' },
    { icon: Eye, text: 'Remain visible on camera at all times', status: 'warning' },
    { icon: AlertTriangle, text: 'No unauthorized materials', status: 'critical' }
  ];

  const proctoringFeatures = [
    'Real-time facial recognition and monitoring',
    'Screen sharing and application blocking',
    'Audio detection for suspicious sounds',
    'Eye tracking and gaze monitoring',
    'Keystroke pattern analysis',
    'Browser lockdown and tab restrictions'
  ];

  const handleStartExam = () => {
    navigate(`/exam/live/${level}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
              <span className="ml-2 text-2xl font-bold text-gradient">ExamHack</span>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentExam.name} Exam Preparation
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Please review the requirements and click start when you're ready
          </p>
          <Badge className="bg-[hsl(var(--examhack-blue))]/10 text-[hsl(var(--examhack-blue))] text-lg px-4 py-2">
            Live Proctored Exam
          </Badge>
        </div>

        {/* Exam Details */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Exam Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Duration</h3>
                  <p className="text-gray-600">{currentExam.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Questions</h3>
                  <p className="text-gray-600">{currentExam.questions} questions (40 MCQ + 10 Short Answer)</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Passing Score</h3>
                  <p className="text-gray-600">{currentExam.passing}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Format</h3>
                  <p className="text-gray-600">Computer-based with live proctoring</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Requirements */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              System Requirements Check
            </CardTitle>
            <CardDescription>
              Ensure your system meets all requirements before starting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    req.status === 'required' ? 'bg-green-100' :
                    req.status === 'warning' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    {req.status === 'required' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <req.icon className={`h-5 w-5 ${
                        req.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    )}
                  </div>
                  <span className="text-gray-700">{req.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Proctoring Features */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Live Proctoring Features
            </CardTitle>
            <CardDescription>
              Advanced AI monitoring for exam integrity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {proctoringFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Notice */}
        <Card className="card-elevated bg-yellow-50 border-yellow-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                <p className="text-yellow-800 mb-3">
                  This is a proctored exam. Any suspicious behavior will be flagged and may result in 
                  exam termination. Ensure you're in a quiet, well-lit room with no interruptions.
                </p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Do not leave your seat during the exam</li>
                  <li>• Keep your face visible to the camera at all times</li>
                  <li>• No talking or making noise</li>
                  <li>• No mobile phones or unauthorized materials</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={handleStartExam}
          >
            <Shield className="h-6 w-6 mr-2" />
            Start Proctored Exam
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            By clicking start, you agree to the proctoring terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamPreparation;