import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { Swords, Flame } from 'lucide-react';

export function BossBattle({ onComplete }: { onComplete: () => void }) {
  const { addXP, markCompleted } = useTradingLabState();
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);

  const STAGES = [
    { title: 'The Fast Breakout', text: 'Market achanak resistance break kar k upar ja rehi hai. Boht lambi green candle ban gai.', choices: [{ c: 'BUY NOW (FOMO)', s: -5 }, { c: 'WAIT FOR RETEST', s: 20 }] },
    { title: 'The Fakeout', text: 'Price ne retest di koshish kiti par support tod k thalle aa gai. Bull trap lag reha.', choices: [{ c: 'SELL IMMEDIATELY', s: -5 }, { c: 'WAIT FOR CANDLE CLOSE', s: 20 }] }
  ];

  const handleSelect = (s: number) => {
    setScore(curr => curr + s);
    if (stage < STAGES.length - 1) {
      setStage(stage + 1);
    } else {
      setStage(99);
      addXP(50);
      markCompleted('boss_battle', 'psych', 'boss_battle');
    }
  };

  if (stage === 99) {
    return (
      <div className="max-w-2xl mx-auto bg-brand-black border border-red-900/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.15)] text-center">
        <Trophy score={score} onComplete={onComplete} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-brand-black border border-red-900/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-900" />
      <div className="flex items-center justify-center gap-3 mb-8">
        <Flame className="w-8 h-8 text-red-500" />
        <h3 className="text-3xl font-display font-bold text-white tracking-widest uppercase">THE FOMO MARKET</h3>
      </div>
      <h4 className="text-xl text-gold-500 font-bold text-center mb-2">Round {stage + 1}</h4>
      <p className="text-center text-slate-300 mb-8">{STAGES[stage].title}</p>
      
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center mb-8">
        <p className="text-lg text-white font-medium">{STAGES[stage].text}</p>
      </div>

      <div className="flex gap-4">
        {STAGES[stage].choices.map((c, i) => (
          <button key={i} onClick={() => handleSelect(c.s)} className="flex-1 p-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700">
            {c.c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Trophy({ score, onComplete }: { score: number, onComplete: () => void }) {
  return (
    <>
      <Swords className="w-16 h-16 text-red-500 mx-auto mb-6" />
      <h3 className="text-3xl font-display font-bold text-white mb-2">BOSS BATTLE COMPLETE</h3>
      <p className="text-slate-400 mb-8">Tusi the fomo market nu survive kar leya.</p>
      <div className="text-5xl font-bold text-gold-400 mb-2">{Math.max(0, score + 42)} / 100</div>
      <p className="text-sm text-gold-500 uppercase tracking-widest font-bold mb-8">Process Score</p>
      <button onClick={onComplete} className="w-full py-4 bg-gold-500 font-bold rounded-xl text-brand-black">BACK TO LAB</button>
    </>
  )
}
