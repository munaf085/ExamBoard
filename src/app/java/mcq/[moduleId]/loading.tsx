export default function McqLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8 flex items-center justify-center animate-pulse">
      <div className="max-w-3xl w-full bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="h-6 w-40 bg-slate-700/60 rounded-lg" />
        <div className="h-10 w-5/6 bg-slate-700 rounded-xl" />
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 bg-slate-700/40 border border-slate-600/30 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
