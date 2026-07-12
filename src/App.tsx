import { useState, useEffect } from 'react';
import { SectionType } from './types';
import Sidebar from './components/Sidebar';
import ProfileSide from './components/ProfileSide';
import HomeSection from './components/HomeSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ServicesSection from './components/ServicesSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [prefilledService, setPrefilledService] = useState<string>('');

  // Load and apply theme from Local Storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('istiak_portfolio_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Light mode default as per instructions
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('istiak_portfolio_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  // Cross-component deep linking: Select Estimated Services -> Redirect & prefill Booking section
  const handleBookService = (serviceName: string) => {
    setPrefilledService(serviceName);
    setActiveSection('booking');
  };

  const clearPrefilledService = () => {
    setPrefilledService('');
  };

  // Sections router map
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'services':
        return <ServicesSection onBookService={handleBookService} />;
      case 'booking':
        return (
          <BookingSection 
            prefilledService={prefilledService} 
            clearPrefilledService={clearPrefilledService} 
          />
        );
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={(target) => setActiveSection(target)} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300 overflow-hidden`}>
      
      {/* 1. Master Nav Sidebar Column */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* 2. Main Dashboard Window Layout */}
      <div className="flex-1 flex flex-col xl:flex-row h-screen overflow-hidden pb-20 md:pb-0">
        
        {/* Profile Details Block Column */}
        <ProfileSide />

        {/* Dynamic Canvas Container */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-10 relative">
          
          {/* Ambient Background Glow Spotlights (Desktop) */}
          <div className="hidden lg:block absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden lg:block absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Framer Motion Animating section transition */}
          <div className="relative max-w-4xl mx-auto h-full z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pb-16"
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>

        </main>

      </div>

    </div>
  );
}
