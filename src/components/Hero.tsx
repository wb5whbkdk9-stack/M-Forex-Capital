import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Phone, Instagram } from 'lucide-react';
import { Logo } from './Logo';

export function Hero({ onOpenCommunity }: { onOpenCommunity: () => void }) {
  return (
    <section className="relative min-h-[90svh] pt-24 pb-12 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-[10%] bottom-[20%] w-8 h-48 bg-brand-green/20 rounded-sm blur-sm" 
        />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute right-[20%] bottom-[30%] w-8 h-32 bg-brand-red/20 rounded-sm blur-sm" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-32 h-32 md:w-40 md:h-40 mb-8"
        >
          <Logo />
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gold-400 font-bold tracking-[0.2em] mb-4 text-sm md:text-base uppercase"
        >
          M FOREX CAPITAL
        </motion.p>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold max-w-4xl tracking-tight mb-6 text-white leading-tight"
        >
          Forex Trading Nu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 block mt-2 pb-2">Easy Punjabi Ch Samjho.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-medium"
        >
          Basics ton practical chart reading, market structure, confirmation, risk management te trading psychology tak — step-by-step learning.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={onOpenCommunity}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 text-lg uppercase tracking-wide"
          >
            JOIN COMMUNITY <ArrowRight className="w-5 h-5" />
          </button>
          
          <a 
            href="#resources"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-card hover:bg-slate-800/80 border border-gold-500/30 text-white font-bold rounded-xl transition-all hover:border-gold-500 text-lg uppercase tracking-wide shadow-lg"
          >
            <BookOpen className="w-5 h-5 text-gold-500" /> EXPLORE FREE RESOURCES
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-slate-400 font-medium tracking-wide"
        >
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold-500" /> Simple Learning.</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold-500" /> Practical Understanding.</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold-500" /> Better Trading Discipline.</span>
        </motion.div>
      </div>
    </section>
  );
}
