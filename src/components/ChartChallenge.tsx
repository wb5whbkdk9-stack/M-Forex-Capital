import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const chartConcepts = {
  support: {
    title: "Support",
    desc: "Support oh area hai jithe price nu pehla buying reaction mil sakdi hai. Eh 'floor' da kam karda hai.",
    lineY: 250,
    color: "#10B981"
  },
  resistance: {
    title: "Resistance",
    desc: "Resistance oh area hai jithe price nu selling reaction mil sakdi hai. Eh 'ceiling' da kam karda hai.",
    lineY: 50,
    color: "#EF4444"
  },
  breakout: {
    title: "Breakout",
    desc: "Jadon price strong momentum naal kise key level (support ya resistance) nu tod dinda hai.",
    lineY: 150,
    color: "#F59E0B"
  },
  retest: {
    title: "Retest",
    desc: "Breakout ton baad jad price wapas us level nu test karan aundi hai. Puraani resistance navi support ban sakdi hai.",
    lineY: 150,
    color: "#3B82F6"
  }
};

export function ChartChallenge() {
  const [activeConcept, setActiveConcept] = useState<keyof typeof chartConcepts>('support');

  return (
    <section className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Support & Resistance</h2>
          <p className="text-lg text-slate-400">Interactive chart rahi concept nu visually samjho.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-3 flex flex-col justify-center">
            {(Object.keys(chartConcepts) as Array<keyof typeof chartConcepts>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveConcept(key)}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${
                  activeConcept === key
                    ? 'bg-gold-500 text-brand-black shadow-lg'
                    : 'bg-brand-card text-slate-300 border border-slate-700/50 hover:border-gold-500/50'
                }`}
              >
                {chartConcepts[key].title}
                {activeConcept === key && <Info className="w-5 h-5" />}
              </button>
            ))}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 bg-brand-card border border-slate-700/50 p-6 rounded-xl"
              >
                <h4 className="font-bold text-gold-400 mb-2">{chartConcepts[activeConcept].title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {chartConcepts[activeConcept].desc}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-4 text-xs text-brand-red/80 font-medium">
              * Level = decision area. Automatic entry nahi.
            </div>
          </div>

          {/* Interactive Chart Area */}
          <div className="lg:col-span-2 bg-brand-black rounded-3xl border border-slate-700/50 p-4 md:p-8 relative min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            
            {/* The Line */}
            <motion.div
              animate={{ y: chartConcepts[activeConcept].lineY - 150 }} // Offset for center
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute left-0 right-0 h-0.5 z-10 shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: chartConcepts[activeConcept].color, color: chartConcepts[activeConcept].color }}
            >
              <div className="absolute -top-6 right-4 text-xs font-bold px-2 py-1 rounded bg-brand-black border" style={{ borderColor: chartConcepts[activeConcept].color, color: chartConcepts[activeConcept].color }}>
                {chartConcepts[activeConcept].title.toUpperCase()}
              </div>
            </motion.div>

            {/* Abstract Price Action Line (Static but we move the zone) */}
            <svg className="w-full h-[300px] relative z-0" viewBox="0 0 800 300" preserveAspectRatio="none">
              <path 
                d="M 0 150 Q 100 250 200 150 T 400 150 T 600 50 Q 700 150 800 100" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="opacity-50"
              />
              <circle cx="200" cy="150" r="6" fill="#fff" />
              <circle cx="400" cy="150" r="6" fill="#fff" />
              <circle cx="600" cy="50" r="6" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
