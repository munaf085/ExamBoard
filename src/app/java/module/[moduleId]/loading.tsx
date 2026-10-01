export default function ModuleLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="h-6 w-36 bg-slate-800 rounded-lg mb-6" />
        <div className="h-12 w-3/4 bg-slate-800 rounded-xl" />
        <div className="h-5 w-1/2 bg-slate-800/60 rounded-lg mb-8" />

        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-slate-800/60 border border-slate-700/50 rounded-xl p-5" />
          ))}
        </div>
      </div>
    </div>
  );
}
