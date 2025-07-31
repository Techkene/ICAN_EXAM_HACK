import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Upload,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

const ExamSubmission = () => {
  const navigate = useNavigate();
  const { level } = useParams<{ level: string }>();
  const location = useLocation();
  const { answers, questions } = location.state || {};

  const examInfo = {
    atswa: { name: 'ATSWA', practicalDuration: '2 hours' },
    foundation: { name: 'Foundation Level', practicalDuration: '2.5 hours' },
    skills: { name: 'Skills Level', practicalDuration: '3 hours' },
    professional: { name: 'Professional Level', practicalDuration: '3.5 hours' }
  };

  const currentExam = examInfo[level as keyof typeof examInfo] || examInfo.atswa;

  const handleProceedToPractical = () => {
    navigate(`/exam/practical/${level}`);
  };

  const answeredQuestions = answers ? Object.keys(answers).length : 0;
  const totalQuestions = questions ? questions.length : 50;

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
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Submission Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your {currentExam.name} theory examination has been submitted successfully.
          </p>
          <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
            Theory Section Complete
          </Badge>
        </div>

        {/* Submission Summary */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Submission Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(var(--examhack-blue))] mb-2">
                  {answeredQuestions}
                </div>
                <p className="text-gray-600">Questions Answered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(var(--examhack-blue))] mb-2">
                  {totalQuestions}
                </div>
                <p className="text-gray-600">Total Questions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(var(--examhack-blue))] mb-2">
                  {Math.round((answeredQuestions / totalQuestions) * 100)}%
                </div>
                <p className="text-gray-600">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Next: Practical Examination
            </CardTitle>
            <CardDescription>
              Proceed to the practical accounting questions section
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Practical Section Details</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Duration: {currentExam.practicalDuration}</li>
                  <li>• Format: Accounting problems and case studies</li>
                  <li>• File uploads required for working papers</li>
                  <li>• Calculation sheets and journal entries</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-1">Important Reminder</h3>
                    <p className="text-yellow-800 text-sm">
                      Ensure you have your calculator, rough sheets, and any permitted materials 
                      ready before proceeding to the practical section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={handleProceedToPractical}
          >
            <Upload className="h-6 w-6 mr-2" />
            Proceed to Practical Questions
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            You will receive your cue card with detailed instructions on the next page
          </p>
        </div>

        {/* Results Information */}
        <Card className="card-elevated mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Results Timeline</h3>
            <p className="text-gray-600 mb-4">
              Your theory section results will be processed within 24-48 hours after completing 
              the entire examination (theory + practical).
            </p>
            <div className="text-sm text-gray-500">
              Results will be available on your dashboard once marking is complete.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamSubmission;