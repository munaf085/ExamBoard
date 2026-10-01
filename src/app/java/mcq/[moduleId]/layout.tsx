import type { Metadata } from 'next';

const MODULE_TITLES: Record<string, string> = {
  'java-fundamentals': 'Java Fundamentals',
  'java-data-types': 'Data Types & Variables',
  'java-operators': 'Operators',
  'java-control-flow': 'Decision Making & Branching',
  'java-loops': 'Loops & Iterations',
  'java-strings': 'Strings',
  'java-arrays': 'Arrays',
  'java-methods': 'Methods & Recursion',
  'java-oop-basics': 'OOP Basics',
  'java-inheritance': 'Inheritance',
  'java-abstraction': 'Abstraction & Interfaces',
  'java-exceptions': 'Exception Handling',
  'java-collections': 'Collections',
  'java-streams': 'Streams & Lambdas',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const title = MODULE_TITLES[moduleId] || moduleId.replace(/-/g, ' ');
  return {
    title: `${title} MCQs`,
    description: `Test your understanding of ${title} with interactive multiple choice questions and instant explanations.`,
  };
}

export default function MCQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
