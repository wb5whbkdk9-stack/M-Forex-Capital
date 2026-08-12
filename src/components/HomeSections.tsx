



import React, { useState } from 'react';


import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BrainCircuit, PlayCircle, CheckSquare, ArrowRight, Brain, BarChart3, LineChart, Target, Zap, Briefcase, BookOpen, User, Lightbulb, Eye, PenTool, ListOrdered, Bot, MessageSquare, Compass, Users, CheckCircle, ExternalLink, X } from 'lucide-react';


const TOPICS = [
  {
    id: 'candlesticks',
    title: 'Candlesticks',
    icon: <BarChart3 />,
    desc: 'Candlestick patterns te unhan de meaning.',
    fullDesc: 'Candlestick charts price movement nu visually present karde ne. Har candle ik specific time period da open, high, low, te close dikhandi hai. Tusi is vich bullish (price up) te bearish (price down) candles, aur various patterns jivein Doji, Hammer, aur Engulfing sikhonge jo market de sentiment nu samajhan vich madad karde ne.'
  },
  {
    id: 'market_structure',
    title: 'Market Structure',
    icon: <LineChart />,
    desc: 'Uptrend, Downtrend te Range.',
    fullDesc: 'Market Structure price de chalne da pattern hunda hai. Eh Higher Highs (HH) te Higher Lows (HL) naal Uptrend, ya Lower Highs (LH) te Lower Lows (LL) naal Downtrend banaunda hai. Jadon price ek zone ch fassi hove, usnu Range ya Consolidation kende han. Eh samajhna entry te exit point decide karan layi sab ton zaroori hai.'
  },
  {
    id: 'support_resistance',
    title: 'Support & Resistance',
    icon: <Target />,
    desc: 'Key price levels jithe market react kardi aa.',
    fullDesc: 'Support oh lower level hunda hai jithe buyers strongly market vich aunde ne te price nu thalle digan ton rokde ne. Resistance oh upper level hunda hai jithe sellers strongly aunde ne te price nu utte jaan ton rokde ne. M Forex Capital vich asi inhan levels te clean price action naal trade karna sikhde haan.'
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    icon: <CheckCircle />,
    desc: 'Trade len toh pehla double check karna.',
    fullDesc: 'Sirf support ya resistance te trade lena kaafi nahi hunda. Confirmation da matlab hai price action (jivein rejection candle, engulfing candle, ya lower timeframe te structure break) da wait karna jo prove kare ke level hold kar reha hai. Eh fakeouts ton bachan layi zaroori hai.'
  },
  {
    id: 'risk_management',
    title: 'Risk Management',
    icon: <Briefcase />,
    desc: 'Account balance nu protect karna.',
    fullDesc: 'Risk management trading di backbone hai. Ehda matlab hai apne account di protection karna by using appropriate lot sizes, stop losses (SL), and targeting a good Risk/Reward (RR) ratio. Rule of thumb: Hamesha apni total capital da sirf 1-2% hi ek trade vich risk karo.'
  },
  {
    id: 'trading_psychology',
    title: 'Trading Psychology',
    icon: <Brain />,
    desc: 'Mindset te emotions nu control karna.',
    fullDesc: 'Trading vich 80% mindset aur 20% strategy hundi hai. Trading Psychology da matlab hai Fear (darr), Greed (laalach), FOMO (Fear Of Missing Out), te Revenge Trading varge emotions nu control karna. Discipline maintain karna hi profitable trader banan di key hai.'
  }
];

export function WhatYouWillLearn() {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  return (
    <section id="learn" className="py-24 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Tusi Ki Sikhonge?</h2>
          <p className="text-lg text-slate-300">
            Clean price action trading de sab ton important concepts nu asaan bhasha ch samjho. Tap on any topic to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TOPICS.map((topic, i) => (
            <motion.button 
              key={i}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTopic(topic)}
              className="bg-brand-card border border-slate-700/50 p-8 rounded-3xl hover:border-gold-500/50 transition-all group text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{topic.title}</h3>
              <p className="text-slate-400 mb-6">{topic.desc}</p>
              
              <div className="flex items-center text-gold-500 text-sm font-bold uppercase tracking-widest mt-auto">
                KNOWLEDGE PADHO <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-dark border border-slate-700 rounded-3xl p-6 md:p-10 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedTopic(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-gold-500">
                  {selectedTopic.icon}
                </div>
                <h3 className="text-3xl font-display font-bold text-white">{selectedTopic.title}</h3>
              </div>
              
              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-slate-300 text-lg leading-relaxed">
                  {selectedTopic.fullDesc}
                </p>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-gold-500" /> Learn trading in easy and best way
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-3 bg-pink-500/10 text-pink-500 border border-pink-500/30 hover:bg-pink-500 hover:text-white rounded-xl font-bold transition-all text-center text-sm flex items-center justify-center gap-2">
                    Follow on Instagram <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => { setSelectedTopic(null); document.querySelector<HTMLAnchorElement>('a[href="#community"]')?.click(); }} className="flex-1 px-4 py-3 bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-brand-black rounded-xl font-bold transition-all text-center text-sm flex items-center justify-center gap-2">
                    Join WhatsApp Group
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
    <section id="roadmap" className="py-24 bg-brand-dark border-y border-slate-800">
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
          <a href="#learn" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-200 text-brand-black font-bold rounded-xl transition-all text-sm uppercase tracking-wider">
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
    { title: "Interactive Learning", desc: "Live chart examples te tests.", icon: <BookOpen /> },
    { title: "Community", desc: "WhatsApp + Telegram + Instagram naal connected learning.", icon: <Users /> }
  ];

  return (
    <section id="about" className="py-24 bg-brand-dark border-y border-slate-800">
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
    <section id="community" className="py-24 bg-brand-dark border-t border-slate-800">
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
