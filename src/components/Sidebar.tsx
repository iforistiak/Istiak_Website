import { SectionType } from '../types';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Sliders, 
  Calendar, 
  Mail, 
  Sun, 
  Moon 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Sidebar({ 
  activeSection, 
  setActiveSection, 
  theme, 
  toggleTheme 
}: SidebarProps) {
  
  const navItems = [
    { id: 'home' as SectionType, label: 'Home', icon: Home },
    { id: 'projects' as SectionType, label: 'Projects', icon: Briefcase },
    { id: 'education' as SectionType, label: 'Education', icon: GraduationCap },
    { id: 'skills' as SectionType, label: 'Skills', icon: Trophy },
    { id: 'services' as SectionType, label: 'Services', icon: Sliders },
    { id: 'booking' as SectionType, label: 'Booking', icon: Calendar },
    { id: 'contact' as SectionType, label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 h-20 md:relative md:w-28 md:h-screen flex md:flex-col items-center justify-between py-2 md:py-8 bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-r border-slate-200/80 dark:border-slate-800/85 shadow-lg md:shadow-none transition-colors duration-300">
      
      {/* Top Logo / Initials (Desktop only) */}
      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-red p-[2px] shadow-md shadow-brand-blue/10">
        <div className="flex items-center justify-center w-full h-full bg-white dark:bg-slate-950 rounded-[14px]">
          <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
            III
          </span>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex md:flex-col w-full md:w-auto md:space-y-4 px-2 md:px-0 justify-around md:justify-center items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              id={`nav-${item.id}`}
              className={`relative group flex flex-col items-center justify-center p-2.5 md:p-3.5 w-12 h-12 md:w-16 md:h-16 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-brand-blue bg-blue-50/50 dark:bg-blue-950/20' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title={item.label}
            >
              {/* Highlight Bar (Desktop: left, Mobile: top) */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-[3px] rounded-full bg-gradient-to-r from-brand-blue to-brand-green md:left-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:w-[4px] md:h-8"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Animated Icon Container */}
              <motion.div 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Icon 
                  size={20} 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? 'stroke-[2.5px] drop-shadow-[0_2px_8px_rgba(46,134,222,0.4)] text-brand-blue dark:text-blue-400' 
                      : 'stroke-[2px]'
                  }`}
                />
              </motion.div>

              {/* Label */}
              <span className={`text-[9px] mt-1 font-semibold tracking-wider uppercase transition-all duration-200 ${
                isActive ? 'text-brand-blue dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
              } md:hidden lg:inline-block md:text-[8px]`}>
                {item.label}
              </span>

              {/* Tooltip (Desktop only) */}
              <span className="hidden md:block absolute left-20 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md z-50 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dark Mode Switcher */}
      <div className="mr-4 md:mr-0 md:mt-0">
        <button
          onClick={toggleTheme}
          id="theme-toggle-btn"
          className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all duration-300 shadow-sm"
          aria-label="Toggle Theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-600" />
            )}
          </motion.div>
        </button>
      </div>

    </nav>
  );
}
