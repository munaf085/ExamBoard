import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import DotNetDashboard from './pages/DotNetDashboard';
import JavaDashboard from './pages/JavaDashboard';
import JavaModulePage from './pages/java/JavaModulePage';
import JavaMCQPage from './pages/java/JavaMCQPage';
import JavaFlashcardsPage from './pages/java/JavaFlashcardsPage';
import JavaMockInterviewPage from './pages/java/JavaMockInterviewPage';
import JavaRevisionPage from './pages/java/JavaRevisionPage';
import JavaSyllabusPage from './pages/java/JavaSyllabusPage';
import JavaSubLessonPage from './pages/java/JavaSubLessonPage';
import TestSelectionPage from './pages/TestSelectionPage';
import TestInstructionsPage from './pages/TestInstructionsPage';
import TestRunnerPage from './pages/TestRunnerPage';
import ResultPage from './pages/ResultPage';
import AnswerReviewPage from './pages/AnswerReviewPage';
import Round2Page from './pages/Round2Page';
import Round3Page from './pages/Round3Page';
import Round4Page from './pages/Round4Page';
import PreparationDashboard from './pages/PreparationDashboard';
import PreviousAttempts from './pages/PreviousAttempts';
import PrepTopics from './pages/PrepTopics';
import MockInterviewMode from './pages/MockInterviewMode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dotnet" element={<DotNetDashboard />} />
        <Route path="/java" element={<JavaDashboard />} />
        
        <Route path="/java/module/:moduleId" element={<JavaModulePage />} />
        <Route path="/java/mcq/:moduleId" element={<JavaMCQPage />} />
        <Route path="/java/flashcards" element={<JavaFlashcardsPage />} />
        <Route path="/java/mock-interview" element={<JavaMockInterviewPage />} />
        <Route path="/java/revision" element={<JavaRevisionPage />} />
        <Route path="/java/syllabus" element={<Navigate to="/java" replace />} />
        <Route path="/java/lesson/:lessonId" element={<JavaSubLessonPage />} />
        
        <Route path="/test-selection" element={<TestSelectionPage />} />
        <Route path="/test-instructions/:paperId" element={<TestInstructionsPage />} />
        <Route path="/test/:paperId" element={<TestRunnerPage />} />
        <Route path="/result/:sessionId" element={<ResultPage />} />
        <Route path="/review/:sessionId" element={<AnswerReviewPage />} />
        <Route path="/round2" element={<Round2Page />} />
        <Route path="/round3" element={<Round3Page />} />
        <Route path="/round4" element={<Round4Page />} />
        <Route path="/dashboard" element={<PreparationDashboard />} />
        <Route path="/attempts" element={<PreviousAttempts />} />
        <Route path="/prep-topics" element={<PrepTopics />} />
        <Route path="/mock-interview" element={<MockInterviewMode />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
