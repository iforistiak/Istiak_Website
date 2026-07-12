import { useState, useEffect } from 'react';
import { SKILLS } from '../data';
import { 
  Trophy, 
  Settings, 
  Monitor, 
  ShoppingBag, 
  Users, 
  Cpu, 
  HelpCircle,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'it-support' | 'systems' | 'design' | 'training'>('all');
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    // Small delay to trigger the animation width smoothly
    const t = setTimeout(() => setTriggerAnimation(true), 200);
    return () => clearTimeout(t);
  }, [activeTab]);

  const skillCategories = [
    { id: 'all' as const, label: 'All Skillsets', icon: Trophy },
    { id: 'it-support' as const, label: 'IT & Hardware', icon: Monitor },
    { id: 'systems' as const, label: 'Systems & E-comm', icon: ShoppingBag },
    { id: 'design' as const, label: 'Graphics & Creative', icon: Settings },
    { id: 'training' as const, label: 'Training & Team', icon: Users },
  ];

  const filteredSkills = activeTab === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeTab);

  // Maps color labels to class styles
  const getColorClasses = (color: 'blue' | 'green' | 'red' | 'purple' | 'amber') => {
    switch (color) {
      case 'green':
        return {
          fill: 'bg-brand-green',
          text: 'text-brand-green',
          bg: 'bg-emerald-500/10'
        };
      case 'red':
        return {
          fill: 'bg-brand-red',
          text: 'text-brand-red',
          bg: 'bg-red-500/10'
        };
      case 'purple':
        return {
          fill: 'bg-brand-purple',
          text: 'text-brand-purple',
          bg: 'bg-purple-500/10'
        };
      case 'amber':
        return {
          fill: 'bg-brand-amber',
          text: 'text-brand-amber',
          bg: 'bg-amber-500/10'
        };
      default:
        return {
          fill: 'bg-brand-blue',
          text: 'text-brand-blue',
          bg: 'bg-blue-500/10'
        };
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div>
        <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          Technical Expertise
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          A granular look into hardware proficiency, software support pipelines, and marketing parameters.
        </p>
      </div>

      {/* Categories Switch Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/40">
        {skillCategories.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setTriggerAnimation(false);
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress Bars List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {filteredSkills.map((skill, index) => {
          const colors = getColorClasses(skill.color);
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              key={skill.name}
              className="space-y-2 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/20 shadow-sm"
            >
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${colors.fill}`} />
                  {skill.name}
                </span>
                <span className={colors.text}>{skill.percentage}%</span>
              </div>
              
              {/* Progress Background track */}
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: triggerAnimation ? `${skill.percentage}%` : '0%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${colors.fill} shadow-inner shadow-black/5`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Section: Software/Tools Icons Matrix */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 mt-6 space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="text-brand-blue" size={18} />
          <h3 className="font-display font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            Daily Operational Toolkit
          </h3>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The software suites and standard operating environments utilized daily for client workloads:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { title: 'MikroTik RouterOS', desc: 'ISP & Enterprise' },
            { title: 'WooCommerce Admin', desc: 'Store Catalogs' },
            { title: 'Adobe Illustrator', desc: 'Vector Layouts' },
            { title: 'Active Directory', desc: 'Domain Security' },
            { title: 'Adobe Photoshop', desc: 'Banner Design' },
            { title: 'Shopify Admin', desc: 'Stock sync' },
            { title: 'Windows ServerOS', desc: 'System Setup' },
            { title: 'Vite & React.js', desc: 'Modern Portal UI' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-2xl shadow-sm"
            >
              <h5 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-100">
                {item.title}
              </h5>
              <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
