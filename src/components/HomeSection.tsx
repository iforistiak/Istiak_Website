import { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data';
import { 
  Clock, 
  Terminal, 
  Award, 
  CheckCircle, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  onNavigate: (section: 'projects' | 'booking' | 'skills' | 'services' | 'education' | 'contact') => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const [bangladeshTime, setBangladeshTime] = useState('');

  // Live Bangladesh clock (UTC+6)
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setBangladeshTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback if Intl is not supported or errors out
        const offset = 6; // BST is UTC+6
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const bst = new Date(utc + 3600000 * offset);
        setBangladeshTime(bst.toLocaleTimeString());
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Hero Intro Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-brand-blue dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={12} className="animate-spin" />
          <span>Professional Portfolio</span>
        </div>
        
        <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
          Creative <span className="text-brand-blue dark:text-blue-400">Mind,</span> <br />
          Expert <span className="text-brand-green dark:text-emerald-400">Solutions.</span>
        </h1>
      </div>

      {/* Intro translation card (Bengali & English) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800/60 shadow-md border-l-4 border-l-brand-blue"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl" />
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇧🇩</span>
            <p className="font-display text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              "{PROFILE_INFO.bioBengali}"
            </p>
          </div>
          
          <hr className="border-slate-200/50 dark:border-slate-800/40" />
          
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇬🇧</span>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
              "{PROFILE_INFO.bioEnglish}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Live Status and Clock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Local time widget */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-brand-blue dark:text-blue-400">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">
                Rajshahi, Bangladesh Standard Time (BST)
              </p>
              <h4 className="font-mono text-base font-bold text-slate-800 dark:text-slate-100 tracking-wider">
                {bangladeshTime || 'Loading Clock...'}
              </h4>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50/50 dark:bg-slate-800 text-brand-blue dark:text-blue-300">
            UTC+6
          </span>
        </div>

        {/* Current status info */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-brand-green dark:text-emerald-400">
              <Terminal size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">
                System Status
              </p>
              <h4 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100">
                Offline Support Active & Mentorship Open
              </h4>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

      </div>

      {/* Stats Dashboard Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Professional Footprint
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILE_INFO.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-blue dark:text-blue-400">
                {stat.value}
              </h3>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Browse Projects', desc: 'Case studies & work', target: 'projects', icon: Cpu, color: 'from-blue-500 to-indigo-500 text-white' },
          { label: 'Check Expertise', desc: 'IT & admin levels', target: 'skills', icon: Award, color: 'from-emerald-500 to-teal-500 text-white' },
          { label: 'Schedule Booking', desc: 'Consultation requests', target: 'booking', icon: CheckCircle, color: 'from-red-500 to-orange-500 text-white' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(card.target as any)}
              className="group text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 shadow-sm hover:border-brand-blue/30 dark:hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                  <Icon size={18} />
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 mt-4 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                {card.label}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {card.desc}
              </p>
            </button>
          );
        })}
      </div>

    </div>
  );
}
