import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm CANI, your AI assistant for ExamHack. I can help you with ICAN exam preparation, study materials, and platform navigation. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "I can help you prepare for ICAN exams! We offer mock tests, practice questions, and live proctoring for official exams. Which level are you preparing for - ATSWA, Foundation, Skills, or Professional?";
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('material')) {
      return "Our study materials include video tutorials, downloadable notes, and interactive quizzes. You can access them offline too! Would you like me to guide you to your study dashboard?";
    }
    
    if (lowerMessage.includes('mentor')) {
      return "Great! Our mentorship program connects you with AATWA-certified professionals. They can provide personalized feedback and guidance. Would you like to browse available mentors?";
    }
    
    if (lowerMessage.includes('login') || lowerMessage.includes('signup') || lowerMessage.includes('account')) {
      return "To access your personalized dashboard, click 'Get Started' to sign up or 'Sign In' if you already have an account. Each learning path has its own customized experience!";
    }
    
    if (lowerMessage.includes('level') || lowerMessage.includes('course')) {
      return "ExamHack supports all ICAN levels:\n• ATSWA (ATS 1-3): Basic Accounting, Business Law, etc.\n• Foundation: Quant Techniques, Financial Accounting, etc.\n• Skills: Financial Reporting, Tax, Performance Management, etc.\n• Professional: Case Studies, Corporate Reporting, etc.\n\nWhich level interests you?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I'm here to help! You can ask me about:\n• Exam preparation and schedules\n• Study materials and courses\n• Mentorship programs\n• Platform navigation\n• Account setup\n• Technical support\n\nWhat specific help do you need?";
    }
    
    return "That's a great question! I'm here to help with your ICAN exam preparation journey. Feel free to ask me about study materials, exams, mentorship, or anything else related to ExamHack!";
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'hidden' : 'flex'} btn-primary rounded-full w-14 h-14 items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200 mb-4">
          {/* Header */}
          <div className="gradient-hero text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">CANI</h3>
                <p className="text-xs opacity-90">AI Assistant</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-[hsl(var(--examhack-blue))] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask CANI anything..."
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className="btn-primary px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask CANI anything about ExamHack!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};