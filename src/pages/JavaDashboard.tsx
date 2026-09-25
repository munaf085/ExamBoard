import { Link } from 'react-router-dom';
import {
  BookOpen, Code2, Database, Users, Trophy,
  BarChart3, Layers, ChevronRight
} from 'lucide-react';

export default function JavaDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Modules
        </Link>
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-900/40 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Prepare for your Atyati Technologies Interview
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            4 Rounds. 240 Questions. Full Simulation.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Practice with realistic mock papers, timed written tests, technical interview simulations,
            and HR round preparation — all in one place.
          </p>
        </div>

        {/* Round Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <RoundCard
            round={1}
            title="Written Test"
            subtitle="Technology + Aptitude"
            icon={<BookOpen className="w-6 h-6" />}
            color="blue"
            details={["40 Questions", "60 Minutes", "6 Mock Papers"]}
            href="/test-selection"
            buttonText="Start Written Test"
          />
          <RoundCard
            round={2}
            title="Technical Interview 1"
            subtitle="Java + OOP + DSA"
            icon={<Code2 className="w-6 h-6" />}
            color="purple"
            details={["50+ Questions", "Interviewer Mode", "Manual Scoring"]}
            href="/round2"
            buttonText="Start Round 2"
          />
          <RoundCard
            round={3}
            title="Technical Interview 2"
            subtitle="SQL + Java + Web API"
            icon={<Database className="w-6 h-6" />}
            color="emerald"
            details={["50+ Questions", "SQL Practice", "Follow-ups"]}
            href="/round3"
            buttonText="Start Round 3"
          />
          <RoundCard
            round={4}
            title="HR Interview"
            subtitle="Communication + Behaviour"
            icon={<Users className="w-6 h-6" />}
            color="amber"
            details={["30 Questions", "All Categories", "Interviewer Notes"]}
            href="/round4"
            buttonText="Start HR Round"
          />
        </div>

        {/* Topic-Wise Java Practice */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Topic-Wise Java Practice</h3>
            <span className="text-xs bg-blue-900/50 text-blue-300 border border-blue-700/40 px-2 py-0.5 rounded-full font-medium">40 Qs Each</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TopicCard
              href="/test-instructions/topic-java-basics"
              label="Java Basics & Types"
              desc="Data types · Strings · Arrays · ref/out · Enums"
              color="blue"
            />
            <TopicCard
              href="/test-instructions/topic-java-oop"
              label="Spring Boot Deep Dive"
              desc="Inheritance · Polymorphism · Interfaces · Abstraction"
              color="purple"
            />
            <TopicCard
              href="/test-instructions/topic-java-adv"
              label="Advanced Java & Memory"
              desc="Delegates · LINQ · async/await · Garbage Collection"
              color="emerald"
            />
          </div>
        </div>

        {/* Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <ActionTile
            href="/mock-interview"
            icon={<Layers className="w-5 h-5 text-pink-400" />}
            title="Mock Interview Mode"
            desc="Full 4-round simulation in sequence"
            bgClass="bg-pink-900/20 border-pink-700/30 hover:border-pink-500/50"
          />
          <ActionTile
            href="/attempts"
            icon={<Trophy className="w-5 h-5 text-yellow-400" />}
            title="Previous Attempts"
            desc="Review past test results and scores"
            bgClass="bg-yellow-900/20 border-yellow-700/30 hover:border-yellow-500/50"
          />
          <ActionTile
            href="/prep-topics"
            icon={<BarChart3 className="w-5 h-5 text-cyan-400" />}
            title="Preparation Topics"
            desc="Study guide for all exam topics"
            bgClass="bg-cyan-900/20 border-cyan-700/30 hover:border-cyan-500/50"
          />
        </div>

        {/* Dashboard CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Preparation Dashboard</h3>
            <p className="text-slate-400 text-sm">Track your progress, scores, and identify weak areas across all topics.</p>
          </div>
          <Link to="/dashboard" className="btn-primary whitespace-nowrap">
            <BarChart3 className="w-4 h-4" />
            View Dashboard
          </Link>
        </div>

        {/* Footer stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Written Questions', value: '240' },
            { label: 'Technical Questions', value: '100+' },
            { label: 'HR Questions', value: '30' },
            { label: 'Mock Papers', value: '6' },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-blue-400">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

interface RoundCardProps {
  round: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
  href: string;
  buttonText: string;
}

function RoundCard({ round, title, subtitle, icon, color, details, href, buttonText }: RoundCardProps) {
  const colorMap: Record<string, { bg: string; badge: string; btn: string; border: string }> = {
    blue:    { bg: 'bg-blue-900/20',    badge: 'bg-blue-800 text-blue-200',    btn: 'bg-blue-600 hover:bg-blue-700',    border: 'border-blue-700/30 hover:border-blue-500/50' },
    purple:  { bg: 'bg-purple-900/20',  badge: 'bg-purple-800 text-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', border: 'border-purple-700/30 hover:border-purple-500/50' },
    emerald: { bg: 'bg-emerald-900/20', badge: 'bg-emerald-800 text-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700', border: 'border-emerald-700/30 hover:border-emerald-500/50' },
    amber:   { bg: 'bg-amber-900/20',   badge: 'bg-amber-800 text-amber-200',   btn: 'bg-amber-600 hover:bg-amber-700',   border: 'border-amber-700/30 hover:border-amber-500/50' },
  };
  const c = colorMap[color];

  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-6 flex flex-col gap-4 transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <span className={`${c.badge} text-xs font-bold px-2.5 py-1 rounded-full`}>ROUND {round}</span>
        <div className="text-slate-400">{icon}</div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>
      <ul className="space-y-1">
        {details.map(d => (
          <li key={d} className="flex items-center gap-2 text-slate-300 text-sm">
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            {d}
          </li>
        ))}
      </ul>
      <Link
        to={href}
        className={`mt-auto text-center text-white font-semibold text-sm py-2.5 px-4 rounded-lg ${c.btn} transition-colors flex items-center justify-center gap-2`}
      >
        {buttonText}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

interface ActionTileProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgClass: string;
}

function ActionTile({ href, icon, title, desc, bgClass }: ActionTileProps) {
  return (
    <Link to={href} className={`${bgClass} border rounded-xl p-5 flex items-center gap-4 transition-all hover:shadow-lg`}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="font-semibold text-white text-sm">{title}</div>
        <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto flex-shrink-0" />
    </Link>
  );
}

interface TopicCardProps {
  href: string;
  label: string;
  desc: string;
  color: 'blue' | 'purple' | 'emerald';
}

function TopicCard({ href, label, desc, color }: TopicCardProps) {
  const colorMap = {
    blue:    { bg: 'bg-blue-900/20',    border: 'border-blue-700/30 hover:border-blue-500/50',    badge: 'text-blue-400',    btn: 'bg-blue-600 hover:bg-blue-700' },
    purple:  { bg: 'bg-purple-900/20',  border: 'border-purple-700/30 hover:border-purple-500/50', badge: 'text-purple-400',  btn: 'bg-purple-600 hover:bg-purple-700' },
    emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-700/30 hover:border-emerald-500/50', badge: 'text-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  };
  const c = colorMap[color];
  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-5 flex flex-col gap-3 transition-all`}>
      <div>
        <div className={`font-bold text-white text-base`}>{label}</div>
        <div className="text-slate-400 text-xs mt-1">{desc}</div>
      </div>
      <Link
        to={href}
        className={`text-center text-white font-semibold text-sm py-2 px-4 rounded-lg ${c.btn} transition-colors flex items-center justify-center gap-2`}
      >
        Start Practice <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}


