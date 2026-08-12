import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { Rocket, CheckCircle2, Lock } from 'lucide-react';

const DAYS = [
  { id: 'd1', title: 'What is Forex?', desc: 'Market basics.', content: 'Forex duniya di sab ton vaddi market hai jithe currency pairs exchange hunde ne.' },
  { id: 'd2', title: 'Candlestick Basics', desc: 'Read the language.', content: 'Candle open, close, high, aur low price darshandi hai. Green = Price upar gai, Red = Price thalle aayi.' },
  { id: 'd3', title: 'Support', desc: 'The Floor.', content: 'Support oh level hai jithe buyers strongly market ch aunde ne aur price nu thalle digan ton rokde ne.' }
];

export function ThirtyDayChallenge({ onComplete }: { onComplete: () => void }) {
  const { state, addXP, mark30DayCompleted } = useTradingLabState();
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const handleComplete = () => {
    mark30DayCompleted(selectedDay.id);
    addXP(15);
    setSelectedDay(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Rocket className="w-12 h-12 text-gold-500 mx-auto mb-4" />
        <h3 className="text-3xl font-display font-bold text-white mb-2">30 DAYS — 30 LESSONS</h3>
        <p className="text-slate-400">Har roz ek navan trading concept sikho te XP earn karo.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {DAYS.map((day, i) => {
          const isCompleted = state.thirtyDayProgress.includes(day.id);
          const isLocked = !isCompleted && i > 0 && !state.thirtyDayProgress.includes(DAYS[i-1].id);

          return (
            <button
              key={day.id}
              disabled={isLocked}
              onClick={() => !isLocked && setSelectedDay(day)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isCompleted ? 'bg-gold-500/10 border-gold-500/30' : 
                isLocked ? 'bg-slate-900/30 border-slate-800 opacity-50' : 
                'bg-slate-900 border-slate-700 hover:border-gold-500'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 block">Day {i + 1}</span>
              <span className={`font-bold block ${isCompleted ? 'text-gold-400' : 'text-slate-200'}`}>{day.title}</span>
              {isCompleted && <CheckCircle2 className="absolute bottom-3 right-3 w-4 h-4 text-gold-500" />}
              {isLocked && <Lock className="absolute bottom-3 right-3 w-4 h-4 text-slate-600" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-brand-dark border border-slate-700 rounded-2xl p-8 max-w-lg w-full relative">
              <h3 className="text-2xl font-bold text-white mb-4">{selectedDay.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-8">{selectedDay.content}</p>
              <div className="flex gap-4">
                <button onClick={() => setSelectedDay(null)} className="flex-1 py-3 text-white bg-slate-800 rounded-xl font-bold">Close</button>
                {!state.thirtyDayProgress.includes(selectedDay.id) && (
                  <button onClick={handleComplete} className="flex-1 py-3 bg-gold-500 text-brand-black rounded-xl font-bold">Mark Complete (+15 XP)</button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
