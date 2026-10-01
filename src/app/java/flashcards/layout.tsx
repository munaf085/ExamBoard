import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Java Flashcards',
  description: 'Interactive flashcards covering core Java concepts, JVM architecture, concurrency, collections, and frameworks.',
};

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
