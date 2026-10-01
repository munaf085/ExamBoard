import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Revision & JVM Traps',
  description: 'Quick revision sheets, concept comparison matrices, and tricky JVM traps for technical Java interviews.',
};

export default function RevisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
