import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getDetailedLesson, getAdjacentLessons } from '@/data/java/detailedLessons';
import LessonWorkspaceClient from './LessonWorkspaceClient';
import LessonLoading from './loading';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getDetailedLesson(lessonId);
  if (!lesson) {
    return {
      title: 'Lesson Not Found | ExamBoard',
    };
  }
  return {
    title: `${lesson.title} - Java Mastery | ExamBoard`,
    description: lesson.subtitle || lesson.beginnerAnalogy?.slice(0, 160) || 'Interactive Java programming lesson on ExamBoard.',
  };
}

export default async function JavaSubLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getDetailedLesson(lessonId);
  if (!lesson) {
    notFound();
  }
  const adjacent = getAdjacentLessons(lesson.id);

  return (
    <Suspense fallback={<LessonLoading />}>
      <LessonWorkspaceClient
        initialLesson={lesson}
        adjacent={adjacent}
      />
    </Suspense>
  );
}
