import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { CheckCircle2, ChevronRight, Target, Crosshair, Eye } from 'lucide-react';
import { SETUP_SCENARIOS, SetupScenario } from '../../data/setupScenarios';
import { getNextChallenge } from '../../lib/randomizer';

export function SetupHunter({ onComplete }: { onComplete: () => void }) {
  const { state, addXP, markCompleted, logMistake, getAdaptiveDifficulty } = useTradingLabState();
  
  const [sessionChallenges, setSessionChallenges] = useState<SetupScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0); // 0: bias, 1: level, 2: confirmation, 3: result
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  useEffect(() => {
    const diff = getAdaptiveDifficulty();
    let currentRecents = [...state.recentSetups];
    const newChallenges: SetupScenario[] = [];
    
    for (let i = 0; i < 2; i++) { // 2 challenges per session for setup hunter (longer format)
      const challenge = getNextChallenge(SETUP_SCENARIOS, currentRecents, diff);
      if (challenge) {
        newChallenges.push(challenge);
        currentRecents.push(challenge.id);
      }
    }
    setSessionChallenges(newChallenges);
  }, []);

  if (sessionChallenges.length === 0) return <div className="text-white p-8 text-center">Loading...</div>;

  const challenge = sessionChallenges[currentIndex];

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleNextStep = () => {
    setShowAnswer(false);
    setStep(s => s + 1);
  };

  const handleResultSelect = (opt: string) => {
    if (selectedResult) return;
    setSelectedResult(opt);
    
    if (opt === challenge.result.correct) {
      addXP(30);
    } else {
      logMistake(challenge.id, 'setup');
    }
  };

  const handleNextChallenge = () => {
    if (currentIndex < sessionChallenges.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setStep(0);
      setShowAnswer(false);
      setSelectedResult(null);
    } else {
      sessionChallenges.forEach(c => markCompleted(c.id, 'setup', 'setup_hunter'));
      onComplete();
    }
  };

  const currentPhaseData = step === 0 ? challenge.bias : step === 1 ? challenge.level : step === 2 ? challenge.confirmation : null;
  const icons = [<Eye key={1}/>, <Target key={2}/>, <Crosshair key={3}/>];

  return (
    <div className="max-w-3xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>🎯</span> Setup Hunter
        </h3>
        <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">
          {currentIndex + 1} / {sessionChallenges.length}
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-center">
        <h4 className="text-gold-500 font-bold mb-2 uppercase tracking-wider text-sm">Market Context</h4>
        <p className="text-white text-lg">{challenge.context}</p>
      </div>

      <div className="flex gap-2 mb-8">
        {['Bias', 'Level', 'Confirmation', 'Action'].map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-2 rounded-full mb-2 transition-all ${
              step > i ? 'bg-green-500' : step === i ? 'bg-gold-500' : 'bg-slate-800'
            }`} />
            <div className={`text-xs text-center font-bold ${
               step >= i ? 'text-white' : 'text-slate-600'
            }`}>{label}</div>
          </div>
        ))}
      </div>

      {step < 3 && currentPhaseData && (
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6 text-xl font-medium text-white">
             <div className="w-12 h-12 rounded-xl bg-slate-800 text-gold-500 flex items-center justify-center shrink-0">
                {icons[step]}
             </div>
             {currentPhaseData.q}
          </div>

          {!showAnswer ? (
             <button
               onClick={handleReveal}
               className="w-full py-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
             >
               Reveal Correct Answer
             </button>
          ) : (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-green-900/10 border border-green-500/30 rounded-2xl p-6"
             >
               <h4 className="text-xl font-bold text-green-400 mb-2">{currentPhaseData.a}</h4>
               <p className="text-slate-300">{currentPhaseData.exp}</p>
               <button
                 onClick={handleNextStep}
                 className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
               >
                 Next Step
               </button>
             </motion.div>
          )}
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h4 className="text-xl font-medium text-white mb-6 text-center">{challenge.result.q}</h4>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {challenge.result.options.map((opt, i) => {
              const isSelected = selectedResult === opt;
              const isCorrect = opt === challenge.result.correct;
              
              let btnClass = "bg-slate-900 border-slate-800 text-white hover:bg-slate-800";
              if (selectedResult) {
                if (isCorrect) btnClass = "bg-green-900/40 border-green-500 text-green-400";
                else if (isSelected) btnClass = "bg-red-900/40 border-red-500 text-red-400";
                else btnClass = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleResultSelect(opt)}
                  disabled={!!selectedResult}
                  className={`py-4 rounded-xl border-2 font-bold transition-all flex justify-center items-center gap-2 ${btnClass}`}
                >
                  {opt}
                  {selectedResult && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {selectedResult && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`p-6 border rounded-2xl text-center ${
                   selectedResult === challenge.result.correct ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'
                 }`}
               >
                 <p className="text-lg text-white mb-4">{challenge.result.feedback}</p>
                 <button
                   onClick={handleNextChallenge}
                   className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-brand-black rounded-xl font-bold inline-flex items-center gap-2"
                 >
                   {currentIndex < sessionChallenges.length - 1 ? 'Next Setup' : 'Finish Module'} <ChevronRight className="w-5 h-5" />
                 </button>
               </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
