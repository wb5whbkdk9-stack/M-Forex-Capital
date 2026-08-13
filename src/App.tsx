/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { AIChatbot } from './components/AIChatbot';
import { CommunityModal } from './components/CommunityModal';
import { LegalModal, LegalType } from './components/LegalModal';
import { ResourceModal, GuideType } from './components/ResourceModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatYouWillLearn, LearningMethod, BeginnerSection, WhyMForex, AILearningPreview, CommunityCTA } from './components/HomeSections';
import { About } from './components/About';
import { WhyConfused } from './components/WhyConfused';
import { LearningFramework } from './components/LearningFramework';
import { LearnCards } from './components/LearnCards';
import { CandleLab } from './components/CandleLab';
import { ChartChallenge } from './components/ChartChallenge';
import { LiveMarket } from './components/LiveMarket';
import { TradingViewSection } from './components/TradingViewSection';
import { TradingLab } from './components/TradingLab/TradingLab';
import { SimulatorApp } from './components/TradingSimulator/SimulatorApp';
import { CommunitySection } from './components/CommunitySection';
import { Roadmap } from './components/Roadmap';
import { RiskCalculator } from './components/RiskCalculator';
import { TradingJournal } from './components/TradingJournal';
import { DailyLearning } from './components/DailyLearning';
import { Glossary } from './components/Glossary';
import { Contact } from './components/Contact';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);
  const [activeGuide, setActiveGuide] = useState<GuideType>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-brand-black flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 relative mb-8"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gold-500 opacity-50"
          />
          <Logo />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl tracking-widest text-white font-bold mb-2 font-display"
        >
          M FOREX CAPITAL
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gold-400 tracking-wider text-sm"
        >
          Learn. Grow. Trade. Succeed.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-slate-200 selection:bg-gold-500/30 font-body overflow-x-hidden">
      <Navbar 
        onOpenCommunity={() => setIsCommunityModalOpen(true)} 
        onOpenGuide={(guide) => setActiveGuide(guide as GuideType)}
      />
      
      <main>
        <Hero onOpenCommunity={() => setIsCommunityModalOpen(true)} />
        <WhatYouWillLearn />
        <LearningMethod />
        <BeginnerSection />
        <WhyMForex />
        <WhyConfused />
        <Roadmap />
        <LearnCards />
        <AILearningPreview />
        
        <TradingLab />
        <SimulatorApp />
        
        {/* We keep old components here as well so we don't 'rebuild from scratch' entirely */}
        <CandleLab />
        <ChartChallenge />
        <LiveMarket />
        <TradingViewSection />
        
        
        <CommunityCTA onOpenCommunity={() => setIsCommunityModalOpen(true)} />
        
        <RiskCalculator />
        <TradingJournal />
        <DailyLearning />
        <Glossary />
        <Contact />
        <About />
        <FAQ />
        <SocialProof />
        <FinalCTA onOpenCommunity={() => setIsCommunityModalOpen(true)} />
      </main>

      <Footer onOpenLegal={(type) => setLegalModalType(type)} />
      
      <AIChatbot />
      
            <AnimatePresence>
        {isCommunityModalOpen && (
          <CommunityModal onClose={() => setIsCommunityModalOpen(false)} />
        )}
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
        )}
        {activeGuide && (
          <ResourceModal 
            guide={activeGuide} 
            onClose={() => setActiveGuide(null)} 
            onOpenCommunity={() => {
              setActiveGuide(null);
              setIsCommunityModalOpen(true);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
