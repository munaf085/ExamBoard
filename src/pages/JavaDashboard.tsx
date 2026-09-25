import { Link } from 'react-router-dom';
import { Coffee, ChevronRight, Construction } from 'lucide-react';

export default function JavaDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Modules
        </Link>
        
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Coffee className="w-4 h-4 mr-2" /> Java Developer Track
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Java Interview Simulator
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Dedicated practice modules for Core Java, Spring Boot, Microservices, and JVM internals.
          </p>

          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center max-w-3xl mx-auto">
            <Construction className="w-16 h-16 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Content Under Construction</h3>
            <p className="text-slate-400 max-w-md">
              We are currently building the Java-specific question banks, mock interview rounds, and Spring Boot assignments. 
              Please check back later!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
