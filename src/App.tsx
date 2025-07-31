import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Chatbot } from "@/components/ui/chatbot";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AtswaDashboard from "./pages/dashboards/AtswaDashboard";
import FoundationDashboard from "./pages/dashboards/FoundationDashboard";
import SkillsDashboard from "./pages/dashboards/SkillsDashboard";
import ProfessionalDashboard from "./pages/dashboards/ProfessionalDashboard";
import MentorDashboard from "./pages/dashboards/MentorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ExamPreparation from "./pages/ExamPreparation";
import LiveExam from "./pages/LiveExam";
import ExamSubmission from "./pages/ExamSubmission";
import PracticalExam from "./pages/PracticalExam";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/atswa" element={<AtswaDashboard />} />
            <Route path="/dashboard/foundation" element={<FoundationDashboard />} />
            <Route path="/dashboard/skills" element={<SkillsDashboard />} />
            <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
            <Route path="/dashboard/mentor" element={<MentorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/exam/real/:level" element={<ExamPreparation />} />
            <Route path="/exam/live/:level" element={<LiveExam />} />
            <Route path="/exam/submit/:level" element={<ExamSubmission />} />
            <Route path="/exam/practical/:level" element={<PracticalExam />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
