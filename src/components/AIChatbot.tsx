import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

type QnA = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

const QNA_DATA: QnA[] = [
  {
    id: "q1",
    question: "Candlestick ki hundi aa te candles nu kiven read kariye?",
    answer: (
      <>
        <p className="mb-4">Candlestick price de ik specific time period di movement nu show kardi hai.</p>
        <p className="mb-2 font-bold text-white">Har candle ch 4 main cheeza hundiyan ne:</p>
        <ul className="mb-4 list-none space-y-1 pl-0">
          <li><span className="text-brand-green font-bold">Open</span> — price jithe period start hoya</li>
          <li><span className="text-white font-bold">High</span> — period da highest price</li>
          <li><span className="text-brand-red font-bold">Low</span> — period da lowest price</li>
          <li><span className="text-brand-green font-bold">Close</span> — period jithe period end hoya</li>
        </ul>
        <p className="mb-4">Candle da body open te close de vich difference show karda hai, jadki wick price de upper/lower rejection ya movement bare information dindi hai.</p>
        <p className="mb-4">Green candle generally show kardi hai ke close open ton upar hoya, te red candle generally show kardi hai ke close open ton thalle hoya.</p>
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
          <p className="font-bold text-gold-400 mb-2">Important gall:</p>
          <p className="mb-2">Sirf candle da colour dekh ke trade nahi leni.</p>
          <p className="mb-2">Candle nu context ch dekhna zaroori hai:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-300">
            <li>Market Structure</li>
            <li>Support / Resistance</li>
            <li>Key Level</li>
            <li>Price Reaction</li>
            <li>Confirmation</li>
            <li>Risk Management</li>
          </ul>
        </div>
        <div className="mb-4 bg-brand-black/50 p-4 rounded-xl border border-slate-800">
          <p className="font-bold text-white mb-2">Example:</p>
          <p>Je resistance area te Shooting Star ban rahi hai, eh selling pressure da clue ho sakdi hai. Par sirf Shooting Star dekh ke immediately sell karna proper confirmation nahi maneya ja sakda.</p>
        </div>
        <p className="font-bold text-center text-lg mt-6">
          Candle = Information.<br/>
          Candle ≠ Guaranteed Entry.
        </p>
      </>
    )
  },
  {
    id: "q2",
    question: "Market Structure ki hundi aa?",
    answer: (
      <>
        <p className="mb-4">Market Structure da matlab price kis tarah move kar rahi hai, oh samajhna.</p>
        <p className="mb-2 font-bold text-white">Basic structure nu 4 concepts naal samjho:</p>
        <ul className="mb-4 space-y-2">
          <li><span className="font-bold text-gold-400">HH</span> — Higher High</li>
          <li><span className="font-bold text-gold-400">HL</span> — Higher Low</li>
          <li><span className="font-bold text-brand-red">LH</span> — Lower High</li>
          <li><span className="font-bold text-brand-red">LL</span> — Lower Low</li>
        </ul>
        <p className="mb-3">Je price repeatedly Higher High te Higher Low bana rahi hai, market <span className="font-bold text-brand-green">bullish structure</span> show kar sakdi hai.</p>
        <p className="mb-3">Je price Lower High te Lower Low bana rahi hai, market <span className="font-bold text-brand-red">bearish structure</span> show kar sakdi hai.</p>
        <p className="mb-4">Je price ik defined range ch move kar rahi hai, market <span className="font-bold text-gold-400">ranging behaviour</span> show kar sakdi hai.</p>
        <p className="mb-4">Market Structure nu samajhna important hai kyunki eh tuhanu overall price direction te context samajhan ch help karda hai.</p>
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
          <p className="font-bold text-gold-400 mb-2">Par structure alone entry signal nahi.</p>
          <p>Structure + Key Level + Price Action + Confirmation + Risk Management nu ikathe consider karna better decision-making framework provide kar sakda hai.</p>
        </div>
      </>
    )
  },
  {
    id: "q3",
    question: "Support te Resistance ki hunde ne?",
    answer: (
      <>
        <p className="mb-4"><span className="font-bold text-gold-400">Support</span> oh price area hai jithe past ch price nu buying reaction mil sakdi hai.</p>
        <p className="mb-4"><span className="font-bold text-gold-400">Resistance</span> oh price area hai jithe past ch price nu selling reaction mil sakdi hai.</p>
        <div className="mb-4 bg-brand-black/50 p-4 rounded-xl border border-slate-800">
          <p className="font-bold text-white mb-2">Example:</p>
          <p className="mb-2">Je price repeatedly ik area ton upar bounce kardi hai, oh area potential support ho sakda hai.</p>
          <p>Je price repeatedly ik area ton thalle reject hundi hai, oh potential resistance ho sakda hai.</p>
        </div>
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
          <p className="font-bold text-gold-400 mb-2">Important:</p>
          <p className="mb-2">Support te Resistance exact single line hamesha nahi hunde. Kai situations ch eh zones wang behave kar sakde ne.</p>
          <p className="mb-2">Jadon price level te aundi hai, turant entry lena zaroori nahi.</p>
          <p className="mb-2 font-bold text-white mt-4">Observe karo:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-300">
            <li>Price reaction</li>
            <li>Candle behaviour</li>
            <li>Market structure</li>
            <li>Breakout</li>
            <li>Retest</li>
            <li>Confirmation</li>
          </ul>
        </div>
        <p className="font-bold text-center text-lg mt-6">
          Level = Decision Area.<br/>
          Level ≠ Automatic Entry.
        </p>
      </>
    )
  },
  {
    id: "q4",
    question: "Breakout te Retest ki hunda?",
    answer: (
      <>
        <p className="mb-4">Breakout odon keh sakde haan jadon price kise important support/resistance ya range area nu break karke bahar move kare.</p>
        <p className="mb-4 font-bold text-brand-red">Par har breakout genuine nahi hunda.</p>
        <p className="mb-4">Kai vaar price level nu temporarily break karke wapas range ch aa jandi hai. Eh fake breakout ho sakda hai.</p>
        <p className="mb-2 font-bold text-gold-400">Retest da simple concept:</p>
        <p className="mb-4">Price level break kardi hai → fer usi area wal wapas aundi hai → trader reaction observe karda hai.</p>
        
        <div className="mb-4 bg-brand-black/50 p-4 rounded-xl border border-slate-800">
          <p className="font-bold text-white mb-2">Example:</p>
          <ul className="space-y-2">
            <li>1. Resistance break hoyi.</li>
            <li>2. Price upar gayi.</li>
            <li>3. Fer old resistance area wal wapas aayi.</li>
            <li>4. Hun trader observe kar sakda hai ke old resistance support wang behave kar rahi hai ya nahi.</li>
          </ul>
        </div>
        
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
          <p className="font-bold text-gold-400 mb-2">Important:</p>
          <p className="mb-2">Breakout nu chase karna zaroori nahi.</p>
          <p className="mb-2">Wait for your defined confirmation.</p>
          <p>Breakout + Retest + Confirmation nu apne trading plan de according evaluate karo.</p>
        </div>
      </>
    )
  },
  {
    id: "q5",
    question: "FOMO te Revenge Trading ki hundi aa?",
    answer: (
      <>
        <p className="mb-2"><span className="font-bold text-gold-400">FOMO</span> = Fear Of Missing Out.</p>
        <p className="mb-2">Jadon price fast move kardi hai te trader nu lagda hai:</p>
        <p className="mb-4 italic text-slate-300">"Hun entry nahi layi ta opportunity miss ho ju."</p>
        <p className="mb-6">Is emotion karke trader apne planned setup ton bina late entry lai sakda hai.</p>
        
        <p className="mb-2 font-bold text-gold-400">Revenge Trading:</p>
        <p className="mb-4">Jadon loss hon ton baad trader emotional hoke loss recover karan layi immediately hor trade lena start kar dinda hai.</p>
        
        <div className="mb-4 bg-brand-black/50 p-4 rounded-xl border border-slate-800">
          <p className="font-bold text-white mb-2">Example:</p>
          <p className="mb-1 text-brand-red">Trade loss hoya.</p>
          <p className="mb-1">Trader sochda: <i className="text-slate-300">"Hun next trade ch loss recover karna hi aa."</i></p>
          <p className="mb-2">Fer oh setup di confirmation wait nahi karda.</p>
          <p className="font-bold">Result: One planned loss → multiple emotional trades.</p>
        </div>
        
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl text-center">
          <p className="font-bold text-gold-400 mb-4">Better process:</p>
          <div className="flex flex-col items-center justify-center gap-2 font-bold tracking-widest uppercase">
            <span className="text-brand-red">STOP</span>
            <span className="text-slate-500">↓</span>
            <span className="text-gold-400">REVIEW</span>
            <span className="text-slate-500">↓</span>
            <span className="text-gold-400">RESET</span>
            <span className="text-slate-500">↓</span>
            <span className="text-brand-green">WAIT FOR SETUP</span>
          </div>
        </div>
        
        <p className="font-bold text-center text-lg mt-6">
          Trading ch har move capture karna zaroori nahi.<br/>
          Patience vi ik trading skill hai.
        </p>
      </>
    )
  },
  {
    id: "q6",
    question: "Risk Management ki hai te Stop Loss kyon important hai?",
    answer: (
      <>
        <p className="mb-4">Risk Management da matlab trade ton pehla eh decide karna ke tusi apne capital da kinna risk accept kar rahe ho.</p>
        
        <div className="mb-6 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl text-center">
          <p className="font-bold text-gold-400 mb-4">Basic framework:</p>
          <div className="flex flex-col items-center justify-center gap-1 font-bold">
            <span>Account Size</span>
            <span className="text-slate-500">+</span>
            <span>Risk %</span>
            <span className="text-slate-500">+</span>
            <span>Stop Loss</span>
            <span className="text-slate-500">+</span>
            <span>Position Size</span>
            <span className="text-slate-500">=</span>
            <span className="text-gold-500 text-lg">Planned Risk</span>
          </div>
        </div>
        
        <p className="mb-4">Stop Loss da purpose eh hai ke je trade da idea invalidate ho jave, loss nu predefined level te control kita ja sake.</p>
        <p className="mb-4 text-brand-red font-medium">Stop Loss nu sirf random distance te place nahi karna chahida.</p>
        <p className="mb-4">Trade idea invalidate kithhe hunda hai, eh samajhna important hai.</p>
        <p className="mb-4">Risk/Reward vi plan da part ho sakda hai.</p>
        
        <div className="mb-4 bg-brand-black/50 p-4 rounded-xl border border-slate-800">
          <p className="font-bold text-white mb-2">Example:</p>
          <p>Je tusi 1R risk kar rahe ho te potential target 3R hai, taan educational terms ch Risk/Reward 1:3 hai.</p>
        </div>
        
        <div className="mb-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
          <p className="font-bold text-gold-400 mb-2">Important:</p>
          <p className="mb-2 font-bold text-white">High Risk ≠ High Skill.</p>
          <p>Capital protection te discipline long-term learning process da important part ne.</p>
        </div>
      </>
    )
  },
  {
    id: "q7",
    question: "Beginner nu Trading sikhni kithon start karni chahidi?",
    answer: (
      <>
        <p className="mb-4">Je tusi bilkul beginner ho, random strategies te indicators ton start na karo.</p>
        <p className="mb-6 font-bold text-gold-400">Ik structured learning order follow karo:</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">01</span>
            <div>
              <p className="font-bold text-white">Forex Basics</p>
              <p className="text-sm text-slate-400">Forex ki hai, currency pairs, pip, lot, spread, leverage etc.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">02</span>
            <div>
              <p className="font-bold text-white">Candlesticks</p>
              <p className="text-sm text-slate-400">Open, High, Low, Close, body, wick te major patterns.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">03</span>
            <div>
              <p className="font-bold text-white">Support & Resistance</p>
              <p className="text-sm text-slate-400">Key levels te reaction zones identify karna.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">04</span>
            <div>
              <p className="font-bold text-white">Market Structure</p>
              <p className="text-sm text-slate-400">HH, HL, LH, LL te trend/range samajhna.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">05</span>
            <div>
              <p className="font-bold text-white">Price Action</p>
              <p className="text-sm text-slate-400">Price kis tarah react kar rahi hai.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">06</span>
            <div>
              <p className="font-bold text-white">Confirmation</p>
              <p className="text-sm text-slate-400">Entry ton pehla multiple factors nu evaluate karna.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">07</span>
            <div>
              <p className="font-bold text-white">Risk Management</p>
              <p className="text-sm text-slate-400">Stop Loss, position size, risk %, Risk/Reward.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">08</span>
            <div>
              <p className="font-bold text-white">Trading Psychology</p>
              <p className="text-sm text-slate-400">FOMO, fear, greed, revenge trading te discipline.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">09</span>
            <div>
              <p className="font-bold text-white">Journaling</p>
              <p className="text-sm text-slate-400">Apne trades nu record te review karna.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">10</span>
            <div>
              <p className="font-bold text-white">Backtesting & Practice</p>
              <p className="text-sm text-slate-400">Historical charts te apne rules test karna.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-gold-500 w-6 shrink-0">11</span>
            <div>
              <p className="font-bold text-white">Live Market Implementation</p>
              <p className="text-sm text-slate-400">Jadon foundation clear hove, concepts nu live charts te carefully observe te apply karna.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-brand-black/50 p-4 rounded-xl border border-slate-800 text-center mt-6">
          <p className="font-bold text-white mb-2">Trading da goal sirf trade lena nahi.</p>
          <p className="font-bold text-gold-400">Goal:</p>
          <p className="text-sm mt-1">Market nu samajhna + plan banana + risk control karna + discipline maintain karna.</p>
        </div>
      </>
    )
  }
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<QnA | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (activeQuestion) {
      scrollToTop();
    }
  }, [activeQuestion]);

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
        <span className="hidden sm:inline">🤖 M FOREX AI</span>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10">
                  <Logo />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white tracking-wide">M FOREX AI</h3>
                  <p className="text-xs text-gold-400">Trading Learning Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div ref={contentRef} className="flex-1 overflow-y-auto p-4 scroll-smooth">
              <AnimatePresence mode="wait">
                {!activeQuestion ? (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50 text-center mb-2">
                      <p className="text-sm text-slate-300">
                        Trading de common questions nu easy Punjabi ch samjho. Question select karo te detailed explanation dekho.
                      </p>
                    </div>
                    
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Popular Trading Questions</h4>
                    
                    <div className="flex flex-col gap-3">
                      {QNA_DATA.map((q, index) => (
                        <button
                          key={q.id}
                          onClick={() => setActiveQuestion(q)}
                          className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-brand-card border border-slate-700/50 hover:border-gold-500/50 hover:bg-slate-800/80 transition-all text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-gold-500/50 font-bold text-sm mt-0.5 group-hover:text-gold-400 transition-colors">
                              0{index + 1}
                            </span>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                              {q.question}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-gold-400 shrink-0 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col"
                  >
                    <button 
                      onClick={() => setActiveQuestion(null)}
                      className="flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-widest mb-4 w-fit"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to questions
                    </button>
                    
                    <div className="bg-brand-card border border-slate-700/50 rounded-2xl p-5 mb-6">
                      <h3 className="font-display font-bold text-xl text-white mb-6 pb-4 border-b border-slate-700/50">
                        {activeQuestion.question}
                      </h3>
                      
                      <div className="text-sm text-slate-300 leading-relaxed">
                        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gold-400 uppercase tracking-widest">
                          <MessageCircle className="w-4 h-4" /> Answer ↓
                        </div>
                        {activeQuestion.answer}
                      </div>
                    </div>
                    
                    {/* Call To Action Block */}
                    <div className="bg-gradient-to-b from-slate-800/50 to-brand-black border border-slate-700/50 rounded-2xl p-5 text-center">
                      <p className="text-sm font-medium text-white mb-4">
                        Hor detail te practical learning layi M Forex Capital nu Follow / Join Karo.
                      </p>
                      <div className="flex flex-col gap-3">
                        <a 
                          href="https://www.instagram.com/m.forex.capital" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors"
                        >
                          FOLLOW @m.forex.capital
                        </a>
                        <a 
                          href="https://t.me/+yjAXBlYqmP5iYjll" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-gold-500 hover:bg-gold-400 text-brand-black font-bold rounded-xl text-sm transition-colors"
                        >
                          JOIN COMMUNITY
                        </a>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setActiveQuestion(null)}
                      className="mt-6 mx-auto flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest py-3 px-6 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors"
                    >
                      Explore Another Topic ↓
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

