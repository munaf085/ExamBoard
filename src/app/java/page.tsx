import type { Metadata } from 'next';
import JavaDashboardClient from './JavaDashboardClient';

export const metadata: Metadata = {
  title: 'Java Learning & Interview Preparation | ExamBoard',
  description: 'Self-paced Java learning with structured lessons, coding practice, MCQs, interview questions, revision and mock interviews.',
};

export default function JavaDashboardPage() {
  return <JavaDashboardClient />;
}
