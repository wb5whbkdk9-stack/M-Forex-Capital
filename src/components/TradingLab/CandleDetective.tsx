import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { CANDLE_SCENARIOS, CandleScenario } from '../../data/candleScenarios';
import { getNextChallenge } from '../../lib/randomizer';

export function CandleDetective({ onComplete }: { onComplete: () => void }) {
  const { state, addXP, markCompleted, logMistake, getAdaptiveDifficulty } = useTradingLabState();
  
  const [sessionChallenges, setSessionChallenges] = useState<CandleScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Generate 3 unique challenges for this session
    const diff = getAdaptiveDifficulty();
    let currentRecents = [...state.recentCandles];
    const newChallenges: CandleScenario[] = [];
    
    for (let i = 0; i < 3; i++) {
      const challenge = getNextChallenge(CANDLE_SCENARIOS, currentRecents, diff);
      if (challenge) {
        newChallenges.push(challenge);
        currentRecents.push(challenge.id);
      }
    }
    setSessionChallenges(newChallenges);
  }, []);

  if (sessionChallenges.length === 0) return <div className="text-white p-8 text-center">Loading...</div>;

  const challenge = sessionChallenges[currentIndex];

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (challenge.options[index].isCorrect) {
      addXP(10);
    } else {
      logMistake(challenge.id, 'candle');
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionChallenges.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Mark all as recently seen
      sessionChallenges.forEach(c => markCompleted(c.id, 'candle', 'candle_explorer'));
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>🕯️</span> Candle Detective
        </h3>
        <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">
          {currentIndex + 1} / {sessionChallenges.length}
        </span>
      </div>

      <div className="mb-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center">
        <div className="flex justify-center items-end gap-2 h-40 mb-6 border-b border-slate-700/50 pb-4 relative">
           {challenge.chart.map((c, i) => (
             <div key={i} className={`w-8 relative flex justify-center items-center ${c.pos}`}>
                <div className={`w-0.5 absolute bg-slate-400 z-0 ${c.wickTop || ''} ${c.wickBottom || ''} ${!c.wickTop && !c.wickBottom ? 'h-full scale-y-150' : ''}`} />
                <div className={`w-full absolute z-10 rounded-sm ${c.height} ${c.color ? c.color : c.type === 'bull' ? 'bg-green-500' : 'bg-red-500'}`} />
             </div>
           ))}
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{challenge.name}</h4>
        <p className="text-sm text-slate-400">{challenge.description}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-4">{challenge.question}</h4>
        <div className="space-y-3">
          {challenge.options.map((opt, i) => {
            let btnClass = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800";
            if (showExplanation) {
              if (opt.isCorrect) {
                btnClass = "bg-green-900/20 border-green-500/50 text-green-400";
              } else if (i === selectedOption) {
                btnClass = "bg-red-900/20 border-red-500/50 text-red-400";
              } else {
                btnClass = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
              }
            } else if (i === selectedOption) {
               btnClass = "bg-gold-500/20 border-gold-500 text-gold-400";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${btnClass}`}
              >
                <span className="font-medium text-sm">{opt.text}</span>
                {showExplanation && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {showExplanation && !opt.isCorrect && i === selectedOption && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl mb-6 relative overflow-hidden"
          >
             <div className={`absolute top-0 left-0 w-1 h-full ${challenge.options[selectedOption!].isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
             <div className="flex items-start gap-3">
               <HelpCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
               <div>
                 <p className="text-sm font-bold text-white mb-2">
                   {challenge.options[selectedOption!].isCorrect ? 'Correct! +10 XP' : 'Not quite.'}
                 </p>
                 <p className="text-sm text-slate-300 leading-relaxed">{challenge.explanation}</p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-brand-black font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {currentIndex < sessionChallenges.length - 1 ? 'NEXT CHALLENGE' : 'FINISH MODULE'} <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
