import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export function CommunitySection({ onOpenCommunity }: { onOpenCommunity: () => void }) {
  const benefits = [
    "Educational PDFs",
    "Candlestick lessons",
    "Market structure",
    "Trading psychology",
    "Risk management",
    "Chart exercises",
    "Practical examples",
    "Beginner-friendly Punjabi",
    "Community discussions",
    "AI learning support",
    "Future resources"
  ];

  return (
    <section id="community" className="py-24 bg-brand-dark border-t border-slate-800 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 w-full max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Trading Akela Sikhna Zaroori Nahi.</h2>
            <p className="text-xl text-gold-400 mb-8">
              M Forex Capital community nu step-by-step grow kita ja reha hai.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span className="text-slate-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenCommunity}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 text-lg"
            >
              JOIN COMMUNITY <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md aspect-square bg-brand-card rounded-full border border-slate-700/50 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
              <div className="w-2/3 h-2/3">
                <Logo />
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
