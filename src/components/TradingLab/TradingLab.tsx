import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradingLabState, BADGES } from '../../hooks/useTradingLabState';
import { 
  Gamepad2, Trophy, Brain, Target, Shield, BookOpen, 
  ChevronRight, ArrowLeft, RefreshCw, Star, X
} from 'lucide-react';

// Import modules (we will create these next)
import { CandleDetective } from './CandleDetective';
import { WhatHappensNext } from './WhatHappensNext';
import { SetupHunter } from './SetupHunter';
import { PsychologyTest } from './PsychologyTest';
import { RiskManager } from './RiskManager';
import { BossBattle } from './BossBattle';
import { ThirtyDayChallenge } from './ThirtyDayChallenge';
import { SpotMistake } from './SpotMistake';
import { GlobalRankings } from './GlobalRankings';

const MODULES = [
  { id: 'candle_detective', name: 'Candle Detective', icon: '🕯️', desc: 'Identify candle clues.', component: CandleDetective },
  { id: 'what_happens_next', name: 'What Happens Next?', icon: '📈', desc: 'Read charts candle-by-candle.', component: WhatHappensNext },
  { id: 'setup_hunter', name: 'Setup Hunter', icon: '🎯', desc: 'Find the perfect setup.', component: SetupHunter },
  { id: 'spot_mistake', name: 'Spot The Mistake', icon: '🕵️', desc: 'Find errors in setups.', component: SpotMistake },
  { id: 'psychology_test', name: 'Psychology Test', icon: '🧠', desc: 'Test your mindset.', component: PsychologyTest },
  { id: 'risk_manager', name: 'Risk Manager', icon: '💰', desc: 'Manage your capital.', component: RiskManager },
  { id: 'boss_battle', name: 'Boss Battle', icon: '🔥', desc: 'The FOMO Market challenge.', component: BossBattle },
  { id: '30_day', name: '30-Day Challenge', icon: '🚀', desc: 'Daily trading lessons.', component: ThirtyDayChallenge },
];

export function TradingLab() {
  const { 
    state, currentLevelName, progressToNextLevel, 
    nextLevelXp, resetProgress 
  } = useTradingLabState();
  
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const ActiveComponent = MODULES.find(m => m.id === activeModule)?.component;

  if (activeModule && ActiveComponent) {
    return (
      <div className="bg-brand-black min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <button 
            onClick={() => setActiveModule(null)}
            className="mb-8 flex items-center gap-2 text-gold-400 hover:text-gold-300 font-bold tracking-widest text-sm uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lab Dashboard
          </button>
          <ActiveComponent onComplete={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <section id="trading-lab" className="py-24 bg-brand-dark border-y border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gold-500/10 rounded-2xl mb-6">
            <Gamepad2 className="w-10 h-10 text-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Welcome To The <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">M Forex Trading Lab 🎯</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Sirf trading padhni nahi — concepts nu practice vi karo. Candles dekho, charts samjho, decisions lo te apni knowledge improve karo.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="max-w-5xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-10 mb-16 shadow-2xl relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-2">My Learning Progress</h3>
              <div className="flex items-end gap-4">
                <span className="text-3xl md:text-4xl font-display font-bold text-white">{currentLevelName}</span>
                <span className="text-slate-400 font-medium mb-1">Level {state.level}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
              <div className="text-center px-4 border-r border-slate-800">
                <div className="text-2xl font-bold text-white">{state.xp}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Total XP</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-white">{state.badges.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Badges</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative z-10 mb-10">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Progress to next level</span>
              <span>{state.xp} / {nextLevelXp} XP</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextLevel}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
              />
            </div>
          </div>

          {/* Badges Section */}
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-white mb-4">Earned Badges</h4>
            <div className="flex flex-wrap gap-3">
              {BADGES.map(badge => {
                const isEarned = state.badges.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    title={badge.desc}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      isEarned 
                        ? 'bg-gold-500/10 border-gold-500/30 text-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-600 grayscale'
                    }`}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-xs font-bold">{badge.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="max-w-6xl mx-auto mb-24">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">Select a Learning Module</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {MODULES.map((module, i) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, borderColor: 'rgba(234,179,8,0.5)' }}
                onClick={() => setActiveModule(module.id)}
                className="bg-brand-black border border-slate-800 rounded-2xl p-6 text-left group relative overflow-hidden transition-all shadow-lg hover:shadow-gold-500/10"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl mb-4">{module.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{module.name}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{module.desc}</p>
                <div className="flex items-center justify-between text-xs font-bold text-gold-500 uppercase tracking-widest mt-auto">
                  <span>Start Module</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Global Rankings Component */}
        <GlobalRankings />

        {/* Reset Progress */}
        <div className="mt-24 text-center">
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="w-3 h-3" /> Reset Educational Progress
          </button>
        </div>

        {/* Reset Modal */}
        <AnimatePresence>
          {showResetConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-dark border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
              >
                <button onClick={() => setShowResetConfirm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-2">Reset Progress?</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Are you sure? This will permanently remove your XP, Badges, and Levels from this device.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => { resetProgress(); setShowResetConfirm(false); }}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/30 font-medium hover:bg-red-500/20"
                  >
                    Yes, Reset
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
