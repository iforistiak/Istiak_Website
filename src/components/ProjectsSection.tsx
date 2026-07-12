import { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { 
  ExternalLink, 
  Github, 
  Filter, 
  Sparkles, 
  CheckCircle,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'it' | 'ecommerce' | 'graphics' | 'web'>('all');
  const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all' as const, label: 'All Projects' },
    { id: 'it' as const, label: 'IT & Hardware' },
    { id: 'ecommerce' as const, label: 'E-commerce' },
    { id: 'graphics' as const, label: 'Graphics' },
    { id: 'web' as const, label: 'Web Portals' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
            Latest Work
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore active deployments, automated scripts, designs, and systems configured by Istiak.
          </p>
        </div>
        
        {/* Decorative Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-950/20 text-brand-red dark:text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider self-start">
          <Sparkles size={12} />
          <span>Proven Quality</span>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/40">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group flex flex-col overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/30 shadow-sm hover:shadow-md hover:border-slate-200/50 dark:hover:border-slate-800/60 transition-all duration-300"
            >
              
              {/* Card Image Cover */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category Badge overlay */}
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills (Show top 3) */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Trigger Detail Action Button */}
                <button
                  onClick={() => setActiveDetailProject(project)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/50 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-brand-blue transition-all"
                >
                  <span>Project Specs</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Dialog Drawer Overlay */}
      <AnimatePresence>
        {activeDetailProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailProject(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-100/85 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm transition-all"
              >
                <X size={16} />
              </button>

              {/* Panel Image */}
              <div className="h-56 relative shrink-0 bg-slate-950">
                <img 
                  src={activeDetailProject.image} 
                  alt={activeDetailProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="bg-brand-blue text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                    {activeDetailProject.category}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-2">
                    {activeDetailProject.title}
                  </h3>
                </div>
              </div>

              {/* Panel Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Project Overview */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                    Project Overview & Brief
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeDetailProject.description}
                  </p>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                    Deployment Specifications
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {activeDetailProject.details}
                    </p>
                  </div>
                </div>

                {/* Technical Frameworks used */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                    Core Technologies Deployments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailProject.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 text-brand-blue dark:text-blue-300 text-xs font-semibold"
                      >
                        <CheckCircle size={10} className="text-brand-green" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="p-5 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800/40 flex justify-end shrink-0">
                <a
                  href={activeDetailProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 text-xs font-bold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Github size={14} />
                  <span>Check Source Hub</span>
                </a>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
