import { Bot } from 'lucide-react';

export function DailyLearning() {
  return (
    <section className="py-24 bg-brand-dark border-t border-slate-800 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-green/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-card to-brand-black p-1 rounded-3xl">
          <div className="bg-brand-card rounded-[23px] border border-slate-800 p-8 md:p-12 shadow-2xl">
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest mb-4 border border-gold-500/20">
                  AJJ DA LESSON
                </div>
                
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                  Breakout vs Retest
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-brand-dark p-4 rounded-xl border border-slate-800">
                    <span className="text-gold-400 text-sm font-bold block mb-1">Concept</span>
                    <p className="text-slate-300 text-sm">Breakout jad hunda hai tan momentum bhot strong hunda. Par aksar market breakout level nu wapas test karan aundi hai (Retest). Retest zyada safer entry hundi hai beginners layi.</p>
                  </div>
                  
                  <div className="bg-brand-dark p-4 rounded-xl border border-slate-800">
                    <span className="text-brand-green text-sm font-bold block mb-1">Chart Question</span>
                    <p className="text-slate-300 text-sm">Breakout ton baad price old resistance wal wapas aave taan tusi ki observe karoge?</p>
                  </div>
                  
                  <div className="bg-brand-dark p-4 rounded-xl border border-slate-800">
                    <span className="text-brand-red text-sm font-bold block mb-1">Psychology Tip</span>
                    <p className="text-slate-300 text-sm">Breakout miss hon te chase na karo (FOMO). Ya tan retest da wait karo, ya trade jaan do.</p>
                  </div>
                </div>

                <button 
                  onClick={() => document.querySelector<HTMLButtonElement>('.fixed.bottom-6.right-6')?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-black hover:bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold rounded-xl transition-all"
                >
                  <Bot className="w-5 h-5" /> ASK M FOREX AI
                </button>
              </div>
              
              <div className="w-full md:w-1/3 aspect-square bg-brand-dark rounded-3xl border border-slate-800 flex items-center justify-center p-6">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                  {/* Resistance Line */}
                  <line x1="10" y1="40" x2="90" y2="40" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="50" y="30" fill="#EF4444" fontSize="6" textAnchor="middle">RESISTANCE</text>
                  
                  {/* Price Action Path */}
                  <path d="M 20 80 L 35 60 L 45 45 L 60 15 L 75 40" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  <circle cx="45" cy="45" r="3" fill="#F59E0B" />
                  <text x="35" y="48" fill="#F59E0B" fontSize="5">Breakout</text>
                  
                  <circle cx="75" cy="40" r="3" fill="#3B82F6" />
                  <text x="85" y="42" fill="#3B82F6" fontSize="5">Retest</text>
                  
                  <path d="M 75 40 L 90 20" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
