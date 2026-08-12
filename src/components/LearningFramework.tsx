import { motion } from 'framer-motion';

export function LearningFramework() {
  const steps = [
    { num: "01", title: "MARKET BIAS", desc: "Market bullish, bearish ya range ch?" },
    { num: "02", title: "MARKET STRUCTURE", desc: "Higher High, Higher Low, Lower High, Lower Low." },
    { num: "03", title: "KEY LEVELS", desc: "Support, Resistance, Previous High/Low." },
    { num: "04", title: "CANDLESTICK", desc: "Price behaviour ki dass rahi?" },
    { num: "05", title: "CONFIRMATION", desc: "Setup nu proper confirmation mili?" },
    { num: "06", title: "ENTRY", desc: "Entry da logical trigger ki?" },
    { num: "07", title: "RISK MANAGEMENT", desc: "SL, Risk %, Position Size." },
    { num: "08", title: "TRADING PSYCHOLOGY", desc: "FOMO, Fear, Greed, Revenge." },
    { num: "09", title: "JOURNAL", desc: "Trade kyon lyi? Ki sikhya?" }
  ];

  return (
    <section className="py-24 bg-brand-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">M Forex Capital Learning Framework</h2>
          <p className="text-lg text-slate-400">Ik proper step-by-step process professional trading layi.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-gold-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 text-6xl font-black text-white/5 group-hover:text-gold-500/10 transition-colors pointer-events-none">
                {step.num}
              </div>
              <div className="text-gold-500 font-bold mb-2 text-sm tracking-wider">{step.num} {step.title}</div>
              <p className="text-slate-300 relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-4 rounded-xl bg-brand-dark border border-gold-500/20 text-gold-400 font-bold tracking-widest text-sm md:text-base">
            STRUCTURE → LEVEL → CONFIRMATION → RISK → EXECUTION
          </div>
        </div>
      </div>
    </section>
  );
}
