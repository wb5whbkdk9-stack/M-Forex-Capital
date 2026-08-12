import os

content = """import { motion } from 'framer-motion';
import { 
  BarChart3, LineChart, Target, ShieldCheck, BrainCircuit, PlayCircle,
  Lightbulb, Eye, PenTool, CheckSquare, ListOrdered, 
  BookOpen, Users, MessageSquare, Compass, ArrowRight, Bot
} from 'lucide-react';

export function WhatYouWillLearn() {
  const items = [
    { icon: <BarChart3 />, title: "Candlesticks", desc: "Price action nu basic ton samjho." },
    { icon: <LineChart />, title: "Market Structure", desc: "HH, HL, LH, LL te market behaviour." },
    { icon: <Target />, title: "Support & Resistance", desc: "Important price areas identify karo." },
    { icon: <CheckSquare />, title: "Confirmation", desc: "Entry ton pehla setup nu properly evaluate karo." },
    { icon: <ShieldCheck />, title: "Risk Management", desc: "Trade ton pehla risk define karo." },
    { icon: <BrainCircuit />, title: "Trading Psychology", desc: "Emotion-based decisions nu recognize karo." }
  ];

  return (
    <section className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide">WHAT YOU'LL LEARN</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="bg-brand-card border border-slate-800 p-8 rounded-3xl hover:border-gold-500/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800/50 text-gold-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 mb-6">{item.desc}</p>
              <a href="#resources" className="text-sm font-bold text-gold-500 hover:text-gold-400 flex items-center gap-1 uppercase tracking-wider">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearningMethod() {
  const steps = [
    { num: "01", title: "LEARN", desc: "Concept samjho.", icon: <Lightbulb /> },
    { num: "02", title: "SEE", desc: "Chart examples dekho.", icon: <Eye /> },
    { num: "03", title: "PRACTICE", desc: "Setup identify karo.", icon: <PenTool /> },
    { num: "04", title: "PLAN", desc: "Entry, invalidation te risk define karo.", icon: <Target /> },
    { num: "05", title: "REVIEW", desc: "Trade/process nu journal karo.", icon: <ListOrdered /> }
  ];

  return (
    <section className="py-24 bg-brand-dark border-y border-slate-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">SAADA LEARNING METHOD</h2>
          <p className="text-slate-400">Step-by-step process better trading results layi.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 bg-brand-black border border-slate-700/50 p-6 rounded-2xl relative group">
              <div className="text-gold-500/20 font-display text-5xl font-bold absolute top-4 right-4 group-hover:text-gold-500/40 transition-colors">
                {step.num}
              </div>
              <div className="text-gold-400 mb-4">{step.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wider">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeginnerSection() {
  return (
    <section className="py-24 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 max-w-6xl">
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Bilkul Beginner Ho?</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Je tuhanu forex bare kuch vi nahi pata, tension nahi. Learning basics ton start kiti ja sakdi hai.
          </p>
          <a href="#resources" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-200 text-brand-black font-bold rounded-xl transition-all text-sm uppercase tracking-wider">
            START FROM BASICS <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="flex-1 w-full bg-brand-card p-8 rounded-3xl border border-slate-800 relative">
          <div className="absolute top-8 bottom-8 left-12 w-px bg-slate-700/50 hidden sm:block"></div>
          <div className="flex flex-col gap-6 relative z-10">
            {["Forex Basics", "Candlesticks", "Support & Resistance", "Market Structure", "Confirmation", "Risk Management", "Psychology", "Practice"].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-gold-500 flex items-center justify-center text-xs font-bold text-gold-400 shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="font-medium text-slate-200">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyMForex() {
  const reasons = [
    { title: "Easy Punjabi", desc: "Complex trading concepts simple language ch.", icon: <MessageSquare /> },
    { title: "Structured Learning", desc: "Random information di jagah proper sequence.", icon: <ListOrdered /> },
    { title: "Practical Examples", desc: "Concepts nu charts naal samjho.", icon: <LineChart /> },
    { title: "Beginner Friendly", desc: "Zero knowledge ton start.", icon: <Compass /> },
    { title: "Learning Resources", desc: "Practical PDFs te guides.", icon: <BookOpen /> },
    { title: "Community", desc: "WhatsApp + Telegram + Instagram naal connected learning.", icon: <Users /> }
  ];

  return (
    <section className="py-24 bg-brand-dark border-y border-slate-800">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-wide mb-16">WHY M FOREX CAPITAL?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="bg-brand-black p-8 rounded-3xl border border-slate-700/30 flex flex-col items-center hover:border-gold-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center text-gold-400 mb-6">
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AILearningPreview() {
  return (
    <section className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="w-20 h-20 mx-auto bg-gold-500/10 rounded-3xl flex items-center justify-center mb-8 border border-gold-500/20">
          <Bot className="w-10 h-10 text-gold-500" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Trading Da Question? Pehla Eh 7 Questions Explore Karo.</h2>
        
        <div className="flex flex-col gap-4 max-w-2xl mx-auto my-12">
          {["Candlestick ki hundi aa?", "Market Structure ki hai?", "FOMO ki hunda?"].map((q, i) => (
            <div key={i} className="bg-brand-card border border-slate-700/50 p-5 rounded-2xl flex items-center justify-between opacity-80 cursor-default">
              <span className="text-slate-300 font-medium">{q}</span>
              <ArrowRight className="w-5 h-5 text-slate-500" />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => document.querySelector<HTMLButtonElement>('.fixed.bottom-6.right-6')?.click()}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] text-sm uppercase tracking-widest"
        >
          <Bot className="w-5 h-5" /> EXPLORE M FOREX AI →
        </button>
      </div>
    </section>
  );
}

export function CommunityCTA({ onOpenCommunity }: { onOpenCommunity: () => void }) {
  return (
    <section className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">M Forex Capital Community Naal Juddo 🚀</h2>
        <p className="text-lg text-slate-300 mb-12">
          Website te learning start karo, fer WhatsApp, Telegram te Instagram naal connected raho.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenCommunity(); }} className="px-8 py-4 bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-brand-black rounded-xl font-bold transition-all uppercase tracking-wider text-sm">
            JOIN WHATSAPP
          </a>
          <a href="https://t.me/+yjAXBlYqmP5iYjll" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/30 hover:bg-[#0088cc] hover:text-white rounded-xl font-bold transition-all uppercase tracking-wider text-sm">
            JOIN TELEGRAM
          </a>
          <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-pink-500/10 text-pink-500 border border-pink-500/30 hover:bg-pink-500 hover:text-white rounded-xl font-bold transition-all uppercase tracking-wider text-sm">
            FOLLOW INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}
"""
with open('src/components/HomeSections.tsx', 'w') as f:
    f.write(content)
