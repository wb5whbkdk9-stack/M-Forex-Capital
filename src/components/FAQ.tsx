import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "M Forex Capital ki hai?", a: "Eh ik forex trading education platform te community hai jithe asi beginners nu easy Punjabi ch trading basics ton advanced concepts tak sikhaunde haan." },
  { q: "Ki complete beginner join kar sakda?", a: "Bilkul. Saada curriculum specially beginners layi hi design kita gaya hai. Tusi Level 1 (Forex Basics) ton start kar sakde ho." },
  { q: "Ki profit guarantee hai?", a: "Nahi. Trading vich koi guarantee nahi hundi. Asi sirf skill, knowledge te risk management sikhaunde haan." },
  { q: "Ki candles alone enough ne?", a: "Nahi. Candles nu market structure, key levels te proper risk management naal combine karna zaroori hai." },
  { q: "M Forex AI ki help karega?", a: "AI tuhanu trading terms samajhan, concepts revise karan te doubts clear karan ch educational help karega easy Punjabi ch." },
  { q: "Community kiven join karni?", a: "Website te kite vi 'JOIN COMMUNITY' button te click karo, tuhanu WhatsApp, Telegram te Instagram de links mil jaan ge." },
  { q: "Ki M Forex Capital broker hai?", a: "Nahi, asi broker nahi haan. Asi sirf education te community provide karde haan." }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-brand-black border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">FAQ</h2>
          <p className="text-lg text-slate-400">Tuhade sawaal, saade jawaab.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-brand-card border border-slate-800 rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
              >
                <span className="font-bold text-white pr-8">{faq.q}</span>
                {open === i ? (
                  <Minus className="w-5 h-5 text-gold-500 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4 mt-2">
                      {faq.a}
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
