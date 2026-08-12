import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { Target, CheckCircle2 } from 'lucide-react';

export function SpotMistake({ onComplete }: { onComplete: () => void }) {
  const { addXP, markCompleted } = useTradingLabState();
  const [found, setFound] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const MISTAKES = [
    { id: 1, top: '20%', left: '30%', text: 'Entry Too Early: Support tak price nahi aayi si.', xp: 10 },
    { id: 2, top: '40%', left: '60%', text: 'No Confirmation: Rejection candle nahi bani si.', xp: 10 },
    { id: 3, top: '70%', left: '40%', text: 'Random Stop Loss: SL structure de bahar nahi hai.', xp: 10 }
  ];

  const handleSpot = (id: number) => {
    if (!found.includes(id)) {
      setFound([...found, id]);
      addXP(10);
      if (found.length + 1 === MISTAKES.length) {
        setTimeout(() => setIsFinished(true), 1500);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
        <Target className="w-16 h-16 text-gold-500 mx-auto mb-6" />
        <h3 className="text-3xl font-display font-bold text-white mb-2">YOU FOUND 3/3 MISTAKES</h3>
        <button onClick={() => { markCompleted('spot_mistake', 'chart'); onComplete(); }} className="mt-8 w-full py-4 bg-gold-500 hover:bg-gold-400 text-brand-black font-bold rounded-xl">
          BACK TO LAB
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">🕵️ Spot The Mistake</h3>
        <p className="text-slate-400">Chart ch lukiyan 3 mistakes labho.</p>
      </div>

      <div className="relative w-full h-80 bg-[#131722] rounded-2xl border border-slate-800 mb-8 overflow-hidden">
        {/* Fake chart graphic */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDIwaDIwVjBIMHptMTkgMTlIMVYxSDE5eiIgZmlsbD0iIzMzMyIvPgo8L3N2Zz4=')]" />
        <div className="absolute top-1/2 w-full h-px bg-red-500/50 dashed" />
        
        {MISTAKES.map(m => {
          const isFound = found.includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => handleSpot(m.id)}
              className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 transition-all flex items-center justify-center
                ${isFound ? 'border-green-500 bg-green-500/20' : 'border-transparent hover:border-gold-500/30'}`}
              style={{ top: m.top, left: m.left }}
            >
              {isFound && <CheckCircle2 className="w-6 h-6 text-green-500" />}
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        {MISTAKES.map(m => (
          <div key={m.id} className={`p-4 rounded-xl border ${found.includes(m.id) ? 'bg-green-900/10 border-green-500/30 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
            {found.includes(m.id) ? m.text : 'Mistake hidden... tap the chart to find it.'}
          </div>
        ))}
      </div>
    </div>
  );
}
