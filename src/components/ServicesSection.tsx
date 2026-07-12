import { useState } from 'react';
import { SERVICES } from '../data';
import { 
  Sliders, 
  Cpu, 
  ShoppingBag, 
  Palette, 
  Network, 
  GraduationCap, 
  Plus, 
  Minus, 
  Calculator, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export default function ServicesSection({ onBookService }: ServicesSectionProps) {
  // Store selected service quantities: { [serviceId]: quantity }
  const [selections, setSelections] = useState<Record<string, number>>({});

  const handleIncrement = (id: string) => {
    setSelections(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrement = (id: string) => {
    setSelections(prev => {
      const val = prev[id] || 0;
      if (val <= 0) return prev;
      return {
        ...prev,
        [id]: val - 1
      };
    });
  };

  // Get specific icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Cpu size={20} />;
      case 'ShoppingBag':
        return <ShoppingBag size={20} />;
      case 'Palette':
        return <Palette size={20} />;
      case 'Network':
        return <Network size={20} />;
      default:
        return <GraduationCap size={20} />;
    }
  };

  // Calculations
  const selectedItems = SERVICES.map(srv => {
    const qty = selections[srv.id] || 0;
    return {
      ...srv,
      qty,
      totalPrice: qty * srv.basePrice,
      totalHours: qty * srv.estimatedHours
    };
  }).filter(item => item.qty > 0);

  const totalCost = selectedItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalHours = selectedItems.reduce((acc, curr) => acc + curr.totalHours, 0);
  
  // Applies a 10% discount if order is above $200
  const discount = totalCost >= 200 ? totalCost * 0.1 : 0;
  const netCost = totalCost - discount;

  const handleBookSelected = () => {
    if (selectedItems.length === 0) return;
    const formattedServicesText = selectedItems
      .map(item => `${item.title} (x${item.qty})`)
      .join(', ');
    onBookService(formattedServicesText);
  };

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
            Professional Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse services offered by Md. Istiak Islam and generate a custom instant estimate for your next project.
          </p>
        </div>
        
        {/* Cost Calculator Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-brand-green dark:text-emerald-400 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
          <Calculator size={12} />
          <span>Cost Estimator Active</span>
        </div>
      </div>

      {/* Main Grid: Left Service Cards, Right Estimate Receipt Card */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left Hand: Services list */}
        <div className="xl:col-span-2 space-y-4">
          {SERVICES.map((srv) => {
            const currentQty = selections[srv.id] || 0;
            return (
              <div 
                key={srv.id}
                className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  currentQty > 0 
                    ? 'border-brand-blue/40 shadow-sm dark:border-blue-500/40' 
                    : 'border-slate-100 dark:border-slate-800/35 hover:border-slate-200/60 dark:hover:border-slate-800/60'
                }`}
              >
                
                {/* Service Text Description */}
                <div className="flex items-start gap-3.5 flex-1">
                  <div className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
                    currentQty > 0 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-brand-blue dark:text-blue-400' 
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {getIcon(srv.icon)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {srv.description}
                    </p>
                    <div className="flex items-center gap-4 pt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span>Rate: <strong className="text-slate-700 dark:text-slate-300">${srv.basePrice}</strong> / {srv.unit}</span>
                      <span>•</span>
                      <span>Est: <strong className="text-slate-700 dark:text-slate-300">{srv.estimatedHours}h</strong> duration</span>
                    </div>
                  </div>
                </div>

                {/* Service Actions and Multipliers */}
                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/20 p-2 rounded-2xl">
                  <button
                    onClick={() => handleDecrement(srv.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/20 active:scale-90 transition-all shadow-sm"
                  >
                    <Minus size={14} />
                  </button>
                  
                  <span className="w-8 text-center font-mono text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    {currentQty}
                  </span>

                  <button
                    onClick={() => handleIncrement(srv.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/20 active:scale-90 transition-all shadow-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Hand: Estimate Receipt Card */}
        <div className="xl:sticky xl:top-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/35 shadow-sm space-y-6">
            
            {/* Title */}
            <div>
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-slate-800 dark:text-slate-100">
                Custom Scope Estimator
              </h3>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5 font-semibold tracking-wide">
                Configured rates for Md. Istiak Islam
              </p>
            </div>

            <hr className="border-slate-100 dark:border-slate-800/40" />

            {/* Receipt Items list */}
            {selectedItems.length === 0 ? (
              <div className="py-10 text-center space-y-3">
                <Sliders className="mx-auto text-slate-300 animate-pulse" size={28} />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans max-w-[200px] mx-auto">
                  Increase quantities to estimate custom server setups, graphic branding, or coursework!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {selectedItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start text-xs">
                      <div>
                        <h5 className="font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Qty: {item.qty} × ${item.basePrice} | Est: {item.totalHours}h
                        </p>
                      </div>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                        ${item.totalPrice}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100 dark:border-slate-800/40" />

                {/* Subtotals & Discounts */}
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between text-slate-500">
                    <span>Gross Services Subtotal</span>
                    <span className="font-mono">${totalCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Execution Time</span>
                    <span className="font-mono">{totalHours} Hours</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-brand-green">
                      <span className="flex items-center gap-1">
                        <Sparkles size={11} />
                        10% Bulk Discount Active
                      </span>
                      <span className="font-mono">-${discount.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <hr className="border-slate-100 dark:border-slate-800/40" />

                {/* Total Invoice */}
                <div className="flex justify-between items-center bg-blue-50/50 dark:bg-blue-950/20 p-3.5 rounded-2xl border border-blue-100/30">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                      Net Estimate
                    </h5>
                    <p className="text-[10px] text-slate-400 font-sans mt-1">
                      Terms: Local currency or Paypal
                    </p>
                  </div>
                  <span className="font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                    ${netCost.toFixed(0)}
                  </span>
                </div>

                {/* Booking Redirection CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookSelected}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Request Estimated Scope</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Secure Guarantee label */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/20 text-[10px] text-slate-400 font-semibold uppercase tracking-wider border border-slate-100 dark:border-slate-850">
            <CheckCircle2 size={12} className="text-brand-green" />
            <span>Quotes are initial guidelines & subject to scope shifts.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
