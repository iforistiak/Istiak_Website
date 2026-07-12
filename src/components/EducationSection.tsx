import { EDUCATION_TIMELINE } from '../data';
import { 
  GraduationCap, 
  School, 
  BookOpen, 
  Calendar,
  Compass,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export default function EducationSection() {
  
  // Choose icon based on education type
  const getIcon = (type: 'school' | 'college' | 'university') => {
    switch (type) {
      case 'university':
        return <GraduationCap className="w-5 h-5" />;
      case 'college':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <School className="w-5 h-5" />;
    }
  };

  // Choose highlight color based on type
  const getAccentColor = (type: 'school' | 'college' | 'university') => {
    switch (type) {
      case 'university':
        return 'border-l-brand-purple text-brand-purple bg-purple-500/10';
      case 'college':
        return 'border-l-brand-blue text-brand-blue bg-blue-500/10';
      default:
        return 'border-l-brand-green text-brand-green bg-emerald-500/10';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div>
        <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          Educational Background
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed timeline of academic qualification and milestones achieved.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 pl-6 sm:pl-8 space-y-10 py-2">
        {EDUCATION_TIMELINE.map((item, index) => {
          const accentClass = getAccentColor(item.type);
          
          return (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={item.id}
              className="relative"
            >
              
              {/* Timeline Indicator Node Pin */}
              <div className={`absolute -left-[39px] md:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm text-slate-600 dark:text-slate-300 transition-transform duration-300 hover:scale-115`}>
                {getIcon(item.type)}
              </div>

              {/* Educational Card Body */}
              <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/30 rounded-3xl shadow-sm hover:shadow-md border-l-4 transition-all duration-300 ${accentClass}`}>
                
                {/* Year Badge */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-red mb-2">
                  <Calendar size={12} />
                  <span>{item.year}</span>
                </div>

                {/* Institution and Degree */}
                <h3 className="font-display font-black text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-snug">
                  {item.institute}
                </h3>
                
                <p className="text-xs sm:text-sm font-semibold text-brand-blue dark:text-blue-400 mt-1">
                  {item.degree}
                </p>

                {/* Description info */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Additional Milestone Accent */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/20 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1">
                    <Compass size={11} className="text-slate-400" />
                    Rajshahi Division
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <Award size={11} />
                    Verified
                  </span>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
