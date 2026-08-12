import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const patterns = [
  {
    name: "HAMMER",
    visual: (
      <svg viewBox="0 0 100 200" className="w-16 h-32 md:w-24 md:h-48 drop-shadow-xl">
        <line x1="50" y1="20" x2="50" y2="180" stroke="#10B981" strokeWidth="4" />
        <rect x="35" y="20" width="30" height="40" fill="#10B981" />
      </svg>
    ),
    description: "Hammer ik single candle pattern hai jisdi body choti hundi hai te lower wick bahut lambi.",
    indicates: "Strong buying pressure from lows. Bears ne price thalle lejan di koshish kiti par bulls ne wapas control le lya.",
    location: "Support level ya downtrend de end te sab ton zyada meaningful hunda hai.",
    confirmation: "Next candle da bullish close (Green candle) hammer de upar.",
    mistake: "Bina support level check kite, random jagah te hammer dekh ke buy karna."
  },
  {
    name: "SHOOTING STAR",
    visual: (
      <svg viewBox="0 0 100 200" className="w-16 h-32 md:w-24 md:h-48 drop-shadow-xl">
        <line x1="50" y1="20" x2="50" y2="180" stroke="#EF4444" strokeWidth="4" />
        <rect x="35" y="140" width="30" height="40" fill="#EF4444" />
      </svg>
    ),
    description: "Shooting Star ik single candle pattern hai jisdi body choti hundi hai te upper wick bahut lambi.",
    indicates: "Strong selling pressure from highs. Bulls ne price upar lejan di koshish kiti par bears ne wapas control le lya.",
    location: "Resistance level ya uptrend de top te.",
    confirmation: "Next candle da bearish close (Red candle) shooting star de thalle.",
    mistake: "Bina resistance de, sirf lambi wick dekh ke sell karna."
  },
  {
    name: "DOJI",
    visual: (
      <svg viewBox="0 0 100 200" className="w-16 h-32 md:w-24 md:h-48 drop-shadow-xl">
        <line x1="50" y1="20" x2="50" y2="180" stroke="#94a3b8" strokeWidth="4" />
        <rect x="30" y="95" width="40" height="10" fill="#94a3b8" />
      </svg>
    ),
    description: "Doji oh candle hai jithe open te close lagbhag same hunde ne, body na-matar hundi hai.",
    indicates: "Indecision. Bulls te bears ch barabar di takkar. Kise da clear control nahi.",
    location: "Support/Resistance te ya lambe trend ton baad.",
    confirmation: "Doji ton baad aali candle jis side break karegi (up ya down), oh direction clear karegi.",
    mistake: "Doji nu reversal signal samajh lena. Doji sirf indecision hai, reversal nahi."
  },
  {
    name: "ENGULFING (BULLISH)",
    visual: (
      <div className="flex items-end gap-2 h-32 md:h-48">
        <svg viewBox="0 0 100 200" className="w-10 h-24 md:w-16 md:h-36 drop-shadow-xl">
          <line x1="50" y1="40" x2="50" y2="160" stroke="#EF4444" strokeWidth="4" />
          <rect x="35" y="80" width="30" height="60" fill="#EF4444" />
        </svg>
        <svg viewBox="0 0 100 200" className="w-12 h-32 md:w-20 md:h-48 drop-shadow-xl">
          <line x1="50" y1="20" x2="50" y2="180" stroke="#10B981" strokeWidth="4" />
          <rect x="30" y="40" width="40" height="120" fill="#10B981" />
        </svg>
      </div>
    ),
    description: "Jad ik green candle pichli red candle di body nu puri tarah cover (engulf) kar lendi hai.",
    indicates: "Bulls ne bears nu puri tarah overpower kar lya hai. Strong momentum shift.",
    location: "Support level te.",
    confirmation: "Engulfing candle da close hona.",
    mistake: "Candle close hon ton pehla hi trade le lena (Kai vaar end ch wick ban jandi aa)."
  }
];

export function CandleLab() {
  const [activePattern, setActivePattern] = useState(patterns[0]);

  return (
    <section className="py-24 bg-brand-black border-t border-slate-800 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-bold mb-6">
            <span className="animate-pulse">🔥</span> CANDLESTICK LAB
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Visual Learning</h2>
          <p className="text-lg text-slate-400">Pattern te click karo te usdi psychology samjho.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {patterns.map((p) => (
            <button
              key={p.name}
              onClick={() => setActivePattern(p)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activePattern.name === p.name
                  ? 'bg-gold-500 text-brand-black shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'bg-brand-card text-slate-300 border border-slate-700/50 hover:border-gold-500/50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-brand-card rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-5 min-h-[400px]">
            {/* Visual Area */}
            <div className="md:col-span-2 bg-brand-dark/50 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePattern.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  {activePattern.visual}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info Area */}
            <div className="md:col-span-3 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePattern.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{activePattern.name}</h3>
                    <p className="text-lg text-gold-400">{activePattern.description}</p>
                  </div>

                  <div className="space-y-4 text-sm text-slate-300">
                    <div>
                      <strong className="text-white block mb-1">Psychology:</strong>
                      {activePattern.indicates}
                    </div>
                    <div>
                      <strong className="text-white block mb-1">Kithe Meaningful Hai?</strong>
                      {activePattern.location}
                    </div>
                    <div>
                      <strong className="text-white block mb-1">Confirmation:</strong>
                      {activePattern.confirmation}
                    </div>
                  </div>

                  <div className="mt-8 bg-brand-red/10 border border-brand-red/20 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-red block text-sm mb-1">Beginner Mistake</strong>
                      <p className="text-sm text-brand-red/80">{activePattern.mistake}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-slate-400 font-medium">
          Important: <span className="text-white">Pattern alone = NOT a guaranteed entry.</span>
        </div>
      </div>
    </section>
  );
}
