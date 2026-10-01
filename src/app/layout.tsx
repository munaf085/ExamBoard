import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | ExamBoard - Java Learning Platform',
    default: 'ExamBoard | Java Placement & Interview Mastery Platform',
  },
  description:
    'Comprehensive, zero-gap technical Java preparation: 37 modules, 77 sub-lessons, 671 hand-crafted coding exercises, JVM interview traps, and full F2F mock interview simulations.',
  keywords: [
    'Java',
    'Interview Preparation',
    'OOP',
    'Spring Boot',
    'Data Structures',
    'Coding Exercises',
    'JVM Internals',
    'Collections',
  ],
  authors: [{ name: 'ExamBoard' }],
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
