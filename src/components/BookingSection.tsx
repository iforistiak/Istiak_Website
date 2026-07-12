import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Sliders, 
  Send, 
  CheckCircle, 
  Trash2, 
  Clock3,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingSectionProps {
  prefilledService: string;
  clearPrefilledService: () => void;
}

export default function BookingSection({ 
  prefilledService, 
  clearPrefilledService 
}: BookingSectionProps) {
  
  // Local bookings stored in localStorage
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('istiak_portfolio_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    }
  }, []);

  // Autofill service if passed from Service Estimator
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  const saveBookings = (updatedList: Booking[]) => {
    setBookings(updatedList);
    localStorage.setItem('istiak_portfolio_bookings', JSON.stringify(updatedList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newBooking: Booking = {
        id: `book-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        phone,
        service,
        date,
        time,
        status: 'pending',
        createdAt: new Date().toLocaleString()
      };

      const updatedList = [newBooking, ...bookings];
      saveBookings(updatedList);
      setSuccessBooking(newBooking);
      
      // Reset Form fields
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTime('');
      
      // Only clear prefilled if it matched
      if (prefilledService) {
        clearPrefilledService();
      }
      setService('');
      setIsSubmitting(false);
    }, 1200);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: 'cancelled' as const };
      }
      return b;
    });
    saveBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          Book an Appointment
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Lock in a meeting date for system administration, graphics branding, or IT mentoring.
        </p>
      </div>

      {/* Booking Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/35 shadow-sm">
        
        {/* Optional Formspree action in background, processed gracefully */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <User size={12} className="text-brand-blue" />
                <span>Full Name</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Istiak Islam" 
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Mail size={12} className="text-brand-red" />
                <span>Email Address</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="istiak@example.com" 
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Phone size={12} className="text-brand-green" />
                <span>Phone Number</span>
              </label>
              <input 
                type="tel" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+880 1600-000000" 
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Service Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Sliders size={12} className="text-brand-purple" />
                <span>Choose Service</span>
              </label>
              <select 
                value={service}
                onChange={e => setService(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans appearance-none"
              >
                <option value="" disabled className="text-slate-400">Choose a service</option>
                <option value="IT Support & System Solutions">IT Support & System Solutions</option>
                <option value="Web Development Consultation">Web Development Consultation</option>
                <option value="Graphics Design & Brand Identity">Graphics Design & Brand Identity</option>
                <option value="Digital Marketing and Benefits">Digital Marketing and Benefits</option>
                <option value="IT Training & Solutions">IT Training & Solutions</option>
                {prefilledService && !prefilledService.includes('IT Support') && (
                  <option value={prefilledService}>{prefilledService}</option>
                )}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Calendar size={12} className="text-brand-red" />
                <span>Appointment Date</span>
              </label>
              <input 
                type="date" 
                value={date}
                onChange={e => setDate(e.target.value)}
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans"
              />
            </div>

            {/* Preferred Time */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Clock size={12} className="text-brand-amber" />
                <span>Preferred Time</span>
              </label>
              <input 
                type="time" 
                value={time}
                onChange={e => setTime(e.target.value)}
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 outline-none focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-sans"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm text-white shadow-lg transition-all duration-300 cursor-pointer ${
              isSubmitting 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-blue to-brand-green hover:from-blue-600 hover:to-emerald-500 hover:shadow-brand-blue/10'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Transmitting Request...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Submit Appointment Request</span>
              </>
            )}
          </button>

        </form>
      </div>

      {/* Persistent local bookings logs */}
      <AnimatePresence>
        {bookings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-4"
          >
            <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500">
              My Scheduled Bookings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((bk) => (
                <div 
                  key={bk.id}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/30 rounded-3xl shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-100 leading-snug">
                        {bk.service}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">
                        Ref ID: {bk.id} | Created: {bk.createdAt.split(',')[0]}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1 ${
                      bk.status === 'pending'
                        ? 'bg-amber-50 text-brand-amber dark:bg-amber-950/20'
                        : bk.status === 'confirmed'
                        ? 'bg-emerald-50 text-brand-green dark:bg-emerald-950/20'
                        : 'bg-red-50 text-brand-red dark:bg-red-950/20'
                    }`}>
                      {bk.status === 'pending' ? <Clock3 size={10} /> : bk.status === 'confirmed' ? <Check size={10} /> : <AlertCircle size={10} />}
                      {bk.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-sans">
                    <span>📅 {bk.date}</span>
                    <span>⏰ {bk.time}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/20">
                    {bk.status === 'pending' && (
                      <button
                        onClick={() => handleCancelBooking(bk.id)}
                        className="text-[10px] font-bold text-brand-red hover:bg-red-50 dark:hover:bg-red-950/10 px-3 py-1.5 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBooking(bk.id)}
                      className="text-slate-400 hover:text-brand-red p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {successBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessBooking(null)}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/40 shadow-2xl z-10 w-full max-w-md text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={32} />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-black text-xl text-slate-900 dark:text-slate-50">
                  Appointment Submitted!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your booking has been secured in your browser. Md. Istiak Islam will review the request shortly.
                </p>
              </div>

              {/* Receipt Summary info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-800/30 text-left space-y-2.5 font-sans text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-400">REFERENCE ID</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{successBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-400">SERVICE</span>
                  <span className="font-bold text-brand-blue line-clamp-1">{successBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-400">DATE & TIME</span>
                  <span className="font-bold">{successBooking.date} at {successBooking.time}</span>
                </div>
              </div>

              <button
                onClick={() => setSuccessBooking(null)}
                className="w-full py-3 px-6 bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-xl font-bold text-xs shadow hover:opacity-90 transition-opacity"
              >
                Dismiss & Track Status
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
