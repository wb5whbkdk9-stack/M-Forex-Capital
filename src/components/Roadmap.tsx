import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

const roadmapLevels = [
  { level: "01", title: "Forex Basics", desc: "Market basics, pairs, terminology.", what: "Forex market kiven kam kardi hai.", why: "Foundation bina aage nahi vadh sakde." },
  { level: "02", title: "Candlesticks", desc: "Price action via candles.", what: "Single te multiple candle patterns.", why: "Price chart read karan di pehli siri." },
  { level: "03", title: "Support & Resistance", desc: "Key levels of interest.", what: "Market de turning points identify karna.", why: "Random entries ton bachaya ja sakda." },
  { level: "04", title: "Market Structure", desc: "Trend identification.", what: "HH, HL, LH, LL concepts.", why: "Trend is your friend." },
  { level: "05", title: "Price Action", desc: "Pure chart reading.", what: "Without indicators market read karna.", why: "Indicators lag hunde ne, price real-time hunda hai." },
  { level: "06", title: "Confirmation", desc: "Entry trigger.", what: "Setup banan ton baad signal di wait.", why: "Fakeouts ton bachan layi." },
  { level: "07", title: "Entries & Retests", desc: "Execution timing.", what: "Sahi jagah te order place karna.", why: "Better risk to reward layi." },
  { level: "08", title: "Risk Management", desc: "Capital protection.", what: "Lot size, SL, Risk per trade.", why: "Market ch survive karan layi sab ton zaroori." },
  { level: "09", title: "Trading Psychology", desc: "Mindset mastery.", what: "Emotions control karna.", why: "Strategy 20%, Mindset 80%." },
  { level: "10", title: "Journaling & Backtesting", desc: "Self analysis.", what: "Apni trades nu record karna.", why: "Apni mistakes ton sikhan layi." },
  { level: "11", title: "Live Market Implementation", desc: "Real-world execution.", what: "Sikhe hue concepts nu live chart te apply karna.", why: "Theory nu practical experience ch convert karna." }
];

export function Roadmap() {
  const [openLevel, setOpenLevel] = useState<string | null>("01");

  return (
    <section id="roadmap" className="py-24 bg-brand-black border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Learning Roadmap</h2>
          <p className="text-lg text-slate-400">Step-by-step journey beginner ton professional tak.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {roadmapLevels.map((item) => (
            <div key={item.level} className="mb-4">
              <button
                onClick={() => setOpenLevel(openLevel === item.level ? null : item.level)}
                className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all ${
                  openLevel === item.level
                    ? 'bg-brand-card border-gold-500'
                    : 'bg-brand-dark border-slate-800 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-6 text-left">
                  <span className={`text-2xl md:text-3xl font-black ${openLevel === item.level ? 'text-gold-500' : 'text-white/20'}`}>
                    {item.level}
                  </span>
                  <div>
                    <h3 className={`font-bold text-lg md:text-xl ${openLevel === item.level ? 'text-white' : 'text-slate-300'}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 hidden md:block">{item.desc}</p>
                  </div>
                </div>
                {openLevel === item.level ? <ChevronDown className="text-gold-500" /> : <ChevronRight className="text-slate-600" />}
              </button>
              
              <AnimatePresence>
                {openLevel === item.level && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 mx-4 md:mx-12 mt-2 bg-brand-card/50 border border-slate-800 rounded-xl space-y-4 text-sm text-slate-300">
                      <div>
                        <strong className="text-gold-400 block mb-1">Ki sikhange?</strong>
                        {item.what}
                      </div>
                      <div>
                        <strong className="text-gold-400 block mb-1">Kyon zaroori hai?</strong>
                        {item.why}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
