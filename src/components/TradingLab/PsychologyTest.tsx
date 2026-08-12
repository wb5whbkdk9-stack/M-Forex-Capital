import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { PSYCH_SCENARIOS, PsychScenario } from '../../data/psychologyScenarios';
import { getNextChallenge } from '../../lib/randomizer';

export function PsychologyTest({ onComplete }: { onComplete: () => void }) {
  const { state, addXP, markCompleted, logMistake, getAdaptiveDifficulty } = useTradingLabState();
  
  const [sessionChallenges, setSessionChallenges] = useState<PsychScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const diff = getAdaptiveDifficulty();
    let currentRecents = [...state.recentPsych];
    const newChallenges: PsychScenario[] = [];
    
    for (let i = 0; i < 3; i++) {
      const challenge = getNextChallenge(PSYCH_SCENARIOS, currentRecents, diff);
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
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    
    if (challenge.options[index].correct) {
      addXP(15); // Good psych decisions get high XP
    } else {
      logMistake(challenge.id, 'psych');
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionChallenges.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      sessionChallenges.forEach(c => markCompleted(c.id, 'psych', 'psychology_aware'));
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>🧠</span> Psychology Test
        </h3>
        <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">
          {currentIndex + 1} / {sessionChallenges.length}
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 relative">
         <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">💭</div>
         <p className="text-xl text-white leading-relaxed relative z-10">{challenge.scenario}</p>
      </div>

      <div className="space-y-4 mb-8">
        {challenge.options.map((opt, i) => {
          const isSelected = selectedOption === i;
          let btnClass = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800";
          
          if (showResult) {
            if (opt.correct) {
               btnClass = "bg-green-900/20 border-green-500/50 text-green-400";
            } else if (isSelected) {
               btnClass = "bg-red-900/20 border-red-500/50 text-red-400";
            } else {
               btn: "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
            }
          } else if (isSelected) {
             btnClass = "bg-gold-500/20 border-gold-500 text-gold-400";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left p-5 rounded-xl border transition-all flex items-start justify-between gap-4 ${btnClass}`}
            >
              <span className="font-medium">{opt.text}</span>
              {showResult && opt.correct && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
              {showResult && !opt.correct && isSelected && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 border rounded-2xl mb-8 relative overflow-hidden ${
              challenge.options[selectedOption!].correct ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
               <span className="text-xs font-bold px-2 py-1 bg-slate-800 rounded text-slate-300">
                  Mindset: {challenge.options[selectedOption!].trait}
               </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {challenge.options[selectedOption!].explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-brand-black font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {currentIndex < sessionChallenges.length - 1 ? 'NEXT SCENARIO' : 'FINISH TEST'} <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
