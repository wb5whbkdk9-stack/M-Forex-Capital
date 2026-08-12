import { motion } from 'framer-motion';
import { ArrowRight, Phone, Instagram } from 'lucide-react';
import { Logo } from './Logo';

export function FinalCTA({ onOpenCommunity }: { onOpenCommunity: () => void }) {
  return (
    <section className="py-24 bg-brand-black border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 mx-auto mb-8"
          >
            <Logo />
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Trading Nu Sirf Dekho Na. <br/>
            <span className="text-gold-400">Trading Nu Samjho.</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-12">
            Forex nu easy Punjabi ch step-by-step sikhna chaunde ho?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onOpenCommunity}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 text-lg"
            >
              JOIN COMMUNITY <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('.fixed.bottom-6.right-6')?.click()}
              className="w-full sm:w-auto px-8 py-4 bg-brand-card hover:bg-slate-800/30 border border-gold-500/30 hover:border-gold-500 text-white font-bold rounded-xl transition-all text-lg"
            >
              ASK M FOREX AI
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-slate-800">
            <a href="tel:+917978986978" className="flex items-center gap-2 text-slate-400 hover:text-gold-400 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">+91 7978986978</span>
            </a>
            <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-gold-400 transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="font-medium">@m.forex.capital</span>
            </a>
          </div>
          
          <div className="mt-12 text-gold-500/50 font-display italic text-lg">
            "Learn. Grow. Trade. Succeed."
          </div>
        </div>
      </div>
    </section>
  );
}
