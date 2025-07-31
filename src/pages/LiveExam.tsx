import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useParams } from 'react-router-dom';
import { ProctoringSystem } from '@/components/proctoring/ProctoringSystem';
import { supabase, saveExamAttempt, trackUserActivity } from '@/lib/supabase';
import { Chatbot } from '@/components/ui/chatbot';
import { 
  Clock, 
  Camera, 
  Shield, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Radio
} from 'lucide-react';

interface Question {
  id: number;
  type: 'mcq' | 'short_answer';
  question: string;
  options?: string[];
  answer?: string;
}

const LiveExam = () => {
  const navigate = useNavigate();
  const { level } = useParams<{ level: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds
  const [proctoringData, setProctoringData] = useState<any>({});
  const [examStartTime] = useState(new Date());

  const questions: Question[] = [
    // MCQ Questions (40)
    { id: 1, type: 'mcq', question: 'Which of the following is NOT a fundamental accounting principle?', options: ['Revenue Recognition', 'Matching Principle', 'Conservatism', 'Speculation Principle'] },
    { id: 2, type: 'mcq', question: 'The accounting equation is:', options: ['Assets = Liabilities + Equity', 'Assets = Liabilities - Equity', 'Assets + Liabilities = Equity', 'Assets - Liabilities = Equity'] },
    { id: 3, type: 'mcq', question: 'Double-entry bookkeeping means:', options: ['Recording transactions twice', 'Every debit has a corresponding credit', 'Using two different books', 'Recording in two currencies'] },
    { id: 4, type: 'mcq', question: 'Which financial statement shows the financial position at a specific date?', options: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Statement of Equity'] },
    { id: 5, type: 'mcq', question: 'Depreciation is:', options: ['Loss in market value', 'Allocation of cost over useful life', 'Cash outflow', 'Increase in asset value'] },
    { id: 6, type: 'mcq', question: 'Current assets are expected to be converted to cash within:', options: ['One month', 'Six months', 'One year', 'Two years'] },
    { id: 7, type: 'mcq', question: 'The gross profit is calculated as:', options: ['Revenue - Expenses', 'Revenue - Cost of Goods Sold', 'Revenue - Operating Expenses', 'Revenue - Total Expenses'] },
    { id: 8, type: 'mcq', question: 'Accounts receivable represents:', options: ['Money owed by the company', 'Money owed to the company', 'Cash in bank', 'Inventory value'] },
    { id: 9, type: 'mcq', question: 'The normal balance of liability accounts is:', options: ['Debit', 'Credit', 'Zero', 'Either debit or credit'] },
    { id: 10, type: 'mcq', question: 'Working capital is calculated as:', options: ['Current Assets - Current Liabilities', 'Total Assets - Total Liabilities', 'Revenue - Expenses', 'Cash - Debt'] },
    { id: 11, type: 'mcq', question: 'Which method values inventory at the lower of cost or net realizable value?', options: ['FIFO', 'LIFO', 'Weighted Average', 'All of the above'] },
    { id: 12, type: 'mcq', question: 'Goodwill is considered a(n):', options: ['Current Asset', 'Fixed Asset', 'Intangible Asset', 'Liability'] },
    { id: 13, type: 'mcq', question: 'The debt-to-equity ratio measures:', options: ['Profitability', 'Liquidity', 'Leverage', 'Efficiency'] },
    { id: 14, type: 'mcq', question: 'Prepaid expenses are classified as:', options: ['Liabilities', 'Expenses', 'Assets', 'Equity'] },
    { id: 15, type: 'mcq', question: 'The matching principle requires:', options: ['Matching debits with credits', 'Matching revenues with related expenses', 'Matching assets with liabilities', 'Matching current with non-current items'] },
    { id: 16, type: 'mcq', question: 'Internal controls are designed to:', options: ['Increase profits', 'Prevent fraud and errors', 'Reduce taxes', 'Improve efficiency only'] },
    { id: 17, type: 'mcq', question: 'The audit trail provides:', options: ['Proof of ownership', 'Documentation of transactions', 'Market values', 'Future projections'] },
    { id: 18, type: 'mcq', question: 'Petty cash is used for:', options: ['Large purchases', 'Small, routine expenses', 'Payroll', 'Long-term investments'] },
    { id: 19, type: 'mcq', question: 'The accounting period concept assumes:', options: ['Business will continue indefinitely', 'Financial statements are prepared periodically', 'Money has stable value', 'All transactions are recorded'] },
    { id: 20, type: 'mcq', question: 'Cost accounting focuses on:', options: ['External reporting', 'Tax compliance', 'Internal decision making', 'Audit requirements'] },
    { id: 21, type: 'mcq', question: 'Variable costs change with:', options: ['Time', 'Production volume', 'Fixed costs', 'Market conditions'] },
    { id: 22, type: 'mcq', question: 'Break-even point is where:', options: ['Profit is maximized', 'Total revenue equals total costs', 'Variable costs equal fixed costs', 'Cash flow is positive'] },
    { id: 23, type: 'mcq', question: 'Standard costing is used for:', options: ['External reporting', 'Performance evaluation', 'Tax purposes', 'Cash management'] },
    { id: 24, type: 'mcq', question: 'Activity-based costing allocates costs based on:', options: ['Direct labor hours', 'Machine hours', 'Activities that drive costs', 'Square footage'] },
    { id: 25, type: 'mcq', question: 'The contribution margin is:', options: ['Sales - Variable costs', 'Sales - Fixed costs', 'Sales - Total costs', 'Gross profit - Operating expenses'] },
    { id: 26, type: 'mcq', question: 'Capital budgeting involves:', options: ['Short-term planning', 'Long-term investment decisions', 'Working capital management', 'Dividend policy'] },
    { id: 27, type: 'mcq', question: 'The time value of money concept states that:', options: ['Money loses value over time', 'A dollar today is worth more than a dollar tomorrow', 'Interest rates are always positive', 'Inflation is constant'] },
    { id: 28, type: 'mcq', question: 'Net present value (NPV) considers:', options: ['Only initial investment', 'Only future cash flows', 'Time value of money', 'Accounting profits'] },
    { id: 29, type: 'mcq', question: 'The payback period is the time required to:', options: ['Maximize profit', 'Recover initial investment', 'Reach break-even', 'Double the investment'] },
    { id: 30, type: 'mcq', question: 'Risk assessment in auditing involves:', options: ['Calculating financial ratios', 'Evaluating likelihood of misstatement', 'Determining audit fees', 'Selecting audit team'] },
    { id: 31, type: 'mcq', question: 'Substantive procedures are designed to:', options: ['Test internal controls', 'Detect material misstatements', 'Evaluate audit risk', 'Plan audit procedures'] },
    { id: 32, type: 'mcq', question: 'The audit opinion provides:', options: ['Absolute assurance', 'Reasonable assurance', 'No assurance', 'Limited assurance'] },
    { id: 33, type: 'mcq', question: 'Materiality in auditing refers to:', options: ['Physical assets only', 'Significance of misstatements', 'Audit procedures', 'Audit evidence'] },
    { id: 34, type: 'mcq', question: 'Independence in auditing means:', options: ['Physical separation', 'Mental attitude and appearance', 'Financial independence only', 'Professional competence'] },
    { id: 35, type: 'mcq', question: 'Income tax is calculated on:', options: ['Gross revenue', 'Accounting profit', 'Taxable income', 'Cash receipts'] },
    { id: 36, type: 'mcq', question: 'Value Added Tax (VAT) is:', options: ['Direct tax', 'Indirect tax', 'Withholding tax', 'Capital gains tax'] },
    { id: 37, type: 'mcq', question: 'Tax planning involves:', options: ['Tax evasion', 'Legal optimization of tax liability', 'Ignoring tax laws', 'Delaying tax payments'] },
    { id: 38, type: 'mcq', question: 'Deferred tax arises from:', options: ['Permanent differences', 'Temporary differences', 'Tax rate changes', 'Audit adjustments'] },
    { id: 39, type: 'mcq', question: 'Corporate governance ensures:', options: ['Maximum profits', 'Accountability and transparency', 'Tax optimization', 'Employee satisfaction'] },
    { id: 40, type: 'mcq', question: 'Ethics in accounting requires:', options: ['Profit maximization', 'Honesty and integrity', 'Cost minimization', 'Revenue recognition'] },

    // Short Answer Questions (10)
    { id: 41, type: 'short_answer', question: 'Explain the difference between cash accounting and accrual accounting. Provide one example for each method.' },
    { id: 42, type: 'short_answer', question: 'Describe the four main types of financial statements and briefly explain what information each provides.' },
    { id: 43, type: 'short_answer', question: 'What is depreciation? Explain two different methods of calculating depreciation and when each might be used.' },
    { id: 44, type: 'short_answer', question: 'Define internal controls and explain why they are important for an organization. Provide three examples of internal controls.' },
    { id: 45, type: 'short_answer', question: 'Explain the concept of materiality in auditing and how it affects audit procedures and reporting.' },
    { id: 46, type: 'short_answer', question: 'What is cost-volume-profit analysis? Explain how it can be used in business decision making.' },
    { id: 47, type: 'short_answer', question: 'Describe the difference between fixed costs and variable costs. Provide examples of each type of cost.' },
    { id: 48, type: 'short_answer', question: 'Explain the time value of money concept and why it is important in financial decision making.' },
    { id: 49, type: 'short_answer', question: 'What are the key principles of professional ethics for accountants? Explain why each is important.' },
    { id: 50, type: 'short_answer', question: 'Describe the role of corporate governance in protecting stakeholder interests. Provide specific examples.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = async () => {
    const timeTaken = Math.round((new Date().getTime() - examStartTime.getTime()) / (1000 * 60));
    const score = calculateScore();
    
    await saveExamAttempt({
      examType: 'live_exam',
      level: level || 'foundation',
      score,
      totalQuestions: questions.length,
      timeTaken,
      completionStatus: 'completed',
      answers,
      proctoringData
    });

    trackUserActivity('exam_complete', { score, timeTaken, level });
    navigate(`/exam/submit/${level}`, { state: { answers, questions, score } });
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      if (question.type === 'mcq' && answer) correct++;
      if (question.type === 'short_answer' && answer && answer.length > 10) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Proctoring Header */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">LIVE PROCTORING ACTIVE</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-green-200">
                <Camera className="h-4 w-4" />
                Camera: Active
              </div>
              <div className="flex items-center gap-1 text-green-200">
                <Eye className="h-4 w-4" />
                Focus: Maintained
              </div>
              <div className="flex items-center gap-1 text-green-200">
                <Shield className="h-4 w-4" />
                Screen: Secure
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[hsl(var(--examhack-blue))]" />
              <span className="ml-2 text-2xl font-bold text-gradient">ExamHack</span>
              <Badge className="ml-4 bg-blue-100 text-blue-700">
                {level?.toUpperCase()} Exam
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleSubmitExam}
              >
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="card-elevated mb-6">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Badge className={`${currentQ.type === 'mcq' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {currentQ.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
              </Badge>
              <span className="text-sm text-gray-500">Question {currentQ.id}</span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            {currentQ.type === 'mcq' ? (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label key={index} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="text-[hsl(var(--examhack-blue))]"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[200px] text-base"
                  maxLength={1000}
                />
                <div className="mt-2 text-sm text-gray-500">
                  {(answers[currentQuestion] || '').length}/1000 characters
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {Object.keys(answers).length} of {questions.length} answered
            </span>
          </div>

          {currentQuestion === questions.length - 1 ? (
            <Button 
              onClick={handleSubmitExam}
              className="btn-primary"
            >
              Submit Exam
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="btn-primary"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Compact Proctoring System */}
      <div className="fixed top-20 right-4 z-40">
        <ProctoringSystem 
          isActive={true} 
          onProctoringData={(data) => setProctoringData(data)}
        />
      </div>
      
      <Chatbot />
    </div>
  );
};

export default LiveExam;