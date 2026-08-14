import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Users, BookOpen, Presentation, Calendar, PlayCircle, BarChart3, HelpCircle, Phone, Instagram } from 'lucide-react';
import { Logo } from './Logo';

export function LiveClassesCourse({ 
  onOpenCommunity, 
  onOpenGuide 
}: { 
  onOpenCommunity: () => void, 
  onOpenGuide: (type: string) => void 
}) {
  const [selectedPlan, setSelectedPlan] = useState<'1month' | '2months' | null>(null);

  const curriculum = [
    {
      month: "MONTH 1: FOUNDATION + MARKET UNDERSTANDING",
      weeks: [
        {
          title: "Week 1: Forex Basics",
          topics: ["Forex market basics", "Currency pairs", "Pip", "Lot", "Spread", "Leverage", "Margin", "Trading terminology"]
        },
        {
          title: "Week 2: Candlesticks",
          topics: ["OHLC", "Body", "Wick", "Doji", "Hammer", "Shooting Star", "Engulfing", "Candle context"]
        },
        {
          title: "Week 3: Support & Resistance",
          topics: ["Key levels", "Zones", "Reactions", "Breakouts", "False breakouts", "Retests"]
        },
        {
          title: "Week 4: Market Structure",
          topics: ["HH", "HL", "LH", "LL", "Trend", "Range", "Structure shifts"]
        }
      ]
    },
    {
      month: "MONTH 2: PRACTICAL TRADING FRAMEWORK",
      weeks: [
        {
          title: "Week 5: Price Action & Confirmation",
          topics: ["Market bias", "Key level", "Price reaction", "Confirmation", "Entry planning", "No-trade situations"]
        },
        {
          title: "Week 6: Risk Management",
          topics: ["Risk %", "Position sizing", "Stop Loss", "Take Profit", "Risk/Reward", "Trade planning", "Capital protection"]
        },
        {
          title: "Week 7: Trading Psychology",
          topics: ["FOMO", "Fear", "Greed", "Revenge trading", "Overtrading", "Patience", "Discipline", "Journaling"]
        },
        {
          title: "Week 8: Live Market Practice & Review",
          topics: ["Live market observation", "Market analysis", "Setup identification", "Trade planning", "Trade review", "Journal review", "Mistake analysis", "Building a personal trading routine"]
        }
      ]
    }
  ];

  return (
    <div className="pt-24 bg-brand-black text-slate-200">
      
      {/* 1. HERO SECTION */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-500/5 blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark border border-gold-500/20 text-gold-400 text-sm font-medium">
            <Users className="w-4 h-4" /> <span>Learning Community & Academy</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8">
            Trading Sikhni Aa? <br />
            <span className="text-gold-500">Pehla Community Nu Samjho.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            M Forex Capital da goal sirf course sell karna nahi — trading nu simple Punjabi ch samjhauna, community build karni te learners nu practical market understanding deni aa.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onOpenCommunity} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1">
              JOIN FREE COMMUNITY
            </button>
            <button 
              onClick={() => {
                document.getElementById('structured-learning')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="w-full sm:w-auto px-8 py-4 bg-brand-dark hover:bg-slate-800 border border-gold-500/30 text-white font-bold rounded-xl transition-all hover:-translate-y-1 text-center"
            >
              FREE LIVE WORKSHOP & PAID LEARNING DETAILS ARE BELOW ↓
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. DISCLAIMER */}
      <section className="py-16 bg-brand-dark border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-wide">PEHLA IK GAL CLEAR KAR DEYAN ❤️</h2>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>M Forex Capital community nu asi sirf course bechan layi nahi bana rahe.</p>
              <p>Sadi koshish aa ke trading bare genuine, simple te practical learning environment create kariye jithe beginners bina unnecessary pressure de concepts samajh sakkan.</p>
              <p>Asi free educational workshops, community discussions, learning resources te interactive practice tools provide karde haan.</p>
              <p>Regular live classes, structured curriculum, daily market analysis te dedicated learning environment maintain karan layi paid course option vi available hai.</p>
              <p className="text-gold-400 font-medium">Course lena completely optional hai.</p>
              <p>Tusi sirf free community join karke vi sade workshops te educational content naal connected reh sakde ho. Trading education programs di pricing provider, duration te level de according kaafi vary kar sakdi hai, sadda focus accessible learning te hai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREE WEEKLY WORKSHOP */}
      <section className="py-24 bg-gradient-to-b from-brand-dark to-brand-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-brand-black border border-gold-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-400 font-bold tracking-widest text-sm rounded-full mb-6">
                🎓 FREE LIVE WORKSHOP — EVERY WEEK
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Har week ik din — Live Learning Session.
              </h2>
              <p className="text-xl text-slate-300">
                Je tusi paid course nahi lena chaunde, fer vi tusi sadi community naal connected reh sakde ho. Asi week ch ik free live educational workshop conduct karange / karan di koshish karange, jithe trading de concepts nu practical examples naal Punjabi ch samjhaaya jawega.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="p-4 bg-brand-dark rounded-xl border border-slate-800 text-center">
                <Calendar className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-sm text-slate-400 mb-1">Frequency</div>
                <div className="font-bold text-white text-sm">1 Free Workshop Every Week</div>
              </div>
              <div className="p-4 bg-brand-dark rounded-xl border border-slate-800 text-center">
                <Presentation className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-sm text-slate-400 mb-1">Focus</div>
                <div className="font-bold text-white text-sm">Trading Education + Market Understanding</div>
              </div>
              <div className="p-4 bg-brand-dark rounded-xl border border-slate-800 text-center">
                <HelpCircle className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-sm text-slate-400 mb-1">Language</div>
                <div className="font-bold text-white text-sm">Simple Punjabi</div>
              </div>
              <div className="p-4 bg-brand-dark rounded-xl border border-slate-800 text-center">
                <Users className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-sm text-slate-400 mb-1">Access</div>
                <div className="font-bold text-white text-sm">Community Members</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-6">WORKSHOP ATTEND KARNA? JOIN COMMUNITY →</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://chat.whatsapp.com/J8tVrd8z3iN0O9Zqf9eX2x" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-brand-dark border border-slate-700 hover:border-[#25D366] text-white rounded-lg transition-colors flex items-center gap-2">
                  WHATSAPP
                </a>
                <a href="https://t.me/+yjAXBlYqmP5iYjll" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-brand-dark border border-slate-700 hover:border-[#0088cc] text-white rounded-lg transition-colors flex items-center gap-2">
                  TELEGRAM
                </a>
                <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-brand-dark border border-slate-700 hover:border-[#E1306C] text-white rounded-lg transition-colors flex items-center gap-2">
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSITION TO PAID */}
      <section id="structured-learning" className="py-24 bg-brand-dark border-y border-slate-800 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gold-400 mb-6">
              JE TUSI HOR STRUCTURED WAY CH SIKHNA CHAUHNE O…
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Free workshop tuhanu concepts naal introduce kar sakdi hai. Par je tusi 2 months tak proper structured learning, regular live classes, market analysis, practice te guided learning environment ch reh ke trading nu seriously samajhna chaunde ho, taan sadda structured course option available hai.
            </p>
          </div>
        </div>
      </section>

      {/* 7. COURSE SECTION HERO */}
      <section id="course-details" className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            📚 M FOREX CAPITAL — <span className="text-gold-500">STRUCTURED TRADING COURSE</span>
          </h2>
          <p className="text-2xl font-medium text-slate-300 mb-6">
            2 Months. Step-by-Step Learning. Simple Punjabi.
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Eh option ohna learners layi hai jo trading nu casually dekhna nahi, balki proper structured learning process naal samajhna chaunde ne.
          </p>
        </div>
      </section>

      {/* 8. COURSE PHILOSOPHY */}
      <section className="py-16 bg-brand-dark border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">COURSE DA PURPOSE</h2>
            <p className="text-xl text-slate-300">
              Trading nu shortcut samajhan di jagah skill samjho. Asi tuhanu sirf entries dikhauan di jagah eh samjhaun te focus karange ke:
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 max-w-5xl mx-auto">
            {[
              "Market nu observe kiven karna",
              "Structure kiven samajhna",
              "Levels kiven identify karne",
              "Confirmation kiven wait karni",
              "Risk kiven define karna",
              "Psychology kiven manage karni",
              "Trade nu review kiven karna"
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="px-4 py-3 bg-brand-black border border-gold-500/30 rounded-lg text-gold-400 font-medium whitespace-nowrap">
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CURRICULUM */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white">2-Month Curriculum</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {curriculum.map((month, idx) => (
              <div key={idx} className="bg-brand-dark border border-slate-800 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gold-400 mb-8 border-b border-slate-800 pb-4">{month.month}</h3>
                <div className="space-y-8">
                  {month.weeks.map((week, wIdx) => (
                    <div key={wIdx}>
                      <h4 className="text-lg font-bold text-white mb-4">{week.title}</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {week.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-slate-400 text-sm">
                            <span className="text-gold-500 mt-1">•</span> {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. DAILY LIVE CLASSES & LIVE MARKET ANALYSIS */}
      <section className="py-24 bg-brand-dark border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">REGULAR LIVE CLASSES</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Course duration de duran regular live classes conduct kitiyaan jaan giyaan, jithe concepts nu charts te explain kita jawega te market nu educational perspective ton analyse kita jawega.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Regular live sessions", "Live chart analysis", "Q&A / discussion", 
                  "Practical examples", "Setup planning", "Trade review", 
                  "Psychology discussions", "Risk management", "Community learning"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-brand-black border border-slate-800 rounded-xl text-slate-400 italic">
                "Jithe valid educational setup develop hovega, ohnu rules de according analyse kita jawega. Har din trade hona guaranteed nahi."
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">LIVE MARKET ANALYSIS</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Course sessions ch current market nu educational perspective ton analyse kita jawega.
              </p>
              
              <div className="bg-brand-black border border-slate-800 rounded-2xl p-6">
                <div className="flex flex-col gap-2">
                  {["MARKET BIAS", "MARKET STRUCTURE", "KEY LEVELS", "PRICE ACTION", "CONFIRMATION", "RISK", "TRADE PLAN / NO TRADE"].map((step, i, arr) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="px-6 py-2 bg-brand-dark border border-gold-500/20 text-gold-400 font-bold rounded w-full text-center">
                        {step}
                      </div>
                      {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-600 my-2 rotate-90" />}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-center text-brand-red font-medium">
                Valid setup na hove taan NO TRADE vi ik valid decision hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE CLASS */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">WHAT A CLASS LOOKS LIKE</h2>
            <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-center text-center">
              {[
                { time: "00:00", label: "Market Overview" },
                { time: "05:00", label: "Previous Session Review" },
                { time: "15:00", label: "Structure Analysis" },
                { time: "25:00", label: "Key Levels" },
                { time: "35:00", label: "Price Action" },
                { time: "45:00", label: "Possible Scenarios" },
                { time: "55:00", label: "Risk & Trade Planning" },
                { time: "60:00", label: "Questions + Review" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-3 bg-brand-dark rounded-lg border border-slate-800 w-[calc(50%-0.5rem)] md:w-auto">
                  <div className="text-gold-500 font-mono font-bold mb-1">{item.time}</div>
                  <div className="text-xs text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-8">Sample class structure — actual session timing may vary.</p>
          </div>
        </div>
      </section>

      {/* PRICING & OPTIONS */}
      <section className="py-24 bg-brand-dark border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Choose Your Learning Journey</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 1 Month */}
            <div className="bg-brand-black border border-slate-800 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">1 MONTH</h3>
              <div className="text-4xl font-bold text-gold-500 mb-4">₹1,499</div>
              <p className="text-slate-400 mb-8 border-b border-slate-800 pb-8">Short-term structured learning option.</p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {[
                  "1 month access", "Regular live classes during active course period",
                  "Market analysis sessions", "Trading concepts", "Practical chart examples",
                  "Trading psychology", "Risk management", "Community access", "Course resources"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-brand-dark rounded-xl mb-8 border border-slate-800">
                <div className="font-bold text-white mb-2 text-sm">1 MONTH KIS LAYI?</div>
                <div className="text-sm text-slate-400">Je tusi pehla sadda teaching style, live classes te learning approach experience karna chaunde ho, 1-month option tuhade layi suitable ho sakda hai.</div>
              </div>

              <button 
                onClick={() => setSelectedPlan('1month')}
                className="w-full py-4 bg-brand-dark border border-gold-500 hover:bg-gold-500 hover:text-brand-black text-gold-500 font-bold rounded-xl transition-all"
              >
                JOIN 1 MONTH →
              </button>
            </div>

            {/* 2 Months */}
            <div className="bg-gradient-to-b from-brand-black to-brand-dark border border-gold-500/50 rounded-3xl p-8 flex flex-col relative shadow-[0_0_30px_rgba(234,179,8,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-brand-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Better Value For Full Learning Journey
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">2 MONTHS</h3>
              <div className="text-4xl font-bold text-gold-500 mb-1">₹2,499 <span className="text-lg text-slate-400 font-normal">TOTAL</span></div>
              <div className="text-sm text-slate-500 mb-4">₹1,249.50/month equivalent</div>
              <p className="text-slate-400 mb-8 border-b border-slate-800 pb-8">
                2-month option ohna learners layi better suited hai jo foundation ton practical application tak complete learning journey continue karna chaunde ne.
              </p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {[
                  "2 months structured learning", "Full curriculum", "More time for practice",
                  "More live sessions during course period", "More market-analysis practice",
                  "More time to develop a routine", "More trade reviews", "More psychology practice",
                  "More opportunity to identify and correct mistakes", "Community access", "Course resources"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-brand-black rounded-xl mb-8 border border-slate-800">
                <div className="font-bold text-white mb-2 text-sm">2 MONTHS KIS LAYI?</div>
                <div className="text-sm text-slate-400">Je tusi concepts nu sirf sunna nahi, balki repeat practice, live chart analysis, trade review te psychology/risk management de naal proper learning routine build karna chaunde ho, 2-month option zyada complete learning period provide karda hai.</div>
              </div>

              <button 
                onClick={() => setSelectedPlan('2months')}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-lg"
              >
                JOIN 2 MONTHS →
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <p className="text-slate-400 text-lg leading-relaxed">
              Trading ik skill hai. Concepts samajhna first step hai; ohna nu charts te repeatedly observe te practice karna time la sakda hai. Is karke 2-month option ohna learners layi designed hai jo: 
              <span className="text-white font-medium block mt-4">Learn → Practice → Review → Improve</span>
              da complete cycle experience karna chaunde ne.
            </p>
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-gold-400"><span className="text-slate-500 text-sm block">MONTH 1:</span> Foundation</div>
              <div className="text-gold-400"><span className="text-slate-500 text-sm block">MONTH 2:</span> Practice + Refinement</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-brand-dark hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-brand-black">
                  <th className="p-6 font-bold text-white">Feature</th>
                  <th className="p-6 font-bold text-center text-white">1 Month</th>
                  <th className="p-6 font-bold text-center text-gold-400">2 Months</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { feature: "Structured Curriculum", m1: true, m2: true },
                  { feature: "Regular Live Classes", m1: true, m2: true },
                  { feature: "Market Analysis", m1: true, m2: true },
                  { feature: "Trading Psychology", m1: true, m2: true },
                  { feature: "Risk Management", m1: true, m2: true },
                  { feature: "Trading Practice", m1: true, m2: true },
                  { feature: "Course Resources", m1: true, m2: true },
                  { feature: "Learning Period", m1: "1 Month", m2: "2 Months" },
                  { feature: "Price", m1: "₹1,499", m2: "₹2,499" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="p-6 text-slate-300 font-medium">{row.feature}</td>
                    <td className="p-6 text-center text-slate-400">
                      {row.m1 === true ? <Check className="w-5 h-5 mx-auto text-emerald-500" /> : row.m1}
                    </td>
                    <td className="p-6 text-center text-gold-400 font-medium">
                      {row.m2 === true ? <Check className="w-5 h-5 mx-auto text-emerald-500" /> : row.m2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile cards for comparison */}
          <div className="md:hidden space-y-4">
            <h3 className="text-xl font-bold text-white text-center mb-6">Compare Options</h3>
            <div className="bg-brand-dark rounded-xl border border-slate-800 p-6">
              <h4 className="font-bold text-white mb-4 text-center">Features included in BOTH</h4>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li><Check className="w-4 h-4 inline text-emerald-500 mr-2"/> Structured Curriculum</li>
                <li><Check className="w-4 h-4 inline text-emerald-500 mr-2"/> Regular Live Classes</li>
                <li><Check className="w-4 h-4 inline text-emerald-500 mr-2"/> Market Analysis</li>
                <li><Check className="w-4 h-4 inline text-emerald-500 mr-2"/> Trading Psychology & Risk</li>
                <li><Check className="w-4 h-4 inline text-emerald-500 mr-2"/> Course Resources</li>
              </ul>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                <div>
                  <div className="text-slate-400 text-xs mb-1">1 MONTH</div>
                  <div className="font-bold text-white">₹1,499</div>
                </div>
                <div>
                  <div className="text-gold-400 text-xs mb-1">2 MONTHS</div>
                  <div className="font-bold text-gold-400">₹2,499</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY: NOT BUYING VS ARE GETTING */}
      <section className="py-24 bg-brand-dark border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white">COURSE BARE EH IMPORTANT POINTS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-brand-black border border-brand-red/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-red mb-6">You are NOT buying:</h3>
              <ul className="space-y-4">
                {[
                  "Guaranteed profit", "Guaranteed income", "Guaranteed winning trades",
                  "Guaranteed returns", "A magic strategy", "A promise that every trade will win"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <X className="w-5 h-5 text-brand-red" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-brand-black border border-emerald-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-500 mb-6">You ARE getting:</h3>
              <ul className="space-y-4">
                {[
                  "Structured education", "Live teaching", "Market-analysis practice",
                  "Trading concepts", "Risk-management education", "Psychology education",
                  "Practice environment", "Community learning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY VS COURSE */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-brand-dark border border-slate-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">FREE COMMUNITY vs STRUCTURED COURSE</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800">FREE COMMUNITY</h3>
                <ul className="space-y-4">
                  {[
                    "Weekly free workshop", "Educational updates", "Community discussions",
                    "Resources", "Announcements", "Instagram content", "Telegram updates", "WhatsApp community"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400">
                      <Check className="w-5 h-5 text-slate-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-400 mb-6 pb-4 border-b border-slate-800">STRUCTURED COURSE</h3>
                <ul className="space-y-4">
                  {[
                    "Regular live classes", "Structured curriculum", "More consistent learning schedule",
                    "Guided market analysis", "Practical chart work", "Trade planning/review",
                    "Psychology & risk management", "Longer learning journey", "More structured support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-gold-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PRICING & WIN-WIN */}
      <section className="py-24 bg-brand-dark border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">WHY ₹1,499 / ₹2,499?</h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>Asi hle M Forex Capital nu growing learning community de stage te build kar rahe haan. Sadda aim eh hai ke structured learning beginners layi comparatively accessible rahe.</p>
                <p>Regular classes prepare karan, market analyse karan, resources create karan te community nu active rakhhan layi time te effort lagda hai. Course fee us structured learning effort nu sustainable rakhhan ch help kardi hai.</p>
                <p>Tusi learn karde ho. Asi community nu consistently improve karan layi resources build karde haan. Eh ik simple win-win learning model hai.</p>
                <p className="text-brand-red font-medium italic mt-4">Course da purpose skill develop karna hai, income guarantee karna nahi.</p>
              </div>
            </div>

            <div className="bg-brand-black border border-gold-500/30 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold text-gold-400 mb-8">WIN-WIN LEARNING MODEL</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="font-bold text-white mb-2">YOU</div>
                  <div className="text-slate-400">Structured learning + regular practice + community</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-2">M FOREX CAPITAL</div>
                  <div className="text-slate-400">Course fee naal classes, resources te community development nu sustainable rakhna</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 pt-6 border-t border-slate-800">
                Par result har learner di practice, discipline, risk management te market conditions te depend karda hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE RESOURCES */}
      <section className="py-24 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">COURSE RESOURCES</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            <button onClick={() => onOpenGuide('candlestick')} className="flex flex-col items-center gap-4 p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-gold-500/50 transition-colors w-64">
              <BookOpen className="w-8 h-8 text-gold-500" />
              <div className="font-bold text-white">Candlestick Master Guide</div>
              <div className="text-xs text-gold-400 font-bold tracking-widest mt-2 border border-gold-500/30 px-3 py-1 rounded-full">OPEN GUIDE</div>
            </button>
            <button onClick={() => onOpenGuide('psychology')} className="flex flex-col items-center gap-4 p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-gold-500/50 transition-colors w-64">
              <BookOpen className="w-8 h-8 text-gold-500" />
              <div className="font-bold text-white">Trading Psychology Guide</div>
              <div className="text-xs text-gold-400 font-bold tracking-widest mt-2 border border-gold-500/30 px-3 py-1 rounded-full">OPEN GUIDE</div>
            </button>
            <button onClick={() => onOpenGuide('playbook')} className="flex flex-col items-center gap-4 p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-gold-500/50 transition-colors w-64">
              <BookOpen className="w-8 h-8 text-gold-500" />
              <div className="font-bold text-white">Trading Playbook</div>
              <div className="text-xs text-gold-400 font-bold tracking-widest mt-2 border border-gold-500/30 px-3 py-1 rounded-full">OPEN GUIDE</div>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-dark border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-6">
              {[
                { q: "Ki free community join kar sakde haan bina course de?", a: "Yes. Free community separate hai." },
                { q: "Free workshop kinne vaar hovegi?", a: "Target 1 workshop per week. Exact schedule community ch announce kita jawega." },
                { q: "Ki har din trade milegi?", a: "No guaranteed trade. Live classes ch market analyse kiti jawegi te valid setups identify karan di process sikhayi jawegi." },
                { q: "1 month te 2 months ch difference ki hai?", a: "Main difference learning duration te practice time da hai. 2-month option foundation ton practical application tak zyada time provide karda hai." },
                { q: "Ki beginner join kar sakda?", a: "Yes. Course beginner-friendly structured learning approach naal designed hai." },
                { q: "Ki profit guarantee hai?", a: "No. Trading ch profit guarantee nahi kiti ja sakdi." },
                { q: "Ki course lena compulsory hai?", a: "No. Free community te weekly educational workshop option available hai." }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-brand-black border border-slate-800 rounded-xl">
                  <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-12">OUR APPROACH</h2>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              <div className="flex flex-col gap-4 text-left">
                <div className="text-brand-red font-bold text-sm tracking-widest mb-2">WE SAY NO TO:</div>
                {["NO GUARANTEED PROFITS", "NO FAKE INCOME PROMISES", "NO PRESSURE TO BUY", "NO MAGIC STRATEGY"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-brand-red" /> {s}</div>
                ))}
              </div>
              <div className="flex flex-col gap-4 text-left">
                <div className="text-emerald-500 font-bold text-sm tracking-widest mb-2">WE SAY YES TO:</div>
                {["YES TO STRUCTURED LEARNING", "YES TO PRACTICE", "YES TO RISK MANAGEMENT", "YES TO PSYCHOLOGY", "YES TO DISCIPLINE"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300"><Check className="w-4 h-4 text-emerald-500" /> {s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTAS */}
      <section className="py-24 bg-gradient-to-b from-brand-black to-brand-dark border-t border-slate-800 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">COURSE NAHI LENA? No problem.</h2>
            <p className="text-slate-400 mb-8">Free weekly workshop attend karan layi community naal connected raho.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://chat.whatsapp.com/J8tVrd8z3iN0O9Zqf9eX2x" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-brand-dark border border-slate-700 text-white rounded-lg text-sm">JOIN WHATSAPP</a>
              <a href="https://t.me/+yjAXBlYqmP5iYjll" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-brand-dark border border-slate-700 text-white rounded-lg text-sm">JOIN TELEGRAM</a>
              <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-brand-dark border border-slate-700 text-white rounded-lg text-sm">FOLLOW INSTAGRAM</a>
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-10 bg-brand-black border border-gold-500/30 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gold-400 mb-4">STRUCTURED LEARNING CH INTERESTED?</h2>
            <p className="text-slate-300 mb-8">Je tusi 1 ya 2 months da structured course join karna chaunde ho, registration layi contact karo.</p>
            <div className="flex flex-col items-center gap-6">
              <a href="tel:+917973986978" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-lg w-full sm:w-auto text-lg">
                <Phone className="w-5 h-5" /> CONTACT FOR REGISTRATION
              </a>
              <div className="text-slate-400">
                <div className="text-xl font-bold text-white mb-1">+91 7973986978</div>
                <div className="text-sm">WhatsApp / Call</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL DISCLAIMER */}
      <section className="py-12 bg-brand-black border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center text-slate-500 text-sm leading-relaxed">
            <h4 className="font-bold mb-4 text-slate-400 tracking-widest">IMPORTANT DISCLAIMER</h4>
            <p className="mb-2">M Forex Capital te provide kita content educational purposes layi hai. Trading/forex market ch financial loss da risk hunda hai. Past performance future results di guarantee nahi hai.</p>
            <p className="mb-2">Kise vi live market analysis, example, setup ya simulated trade nu guaranteed profit signal na samjho.</p>
            <p>Har learner nu apni financial situation, risk tolerance te circumstances nu consider karna chahida hai.</p>
          </div>
        </div>
      </section>

      {/* FINAL BRAND MESSAGE */}
      <section className="py-24 bg-brand-dark text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-6 grayscale opacity-50"><Logo /></div>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest mb-4">M FOREX CAPITAL</h2>
          <p className="text-slate-400 mb-2">"Trading nu shortcut nahi — skill samjho."</p>
          <p className="text-gold-500/70 font-medium tracking-widest uppercase text-sm mt-8">Learn. Practice. Review. Improve. <br/><span className="text-white mt-2 block">Keep Growing.</span></p>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-dark border border-gold-500/30 rounded-2xl w-full max-w-md relative p-8 text-center shadow-2xl"
          >
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-gold-400 font-bold tracking-widest text-sm mb-4">M FOREX CAPITAL COURSE REGISTRATION</div>
            <h3 className="text-2xl font-bold text-white mb-2">Selected Plan</h3>
            <div className="text-3xl font-bold text-gold-500 mb-8">
              {selectedPlan === '1month' ? '1 Month — ₹1,499' : '2 Months — ₹2,499'}
            </div>
            
            <p className="text-slate-300 mb-8">Registration / payment details layi contact karo.</p>
            
            <a href="tel:+917973986978" className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-brand-black font-bold rounded-xl mb-4">
              <Phone className="w-5 h-5" /> CALL +91 7973986978
            </a>
            <a href="https://wa.me/917973986978" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold rounded-xl">
              WHATSAPP +91 7973986978
            </a>
            
            <p className="text-xs text-slate-500 mt-6">* Do NOT automatically mark someone as enrolled until payment/registration is manually confirmed via phone/WhatsApp.</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
