import { Link } from 'react-router-dom';
import { Layers, Coffee, Code2, ChevronRight, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-blue-900/40 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <LayoutDashboard className="w-4 h-4 mr-2" /> Select Your Preparation Module
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Interview Portal</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Choose your technology stack below to access the dedicated simulator module containing 
          written tests, mock interviews, and topic-wise practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* .NET Module Widget */}
        <Link 
          to="/dotnet"
          className="group relative bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 rounded-3xl p-8 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code2 className="w-32 h-32 text-blue-400" />
          </div>
          
          <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <Code2 className="w-7 h-7 text-blue-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">.NET / C# Track</h2>
          <p className="text-slate-400 mb-8 max-w-sm">
            Master C#, ASP.NET Core, SQL, and OOP fundamentals. Includes 4 realistic mock rounds and 240+ written questions.
          </p>
          
          <div className="mt-auto flex items-center text-blue-400 font-semibold group-hover:text-blue-300">
            Open Module <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Java Module Widget */}
        <Link 
          to="/java"
          className="group relative bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 rounded-3xl p-8 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coffee className="w-32 h-32 text-emerald-400" />
          </div>

          <div className="w-14 h-14 bg-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
            <Coffee className="w-7 h-7 text-emerald-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Java Track</h2>
          <p className="text-slate-400 mb-8 max-w-sm">
            Master Core Java, Spring Boot, JVM memory, and enterprise architecture. (Topic wise prep loaded).
          </p>
          
          <div className="mt-auto flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300">
            Open Module <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="mt-16 flex items-center gap-2 text-slate-500 text-sm">
        <Layers className="w-4 h-4" />
        <span>Modular Architecture enabled</span>
      </div>
    </div>
  );
}


