import { motion } from 'framer-motion';

export function LearnCards() {
  const categories = [
    {
      title: "FOREX BASICS",
      items: ["Forex ki hai?", "Currency pairs", "Buy/Sell", "Spread", "Pip", "Lot", "Leverage", "Margin", "Sessions"]
    },
    {
      title: "CANDLESTICKS",
      items: ["Open, High, Low, Close", "Body & Wick", "Doji", "Hammer", "Shooting Star", "Engulfing", "Morning/Evening Star", "Pin Bar", "Inside Bar"]
    },
    {
      title: "MARKET STRUCTURE",
      items: ["Trend & Range", "Higher High (HH)", "Higher Low (HL)", "Lower High (LH)", "Lower Low (LL)", "Break of Structure", "Structure Shift"]
    },
    {
      title: "SUPPORT & RESISTANCE",
      items: ["Strong levels", "Reaction zones", "Breakout", "Fake breakout", "Retest"]
    },
    {
      title: "CONFIRMATION",
      items: ["Candle confirmation", "Level confirmation", "Structure confirmation", "Breakout confirmation", "Retest confirmation"]
    },
    {
      title: "RISK MANAGEMENT",
      items: ["Stop Loss", "Position sizing", "Risk %", "Risk/Reward", "R-multiple", "Drawdown"]
    },
    {
      title: "TRADING PSYCHOLOGY",
      items: ["FOMO", "Fear & Greed", "Revenge Trading", "Overtrading", "Patience", "Discipline"]
    },
    {
      title: "JOURNALING",
      items: ["Screenshot", "Setup & Entry", "SL & Target", "Emotion", "Result", "Lesson"]
    }
  ];

  return (
    <section id="learn" className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ki Sikhange?</h2>
          <p className="text-lg text-slate-400">Complete curriculum beginners ton advanced tak.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-card rounded-3xl border border-slate-800 p-6 hover:border-gold-500/20 transition-all"
            >
              <h3 className="font-bold text-gold-400 mb-4 border-b border-slate-700/50 pb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
