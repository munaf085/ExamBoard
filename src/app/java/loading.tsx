export default function JavaDashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="h-10 w-64 bg-slate-800 rounded-xl mb-4" />
        <div className="h-5 w-96 bg-slate-800/60 rounded-lg mb-8" />

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-800/70 border border-slate-700/60 rounded-xl p-4" />
          ))}
        </div>

        {/* Section Tabs Skeleton */}
        <div className="h-12 w-full bg-slate-800/50 rounded-xl" />

        {/* Module Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6" />
          ))}
        </div>
      </div>
    </div>
  );
}
