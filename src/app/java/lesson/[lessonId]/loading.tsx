export default function LessonLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex animate-pulse">
      {/* Sidebar Skeleton (hidden on small) */}
      <div className="hidden lg:block w-80 bg-slate-800/40 border-r border-slate-700/50 p-4 space-y-4">
        <div className="h-8 w-48 bg-slate-800 rounded-lg" />
        <div className="space-y-2 pt-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-10 bg-slate-800/50 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="h-6 w-32 bg-slate-800 rounded-md" />
        <div className="h-10 w-3/4 bg-slate-800 rounded-xl" />
        <div className="h-12 w-full bg-slate-800/60 rounded-xl" />
        <div className="h-48 bg-slate-800/40 border border-slate-700/40 rounded-2xl" />
        <div className="h-64 bg-slate-800/40 border border-slate-700/40 rounded-2xl" />
      </div>
    </div>
  );
}
