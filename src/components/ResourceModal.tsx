import { motion } from 'framer-motion';
import { X, BookOpen, ArrowRight } from 'lucide-react';

export type GuideType = 'candlestick' | 'psychology' | 'playbook' | null;

interface ResourceModalProps {
  guide: GuideType;
  onClose: () => void;
  onOpenCommunity: () => void;
}

const GUIDES = {
  candlestick: {
    title: "Candlestick Master Guide",
    content: "Candlestick charts are the core language of the financial markets. Every single candle tells a unique story about the battle between buyers (bulls) and sellers (bears) during a specific timeframe. By understanding the open, high, low, and close prices, along with the size of the wicks and bodies, you can anticipate potential market reversals or continuations. Key patterns like the Doji, Hammer, and Engulfing candles provide crucial clues about market sentiment. Mastering these basic patterns is your very first step towards profitable and disciplined trading.",
  },
  psychology: {
    title: "Trading Psychology Guide",
    content: "Successful trading is 20% strategy and 80% psychology. Your mindset dictates your success far more than any technical indicator ever will. Fear, greed, and the fear of missing out (FOMO) are a trader's absolute biggest enemies. They lead directly to overtrading, revenge trading, and ignoring risk management rules. A disciplined trader accepts small losses as a normal part of the business, strictly sticks to their trading plan, and never lets emotions dictate their execution. Building this emotional resilience is what separates the top 1% of traders from the rest.",
  },
  playbook: {
    title: "Trading Playbook",
    content: "A trading playbook is your highly personalized rulebook for engaging with the live markets. It outlines exactly which setups you are looking for, the specific entry triggers required, where your stop-loss must be placed to protect your capital, and where you will realistically take profits. Without a solid playbook, you are simply gambling based on feelings and hopes. Your playbook brings structure, consistency, and repeatability to your trading routine. It ensures that every single trade is taken based on logic and strict criteria rather than impulse.",
  }
};

export function ResourceModal({ guide, onClose, onOpenCommunity }: ResourceModalProps) {
  if (!guide) return null;

  const data = GUIDES[guide];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-brand-dark border border-gold-500/20 rounded-2xl w-full max-w-2xl relative overflow-hidden shadow-2xl shadow-black"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-gold-500" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            {data.title}
          </h2>
          
          <p className="text-slate-300 leading-relaxed text-lg mb-10">
            {data.content}
          </p>

          <div className="p-6 bg-brand-black border border-slate-800 rounded-xl text-center">
            <h3 className="text-white font-bold mb-2">Ready to master this?</h3>
            <p className="text-slate-400 text-sm mb-6">Jyada sikhan lyi join karo M Forex Capital Community, ya menu ch Live Classes & Course details check karo.</p>
            
            <button
              onClick={onOpenCommunity}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-lg transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40"
            >
              JOIN COMMUNITY <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
