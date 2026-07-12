import React, { useState, useRef, useEffect } from 'react';
import { PROFILE_INFO, MOCK_BOT_RESPONSES } from '../data';
import { ChatMessage } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  MessageCircle,
  Clock,
  Sparkles,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: "Hello! I'm Md. Istiak Islam's Virtual Portfolio Agent. Ask me about my Technical Skills, Educational Milestones, latest Projects, or how to Book a custom consultation!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setChatInput('');
    setIsTyping(true);

    // Simulate thinking & response
    setTimeout(() => {
      const normalized = textToSend.toLowerCase();
      let replyOptions = MOCK_BOT_RESPONSES.general;

      if (normalized.includes('skill') || normalized.includes('experience') || normalized.includes('expert') || normalized.includes('hardware')) {
        replyOptions = MOCK_BOT_RESPONSES.skills;
      } else if (normalized.includes('project') || normalized.includes('work') || normalized.includes('code') || normalized.includes('portfolio')) {
        replyOptions = MOCK_BOT_RESPONSES.projects;
      } else if (normalized.includes('book') || normalized.includes('appointment') || normalized.includes('sched') || normalized.includes('consult')) {
        replyOptions = MOCK_BOT_RESPONSES.booking;
      } else if (normalized.includes('school') || normalized.includes('college') || normalized.includes('uni') || normalized.includes('study') || normalized.includes('education')) {
        replyOptions = MOCK_BOT_RESPONSES.education;
      }

      const randomReply = replyOptions[Math.floor(Math.random() * replyOptions.length)];

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: randomReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const presetChips = [
    { label: 'Technical Skills 💻', query: 'What are your IT and technical skills?' },
    { label: 'Latest Work 🚀', query: 'Show me your projects and coding work' },
    { label: 'Education 🎓', query: 'Tell me about your academic background' },
    { label: 'How to Book 📅', query: 'How can I book an appointment with you?' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h2 className="font-display font-black text-3xl text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          Contact & Location
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Connect directly via high-availability channels, find Istiak's Rajshahi office coordinates, or chat with his automated bot.
        </p>
      </div>

      {/* Main Grid split: Left (Info + Chat Bot), Right (Google Map Embed) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Direct info cards & Chat Module */}
        <div className="space-y-6">
          
          {/* Direct Address & Communications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-2xl shadow-sm text-center">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Mail size={16} />
              </div>
              <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Email</h5>
              <a href={`mailto:${PROFILE_INFO.email}`} className="text-xs text-slate-500 hover:text-brand-blue transition-colors mt-1 block font-sans truncate">
                {PROFILE_INFO.email}
              </a>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-2xl shadow-sm text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-brand-green flex items-center justify-center mx-auto mb-3">
                <Phone size={16} />
              </div>
              <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">WhatsApp</h5>
              <a href={PROFILE_INFO.whatsappUrl} target="_blank" rel="noopener" className="text-xs text-slate-500 hover:text-brand-green transition-colors mt-1 block font-sans">
                {PROFILE_INFO.phone}
              </a>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-2xl shadow-sm text-center">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-brand-red flex items-center justify-center mx-auto mb-3">
                <MapPin size={16} />
              </div>
              <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Location</h5>
              <span className="text-xs text-slate-500 mt-1 block font-sans">
                {PROFILE_INFO.location}
              </span>
            </div>

          </div>

          {/* Interactive Chat Bot Support Panel */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/35 rounded-3xl shadow-sm flex flex-col h-[400px]">
            
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-brand-blue flex items-center justify-center">
                  <Bot size={16} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-100">
                    Istiak's Virtual Agent
                  </h4>
                  <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online Responder
                  </span>
                </div>
              </div>
              
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Clock size={11} />
                <span>Instance Active</span>
              </div>
            </div>

            {/* Chat Scrollable log viewport */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100/30'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[8px] opacity-40 font-mono mt-1 block text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100/30 text-slate-400 p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Presets chips trigger */}
            <div className="flex flex-wrap gap-1.5 py-2 shrink-0 border-t border-slate-100 dark:border-slate-800/20">
              {presetChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(undefined, chip.query)}
                  className="text-[9px] font-bold uppercase tracking-wider text-slate-500 hover:text-brand-blue bg-slate-50 hover:bg-blue-50 dark:bg-slate-850 dark:hover:bg-blue-950/20 px-2.5 py-1.5 rounded-lg border border-slate-200/20 transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Form submit */}
            <form 
              onSubmit={handleSendMessage}
              className="flex gap-2 shrink-0 pt-2 border-t border-slate-100 dark:border-slate-800/20"
            >
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about systems, router configurations, rates..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 rounded-xl border border-slate-200/40 dark:border-slate-800/30 outline-none text-xs"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white shadow-md active:scale-95 transition-all"
              >
                <Send size={14} />
              </button>
            </form>

          </div>

        </div>

        {/* Right Column: Google Maps Embed (Static high-fidelity view) */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/35 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-brand-red" size={18} />
            <h4 className="font-display font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Rajshahi HQ Coordinate Map
            </h4>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Located in Rajshahi, Bangladesh. Providing high-availability remote setup support for worldwide systems, and local physical site installation inside Rajshahi City.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-200/40 dark:border-slate-800/20 bg-slate-100 h-[340px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116334.5666922967!2d88.52924409322305!3d24.378121511211756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a551957f%3A0x44c0d0bc4309f8c9!2sRajshahi!5e0!3m2!1sen!2sbd!4v1712850000000!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy"
              title="Rajshahi Google Map"
            />
          </div>

          {/* Map bottom stats */}
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2 font-sans border-t border-slate-100 dark:border-slate-800/20">
            <span>Lat/Lon: 24.378 / 88.529</span>
            <span className="text-brand-green">🟢 Remote Ready</span>
          </div>

        </div>

      </div>

    </div>
  );
}
