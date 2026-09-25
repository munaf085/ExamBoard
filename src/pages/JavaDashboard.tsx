import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Layers, Package, Zap, Leaf, Database, 
  Coffee, Calculator, GitBranch, Repeat, Type, List, Shield, AlertTriangle, Box, Wind, Cpu, Server, Globe, HardDrive,
  PlayCircle, HelpCircle, CheckCircle, Clock, ChevronDown, ChevronUp, BookMarked, BrainCircuit, Target, Award
} from 'lucide-react';
import { JAVA_MODULES, JAVA_SECTIONS } from '../data/java/curriculum';
import { getJavaProgress } from '../utils/javaStorage';
import { JavaProgress, JavaModule } from '../types';

const ICON_MAP: Record<string, React.FC<any>> = {
  BookOpen, Layers, Package, Zap, Leaf, Database,
  Coffee, Calculator, GitBranch, Repeat, Type, List, Shield, AlertTriangle, Box, Wind, Cpu, Server, Globe, HardDrive
};

export default function JavaDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<JavaProgress | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    JAVA_SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );

  useEffect(() => {
    setProgress(getJavaProgress());
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  if (!progress) return null;

  const totalModules = JAVA_MODULES.length;
  // A module is considered completed if all its lessons are completed (for simplicity, here we just say if all its lessons are in lessonsCompleted).
  // But we don't have lessons here, just module ids. Let's just calculate lessons done vs total lessons across all modules.
  const totalLessons = JAVA_MODULES.reduce((sum, mod) => sum + mod.lessonCount, 0);
  const lessonsDone = progress.lessonsCompleted.length;
  
  // Actually, we'll consider a module "completed" if it's in strongModules, or if the user has completed enough lessons? The prompt didn't specify exactly.
  // We'll calculate "MCQs Done" as Object.keys(progress.mcqResults).length
  const mcqsDone = Object.keys(progress.mcqResults).length;
  const modulesCompleted = progress.strongModules.length; // Just an approximation for stats

  const getModuleProgress = (mod: JavaModule) => {
    if (progress.lessonsCompleted.includes(mod.id)) return 100;
    if (progress.strongModules.includes(mod.id)) return 100;
    if (progress.weakModules.includes(mod.id)) return 50;
    return 0;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Modules
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Coffee className="w-8 h-8 text-orange-500" />
              Java Developer Interview Portal
            </h1>
          </div>
          <Link
            to="/java/syllabus"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg border border-emerald-400/30 transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>📋 View Full Syllabus (One Page)</span>
          </Link>
        </header>

        {/* Full Syllabus Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-800 to-slate-800 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">Complete 34-Module Zero-Gap Java Syllabus</h3>
              <p className="text-xs text-slate-400">Search topics, track preparation checklist, and export or print as PDF.</p>
            </div>
          </div>
          <Link
            to="/java/syllabus"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all flex-shrink-0"
          >
            <span>Open Syllabus Page</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg">
            <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Modules Completed</p>
              <p className="text-2xl font-bold text-white">{modulesCompleted}<span className="text-sm text-slate-500 font-normal"> / {totalModules}</span></p>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg">
            <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">MCQs Attempted</p>
              <p className="text-2xl font-bold text-white">{mcqsDone}</p>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg">
            <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Lessons Done</p>
              <p className="text-2xl font-bold text-white">{lessonsDone}<span className="text-sm text-slate-500 font-normal"> / {totalLessons}</span></p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/java/mcq/java-fundamentals" className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl transition-all shadow-md group">
            <HelpCircle className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-200">MCQ Practice</span>
          </Link>
          <Link to="/java/mock-interview" className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl transition-all shadow-md group">
            <BrainCircuit className="w-8 h-8 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-200">Mock Interview</span>
          </Link>
          <Link to="/java/revision" className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl transition-all shadow-md group">
            <Target className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-200">Revision Mode</span>
          </Link>
          <Link to="/java/flashcards" className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl transition-all shadow-md group">
            <Award className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-200">Flashcards</span>
          </Link>
        </div>

        {/* Curriculum Sections */}
        <div className="space-y-6">
          {JAVA_SECTIONS.map(section => {
            const sectionModules = JAVA_MODULES.filter(m => m.section === section.id);
            const isExpanded = expandedSections[section.id];
            const SectionIcon = ICON_MAP[section.icon] || BookOpen;

            return (
              <div key={section.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <SectionIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-white">{section.label}</h2>
                    <span className="text-sm font-medium text-slate-400 bg-slate-900 px-2 py-1 rounded-full">
                      {sectionModules.length} Modules
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectionModules.map(mod => {
                      const ModIcon = ICON_MAP[mod.icon] || BookOpen;
                      const modProgress = getModuleProgress(mod);
                      
                      return (
                        <div key={mod.id} className="bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl p-5 flex flex-col h-full transition-all shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <ModIcon className="w-6 h-6 text-slate-400" />
                              <h3 className="font-bold text-lg text-slate-100">{mod.title}</h3>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                              mod.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                              mod.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {mod.difficulty}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-400 mb-4 flex-grow line-clamp-2">
                            {mod.description}
                          </p>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
                                <span>Progress</span>
                                <span>{modProgress}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-500"
                                  style={{ width: `${modProgress}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-medium">
                              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> {mod.lessonCount} Lessons</span>
                              <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3"/> {mod.mcqCount} MCQs</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {mod.estimatedMinutes}m</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                              <Link 
                                to={`/java/module/${mod.id}`}
                                className="text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition-colors block"
                              >
                                Learn
                              </Link>
                              <Link 
                                to={`/java/mcq/${mod.id}`}
                                className="text-center bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg text-sm transition-colors block"
                              >
                                Practice MCQ
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
