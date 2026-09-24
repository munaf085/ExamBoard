import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
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
