import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mock Interview Simulator',
  description: 'Full-spectrum technical interview preparation with realistic Java questions, sample answers, and evaluation rubrics.',
};

export default function MockInterviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
