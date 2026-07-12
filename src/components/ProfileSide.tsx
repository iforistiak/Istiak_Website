import { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github, 
  Youtube, 
  Send, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProfileSide() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriter effect
  useEffect(() => {
    const activeWord = PROFILE_INFO.titles[currentTitleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % PROFILE_INFO.titles.length);
      setTypingSpeed(400);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, typingSpeed]);

  return (
    <aside className="w-full xl:w-[420px] shrink-0 bg-white dark:bg-slate-900 border-b xl:border-b-0 xl:border-r border-slate-200/80 dark:border-slate-800/85 p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 xl:overflow-y-auto h-auto xl:h-screen">
      
      {/* Top Section: Avatar and Name */}
      <div className="flex flex-col items-center text-center mt-4">
        
        {/* Animated Avatar Frame */}
        <div className="relative mb-6">
          <motion.div
            animate={{ 
              borderRadius: ["35%", "50%", "42%", "35%"],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-48 h-48 overflow-hidden bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-green p-1 shadow-xl shadow-brand-blue/15"
          >
            <div className="w-full h-full bg-slate-100 rounded-[inherit] overflow-hidden">
              <img 
                src={PROFILE_INFO.avatarUrl} 
                alt={PROFILE_INFO.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          {/* Active status pulse badge */}
          <div className="absolute bottom-2 right-4 bg-emerald-500 text-white flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md shadow-emerald-500/20 border-2 border-white dark:border-slate-900">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Active
          </div>
        </div>

        {/* Profile Details */}
        <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-slate-800 dark:text-slate-100 uppercase">
          {PROFILE_INFO.name}
        </h2>
        
        {/* Typewriter text */}
        <div className="mt-2 min-h-[30px] flex items-center justify-center">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-brand-blue dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-md">
            {currentText}
            <span className="inline-block w-[3px] h-4 bg-brand-blue dark:bg-blue-400 ml-1 animate-ping" />
          </span>
        </div>

        {/* Short info row */}
        <div className="flex flex-col gap-2 mt-6 w-full text-left text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/30">
          <div className="flex items-center gap-3">
            <MapPin size={14} className="text-brand-blue" />
            <span>{PROFILE_INFO.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-brand-red" />
            <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-brand-blue transition-colors">{PROFILE_INFO.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={14} className="text-brand-green" />
            <span>{PROFILE_INFO.phone}</span>
          </div>
        </div>

        {/* Social connections */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { url: PROFILE_INFO.facebookUrl, icon: Facebook, color: 'hover:bg-sky-600 hover:text-white text-sky-600 bg-sky-50 dark:bg-sky-950/10' },
            { url: PROFILE_INFO.instagramUrl, icon: Instagram, color: 'hover:bg-pink-600 hover:text-white text-pink-600 bg-pink-50 dark:bg-pink-950/10' },
            { url: PROFILE_INFO.linkedinUrl, icon: Linkedin, color: 'hover:bg-blue-700 hover:text-white text-blue-700 bg-blue-50 dark:bg-blue-950/10' },
            { url: PROFILE_INFO.telegramUrl, icon: Send, color: 'hover:bg-cyan-500 hover:text-white text-cyan-500 bg-cyan-50 dark:bg-cyan-950/10' },
            { url: PROFILE_INFO.githubUrl, icon: Github, color: 'hover:bg-slate-800 hover:text-white text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-850' },
          ].map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-slate-800/40 shadow-sm transition-all duration-300 ${social.color}`}
              >
                <IconComponent size={18} />
              </motion.a>
            );
          })}
        </div>

      </div>

      {/* Hire & Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <motion.a
          href={PROFILE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="lets-talk-btn"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-brand-blue to-brand-green hover:from-blue-600 hover:to-emerald-500 shadow-md shadow-brand-blue/15 hover:shadow-lg transition-all duration-300"
        >
          <MessageSquare size={16} />
          <span>LETS TALK NOW</span>
        </motion.a>

        {/* Dynamic status quote */}
        <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 text-center mt-2">
          ⚡ 24/7 Remote & Local Support Available
        </p>
      </div>

    </aside>
  );
}
