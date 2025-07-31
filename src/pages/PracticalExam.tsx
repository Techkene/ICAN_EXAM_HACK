import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Clock, 
  Calculator,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Download
} from 'lucide-react';

const PracticalExam = () => {
  const navigate = useNavigate();
  const { level } = useParams<{ level: string }>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const examContent = {
    atswa: {
      name: 'ATSWA',
      duration: '2 hours',
      questions: [
        'Basic Journal Entries (20 marks): Record the following transactions in proper journal format with narrations.',
        'Trial Balance Preparation (15 marks): Prepare a trial balance from the given ledger balances.',
        'Bank Reconciliation (15 marks): Reconcile the bank statement with the cash book.'
      ],
      instructions: [
        'Show all workings clearly',
        'Use proper accounting formats',
        'Round amounts to the nearest Naira',
        'Clearly label each section of your answer'
      ]
    },
    foundation: {
      name: 'Foundation Level',
      duration: '2.5 hours',
      questions: [
        'Financial Statement Preparation (25 marks): Prepare Income Statement and Balance Sheet from trial balance.',
        'Cost Calculation (15 marks): Calculate unit costs using different costing methods.',
        'Ratio Analysis (10 marks): Calculate and interpret key financial ratios.'
      ],
      instructions: [
        'Follow IFRS guidelines where applicable',
        'Show detailed calculations',
        'Provide brief explanations for ratio interpretations',
        'Use standard financial statement formats'
      ]
    },
    skills: {
      name: 'Skills Level',
      duration: '3 hours',
      questions: [
        'Advanced Financial Reporting (30 marks): Prepare consolidated financial statements.',
        'Management Accounting (25 marks): Prepare budgets and variance analysis.',
        'Audit Procedures (15 marks): Design audit procedures for given risk areas.'
      ],
      instructions: [
        'Apply advanced accounting standards',
        'Show detailed variance calculations',
        'Justify audit procedure selection',
        'Consider materiality in your responses'
      ]
    },
    professional: {
      name: 'Professional Level',
      duration: '3.5 hours',
      questions: [
        'Complex Business Case (40 marks): Analyze and provide strategic recommendations.',
        'Advanced Tax Planning (30 marks): Prepare tax strategies for corporate restructuring.',
        'Professional Ethics (10 marks): Analyze ethical dilemmas and provide solutions.'
      ],
      instructions: [
        'Demonstrate strategic thinking',
        'Apply professional judgment',
        'Consider stakeholder impacts',
        'Provide well-reasoned recommendations'
      ]
    }
  };

  const currentExam = examContent[level as keyof typeof examContent] || examContent.atswa;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleFinalSubmission = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file before submitting.');
      return;
    }
    if (!confirmed) {
      alert('Please confirm that you have completed all questions.');
      return;
    }
    
    // Navigate to completion page
    navigate(`/exam/complete/${level}`);
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
              <Badge className="ml-4 bg-green-100 text-green-700">
                Practical Section
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{currentExam.duration} Duration</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cue Card */}
        <Card className="card-elevated mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-7 w-7" />
              {currentExam.name} Practical Examination Cue Card
            </CardTitle>
            <CardDescription className="text-lg">
              Duration: {currentExam.duration} | Total Marks: 80
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Questions to Answer:</h3>
                <div className="space-y-3">
                  {currentExam.questions.map((question, index) => (
                    <div key={index} className="p-4 border-l-4 border-[hsl(var(--examhack-blue))] bg-blue-50">
                      <p className="text-gray-800">
                        <span className="font-semibold">Question {index + 1}:</span> {question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">General Instructions:</h3>
                <ul className="space-y-2">
                  {currentExam.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Alert>
                <Calculator className="h-4 w-4" />
                <AlertDescription>
                  <strong>Permitted Materials:</strong> Calculator, rough sheets, writing materials. 
                  Upload your working papers, final answers, and any supporting calculations below.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6" />
              Upload Your Solutions
            </CardTitle>
            <CardDescription>
              Upload your answer sheets, working papers, and calculations. Accepted formats: PDF, JPG, PNG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[hsl(var(--examhack-blue))] transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span className="text-gray-900">{file.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="confirm-completion"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="confirm-completion" className="text-sm text-yellow-800 cursor-pointer">
                    <strong>I confirm that:</strong> I have completed all required questions, 
                    uploaded all necessary working papers and final answers, and understand 
                    that this submission is final and cannot be changed.
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={handleFinalSubmission}
            disabled={uploadedFiles.length === 0 || !confirmed}
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            Submit Final Examination
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            This action cannot be undone. Please ensure all files are uploaded correctly.
          </p>
        </div>

        {/* Help Section */}
        <Card className="card-elevated mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-3">
                  If you experience technical difficulties with file uploads or have questions 
                  about the examination format, contact our support team immediately.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticalExam;