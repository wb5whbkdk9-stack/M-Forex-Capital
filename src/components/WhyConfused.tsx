import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export function WhyConfused() {
  const mistakes = [
    "Har Candle Nu Signal Samajhna",
    "Breakout Nu Chase Karna",
    "Too Many Indicators",
    "FOMO",
    "Revenge Trading",
    "Stop Loss Move Karna",
    "Random Entries",
    "Profit Di Jaldi"
  ];

  return (
    <section className="py-24 bg-brand-dark border-y border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Trading Shuru Karke Lok Confuse Kyon Ho Jande Ne?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {mistakes.map((mistake, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-card p-6 rounded-xl border border-slate-800 flex flex-col items-center text-center gap-4 hover:border-brand-red/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="font-semibold text-white">{mistake}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-brand-card/50 max-w-2xl mx-auto p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-slate-200 mb-6">
            Information bahut aa. <br/>
            <span className="text-gold-400">Structured learning thodi aa.</span>
          </p>
          <a href="#roadmap" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-medium transition-colors">
            PROCESS SIKHO <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
