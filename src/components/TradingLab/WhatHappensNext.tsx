import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { Play, CheckCircle2, XCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { CHART_SCENARIOS, ChartScenario } from '../../data/chartScenarios';
import { getNextChallenge } from '../../lib/randomizer';

export function WhatHappensNext({ onComplete }: { onComplete: () => void }) {
  const { state, addXP, markCompleted, logMistake, getAdaptiveDifficulty } = useTradingLabState();
  
  const [sessionChallenges, setSessionChallenges] = useState<ChartScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const diff = getAdaptiveDifficulty();
    let currentRecents = [...state.recentCharts];
    const newChallenges: ChartScenario[] = [];
    
    for (let i = 0; i < 3; i++) {
      const challenge = getNextChallenge(CHART_SCENARIOS, currentRecents, diff);
      if (challenge) {
        newChallenges.push(challenge);
        currentRecents.push(challenge.id);
      }
    }
    setSessionChallenges(newChallenges);
  }, []);

  if (sessionChallenges.length === 0) return <div className="text-white p-8 text-center">Loading...</div>;

  const challenge = sessionChallenges[currentIndex];

  const handleAction = (action: string) => {
    if (showResult) return;
    setSelectedAction(action);
    setShowResult(true);

    const feedback = challenge.feedback[action];
    if (feedback.xp > 0) {
      addXP(feedback.xp);
    } else {
      logMistake(challenge.id, 'chart');
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionChallenges.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedAction(null);
      setShowResult(false);
    } else {
      sessionChallenges.forEach(c => markCompleted(c.id, 'chart', 'chart_reader'));
      onComplete();
    }
  };

  const currentFeedback = selectedAction ? challenge.feedback[selectedAction] : null;

  return (
    <div className="max-w-3xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>📈</span> What Happens Next?
        </h3>
        <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">
          {currentIndex + 1} / {sessionChallenges.length}
        </span>
      </div>

      <p className="text-slate-400 mb-6">{challenge.context}</p>

      {/* Chart UI */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none rounded-2xl" />
        
        <div className="h-64 flex items-end justify-start gap-3 md:gap-6 relative px-4">
          {challenge.chart.map((candle, i) => (
            <motion.div 
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className={`w-6 md:w-8 relative flex justify-center items-center ${candle.pos} ${candle.highlight ? 'ring-2 ring-gold-500 ring-offset-4 ring-offset-slate-900' : ''}`}
            >
              <div className={`w-0.5 absolute bg-slate-500 z-0 h-full scale-y-150 ${candle.wick === 'top' ? 'top-[-50%]' : candle.wick === 'bottom' ? 'bottom-[-50%]' : ''}`} />
              <div className={`w-full absolute z-10 rounded-sm ${candle.height} ${candle.type === 'bull' ? 'bg-green-500' : candle.type === 'bear' ? 'bg-red-500' : 'bg-slate-400'}`} />
            </motion.div>
          ))}

          {/* Reveal next candles when answered */}
          {showResult && challenge.nextCandles.map((candle, i) => (
            <motion.div 
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.3 }}
              key={`next-${i}`} 
              className={`w-6 md:w-8 relative flex justify-center items-center ${candle.pos} opacity-80`}
            >
              <div className={`w-0.5 absolute bg-slate-500 z-0 h-full scale-y-150`} />
              <div className={`w-full absolute z-10 rounded-sm ${candle.height} ${candle.type === 'bull' ? 'bg-green-500' : candle.type === 'bear' ? 'bg-red-500' : 'bg-slate-400'}`} />
            </motion.div>
          ))}
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 flex items-center gap-2">
            <Play className="w-4 h-4" /> LIVE
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-4 text-center">{challenge.question}</h4>
        <div className="grid grid-cols-3 gap-4">
          {challenge.options.map((opt, i) => {
            const isSelected = selectedAction === opt;
            const isCorrect = opt === challenge.correctProcess;
            
            let btnClass = "bg-slate-900 border-slate-800 text-white hover:bg-slate-800";
            
            if (showResult) {
              if (isCorrect) {
                 btnClass = "bg-green-900/40 border-green-500 text-green-400";
              } else if (isSelected) {
                 btnClass = "bg-red-900/40 border-red-500 text-red-400";
              } else {
                 btnClass = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
              }
            } else if (isSelected) {
               btnClass = "bg-gold-500/20 border-gold-500 text-gold-400";
            }

            return (
              <button
                key={i}
                onClick={() => handleAction(opt)}
                disabled={showResult}
                className={`py-4 rounded-xl border-2 font-bold transition-all flex justify-center items-center gap-2 ${btnClass}`}
              >
                {opt}
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showResult && currentFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 border rounded-2xl mb-6 relative overflow-hidden ${
              currentFeedback.xp > 0 ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'
            }`}
          >
             <div className="flex items-start gap-3">
               <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${currentFeedback.xp > 0 ? 'text-green-500' : 'text-red-500'}`} />
               <div>
                 <p className={`text-sm font-bold mb-1 ${currentFeedback.xp > 0 ? 'text-green-400' : 'text-red-400'}`}>
                   {currentFeedback.msg} ({currentFeedback.xp > 0 ? '+' : ''}{currentFeedback.xp} XP)
                 </p>
                 <p className="text-sm text-slate-300 leading-relaxed">{currentFeedback.detail}</p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-brand-black font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {currentIndex < sessionChallenges.length - 1 ? 'NEXT CHART' : 'FINISH MODULE'} <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
