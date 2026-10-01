import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { JAVA_MODULES } from '@/data/java/curriculum';
import { getSublessonSummariesForModule } from '@/lib/curriculum/sublessonManifest';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const moduleInfo = JAVA_MODULES.find(
    m => m.id === moduleId || m.id.toLowerCase() === moduleId.toLowerCase()
  );
  if (!moduleInfo) {
    return {
      title: 'Module Not Found | ExamBoard',
    };
  }
  return {
    title: `${moduleInfo.title} | Java Mastery - ExamBoard`,
    description: moduleInfo.description || `Master ${moduleInfo.title} with structured lessons and coding exercises on ExamBoard.`,
  };
}

export default async function JavaModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const moduleInfo = JAVA_MODULES.find(
    m => m.id === moduleId || m.id.toLowerCase() === moduleId.toLowerCase()
  );

  if (!moduleInfo) {
    notFound();
  }

  const subLessons = getSublessonSummariesForModule(moduleInfo.id);
  if (subLessons && subLessons.length > 0) {
    redirect(`/java/lesson/${subLessons[0].id}`);
  }

  redirect('/java');
}
