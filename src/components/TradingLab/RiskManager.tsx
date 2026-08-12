import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTradingLabState } from '../../hooks/useTradingLabState';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export function RiskManager({ onComplete }: { onComplete: () => void }) {
  const { addXP, markCompleted } = useTradingLabState();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const CHS = [
    {
      q: 'Tuhade paas Virtual Educational Account vich ₹10,000 ne. Tusi strictly 1% risk karna chahunde ho. Maximum loss limit kinni hovegi?',
      opts: ['₹50', '₹100', '₹500', '₹1,000'],
      correct: 1,
      exp: '1% of ₹10,000 = ₹100. Agar tusi iston zyada risk lende ho taan tusi apne account nu tezi naal loose kar sakde ho.'
    },
    {
      q: 'Tuhadi risk limit ₹100 hai, te tusi 1:3 da Risk/Reward target kar rahe ho. Potential reward kinna hona chahida?',
      opts: ['₹100', '₹200', '₹300', '₹50'],
      correct: 2,
      exp: '1:3 R/R da matlab hai je tusi ₹100 risk kar rahe ho taan tuhada target ₹300 da hovega. Eh profitable rehn layi zaroori hai.'
    }
  ];

  const handleSelect = (i: number) => {
    if (showExplanation) return;
    setSelectedOpt(i);
    setShowExplanation(true);
    if (i === CHS[currentStep].correct) addXP(15);
  };

  const handleNext = () => {
    if (currentStep < CHS.length - 1) {
      setCurrentStep(c => c + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      markCompleted('risk_manager', 'psych', 'risk_aware');
      onComplete();
    }
  };

  if (currentStep >= CHS.length) return null;

  return (
    <div className="max-w-2xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-8 h-8 text-gold-500" />
        <h3 className="text-2xl font-bold text-white">Risk Manager</h3>
      </div>
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl mb-6 text-center">
        <span className="text-sm text-slate-400 block mb-1">SIMULATED EDUCATIONAL BALANCE</span>
        <span className="text-3xl font-display font-bold text-white">₹10,000</span>
      </div>
      <h4 className="text-lg font-bold text-white mb-6">{CHS[currentStep].q}</h4>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {CHS[currentStep].opts.map((opt, i) => {
          let bg = "bg-slate-900 border-slate-800 text-slate-300";
          if (showExplanation) {
            if (i === CHS[currentStep].correct) bg = "bg-green-900/20 border-green-500/50 text-green-400";
            else if (i === selectedOpt) bg = "bg-red-900/20 border-red-500/50 text-red-400";
            else bg = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={`p-4 rounded-xl border font-bold text-lg ${bg}`}>
              {opt}
            </button>
          )
        })}
      </div>
      {showExplanation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-slate-400 mb-6 bg-slate-900 p-4 rounded-xl">{CHS[currentStep].exp}</p>
          <button onClick={handleNext} className="w-full py-4 bg-gold-500 font-bold rounded-xl text-brand-black flex items-center justify-center gap-2">
            NEXT <ChevronRight className="w-5 h-5"/>
          </button>
        </motion.div>
      )}
    </div>
  );
}
