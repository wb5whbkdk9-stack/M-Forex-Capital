import { useState } from 'react';
import { Search } from 'lucide-react';

const terms = [
  { term: "Forex", en: "Foreign Exchange", desc: "Ik desh di currency nu dusre desh di currency naal exchange karna. Trading market jithe currencies trade hundiyan ne.", ex: "EUR/USD buy karan da matlab Euro buy karke US Dollar sell karna." },
  { term: "Pip", en: "Percentage in Point", desc: "Currency pair di movement measure karan da chota unit.", ex: "Je EUR/USD 1.1000 ton 1.1001 janda hai, tan eh 1 Pip di movement hai." },
  { term: "Lot", en: "Position Size", desc: "Tusi kinni quantity trade kar rahe ho. Standard lot = 100,000 units.", ex: "0.01 lot (Micro lot) beginners layi safer hunda hai." },
  { term: "Spread", en: "Bid/Ask Difference", desc: "Buy price te sell price de vichkar da difference. Eh broker di fees hundi hai.", ex: "Je buy 1.1002 te hai te sell 1.1000 te, spread 2 pips hai." },
  { term: "Stop Loss", en: "SL", desc: "Ik pre-set level jithe trade automatically close ho jandi hai taan jo zyada loss na hove.", ex: "1.1000 te buy kita, 1.0980 te SL laya (20 pips risk)." },
  { term: "Take Profit", en: "TP", desc: "Ik pre-set level jithe trade profit ch automatically close ho jandi hai.", ex: "1.1000 te buy kita, 1.1040 te TP laya (40 pips target)." },
  { term: "Risk/Reward", en: "RR Ratio", desc: "Tusi kinna risk le rahe ho vs kinna profit target kar rahe ho.", ex: "1:2 RR da matlab $10 risk karke $20 target karna." },
  { term: "FOMO", en: "Fear of Missing Out", desc: "Eh darr ke market thode bina move kar jayegi, jis karke tusi wrong entry le lende ho.", ex: "Badi candle vekh ke ekdum buy kar lena bina support check kite." }
];

export function Glossary() {
  const [search, setSearch] = useState("");
  
  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 bg-brand-black border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Trading Glossary</h2>
          <p className="text-lg text-slate-400 mb-8">Trading terms easy Punjabi ch samjho.</p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Trading term search karo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-card border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {filteredTerms.map((t, i) => (
            <div key={i} className="bg-brand-card p-6 rounded-xl border border-slate-800 hover:border-slate-700/50 transition-colors">
              <div className="flex items-end justify-between mb-3 border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-gold-400">{t.term}</h3>
                <span className="text-xs text-slate-500">{t.en}</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">{t.desc}</p>
              <div className="bg-brand-dark rounded-lg p-3 text-xs text-slate-400 italic">
                <span className="text-brand-green not-italic font-medium mr-2">Ex:</span>
                {t.ex}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
