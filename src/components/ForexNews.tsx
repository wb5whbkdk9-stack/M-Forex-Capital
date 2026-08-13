import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, AlertCircle } from 'lucide-react';

export function ForexNews() {
  return (
    <section className="py-24 bg-brand-black border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Newspaper className="w-8 h-8 text-gold-400" />
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Market News & <span className="text-gold-400">Economic Calendar</span>
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Trading karan ton pehlan hamesha high-impact news check karo. Forex Factory te tusi daily market events te news dekh sakde ho jo market vich volatility lya sakde ne.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="https://www.forexfactory.com/news" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-gold-500/50 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-gold-500/10 transform hover:-translate-y-1"
            >
              <ExternalLink className="w-5 h-5 text-gold-400" /> Open Forex Factory News
            </a>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="mt-12 flex items-center justify-center gap-2 text-brand-red text-sm font-medium bg-brand-red/10 border border-brand-red/20 py-2 px-4 rounded-full w-max mx-auto"
          >
             <AlertCircle className="w-4 h-4" /> <span>Tip: Avoid trading during Red Folder (High-Impact) news events.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
