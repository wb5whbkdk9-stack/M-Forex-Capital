import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, ChevronLeft, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';

const qaData = [
  {
    q: "Forex market ki hai aur eh kiven kam kardi hai?",
    a: "Forex (Foreign Exchange) duniya di sab ton vaddi financial market hai jithe currencies buy aur sell hundiyan ne. Market 24/5 khulli rehndi hai te isvich profit currency pairs de price difference (jaise EUR/USD) ton hunda hai."
  },
  {
    q: "Support aur Resistance ki hunda hai?",
    a: "Support oh price level hai jithe buyers strong hunde ne te price nu thalle digan ton rokde ne. Resistance oh level hai jithe sellers strong hunde ne te price nu utte jaan ton rokde ne. M Forex Capital vich asi inha levels te clean price action naal trade karna sikhde haan."
  },
  {
    q: "Risk Management kyon zaroori hai?",
    a: "Risk management trading di backbone hai. Hamesha apni total capital da 1-2% hi ek trade vich risk karo. Agar tusi risk manage nahi karonge, taan ek ya do loss hi tuhada poora account wash kar sakde ne."
  },
  {
    q: "Stop Loss (SL) aur Take Profit (TP) ki hai?",
    a: "Stop loss ek automatic order hunda hai jo tuhadi trade nu close kar dinda hai agar price tuhade against janda hai, taan jo loss limit vich rahe. Take profit oh level hai jithe tusi apna profit book karde ho. Hamesha 1:2 ya iston zyada da Risk/Reward ratio rakho."
  },
  {
    q: "Price Action trading ki hundi hai?",
    a: "Price action da matlab hai bina kisi indicator de sirf pure price movement, candlesticks, te chart patterns nu dekh ke trade karna. M Forex Capital indicators nu avoid karan aur clean charts padhan te focus karda hai."
  },
  {
    q: "Trading psychology kiven theek rakhiye?",
    a: "Trading vich 80% mindset aur 20% strategy hundi hai. Emotions (Fear aur Greed) nu control karna zaroori hai. Apne trading plan te stick raho, overtrading na karo, aur loss nu jaldi accept karna sikho."
  },
  {
    q: "Pip ki hunda hai aur isnu kiven calculate karde ne?",
    a: "PIP (Percentage in Point) currency pair di movement da sab ton chhota unit hunda hai. Zyadatar pairs vich eh 4th decimal place hundi hai (jaise EUR/USD 1.1050 ton 1.1051 jaye taan 1 pip move hunda hai)."
  },
  {
    q: "Lot size ki hunda hai aur main kinna use karaan?",
    a: "Lot size tuhadi trade di volume hundi hai (Standard = 100,000 units, Mini = 10,000, Micro = 1,000). Tuhada lot size hamesha tuhade account size aur Stop loss distance te depend karna chahida hai taan jo risk 1-2% hi rahe."
  },
  {
    q: "Overtrading ki hai aur iston kiven bachiye?",
    a: "Overtrading da matlab hai bina kisi solid setup de baar-baar trades open karna. Iston bachan layi apna daily trade limit set karo (e.g., din vich sirf 2 trades). Agar limit cross ho jaye taan terminal close kar dyo."
  },
  {
    q: "Market vich best trading sessions kehde ne?",
    a: "Forex vich 4 main sessions hunde ne: Sydney, Tokyo, London, aur New York. Sab ton zyada volatility aur achi moves London aur New York session de overlap (Indian time shaam 5:30 PM - 9:30 PM) de dauran aundiyan ne."
  },
  {
    q: "Fakeouts (Bull/Bear Traps) ton kiven bachiye?",
    a: "Fakeout odon hunda hai jadon price support/resistance nu tod ke wapis purani range vich aa janda hai. Iston bachan layi hamesha candle de close hon da wait karo. Agar candle level de bahar close nahi hundi, taan oh fakeout ho sakda hai."
  },
  {
    q: "Main ek profitable trader kiven ban sakda haan?",
    a: "Profitable trader banan layi 3 cheezan zaroori ne: 1. Clean Price Action Strategy, 2. Strict Risk Management (1-2% risk per trade), 3. Discipline aur Patience (Sirf apne plan de according trade karna)."
  }
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-5 py-3 font-bold text-brand-black shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] md:bottom-8 md:right-8"
      >
        <Bot className="h-6 w-6" />
        <span className="hidden sm:inline">Trading Knowledge Bot</span>
      </motion.button>

      {/* Main Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 z-50 flex w-full flex-col overflow-hidden bg-brand-dark sm:inset-auto sm:bottom-24 sm:right-8 sm:h-[650px] sm:w-[450px] sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700/50 bg-brand-black p-4 shrink-0">
              <div className="flex items-center gap-3">
                {selectedIndex !== null ? (
                  <button 
                    onClick={() => setSelectedIndex(null)}
                    className="p-1 rounded-full hover:bg-slate-800 text-gold-400 transition-colors mr-1"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10">
                    <Logo />
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-white tracking-wide">M FOREX Knowledge</h3>
                  <p className="text-xs text-gold-400">
                    {selectedIndex !== null ? "Detailed Answer" : "Select a Question"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
                title="Close and return to website"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-brand-dark">
              {selectedIndex === null ? (
                <div className="p-4 space-y-3">
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 mb-6">
                    <p className="text-sm text-slate-200">
                      Sat Shri Akal! Trading sikhde waqt kujh aam sawaal hunde ne. Tusi niche ditti gayi list vicho koi vi sawaal tap karke usda detail answer padh sakde ho.
                    </p>
                  </div>
                  
                  {qaData.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className="w-full text-left bg-brand-black hover:bg-slate-800 border border-slate-700/50 hover:border-gold-500/50 rounded-xl p-4 transition-all group flex items-start gap-3"
                    >
                      <HelpCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                        {item.q}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="bg-gold-500 text-brand-black rounded-2xl rounded-tr-sm p-4 max-w-[85%]">
                      <p className="font-bold text-sm">{qaData[selectedIndex].q}</p>
                    </div>
                  </div>
                  
                  {/* Bot Answer */}
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-2xl rounded-tl-sm p-5 max-w-[90%] shadow-lg">
                      <p className="text-sm leading-relaxed">
                        {qaData[selectedIndex].a}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8 pb-4">
                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="px-6 py-2 rounded-full border border-slate-700 hover:border-gold-500 text-slate-300 hover:text-gold-400 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Hor sawaal dekho
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-brand-black border-t border-slate-700/50 p-3 text-center">
               <span className="text-[10px] text-slate-500">M Forex Capital - Dedicated to clean price action learning.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
