export interface CandleScenario {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  name: string;
  description: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
  chart: { type: 'bull' | 'bear' | 'doji'; height: string; pos: string; wickTop?: string; wickBottom?: string; color?: string }[];
}

export const CANDLE_SCENARIOS: CandleScenario[] = [
  // EASY
  {
    id: 'c_e_1', difficulty: 'easy', name: 'Long Wick Rejection',
    description: 'Candle de bottom te boht lamba wick hai te choti body top te hai (Hammer type).',
    question: 'Eh candle price behaviour bare ki clue de sakdi aa?',
    options: [
      { text: 'A — Strong selling pressure', isCorrect: false },
      { text: 'B — Guaranteed reversal', isCorrect: false },
      { text: 'C — Strong rejection from lower prices', isCorrect: true },
      { text: 'D — No information', isCorrect: false }
    ],
    explanation: 'Eh candle lower prices reject hon da clue de sakdi hai (buying pressure). Par context important hai. Sirf is candle nu dekh ke trade nahi leni. Market structure te next candle confirmation vi check karo.',
    chart: [{ type: 'bull', height: 'h-6', pos: 'bottom-8', wickBottom: 'h-16 -bottom-16', wickTop: 'h-2 -top-2' }]
  },
  {
    id: 'c_e_2', difficulty: 'easy', name: 'Bearish Engulfing',
    description: 'Ek choti green candle ton baad, ek vaddi red candle aundi hai jo pichli candle nu puri tarah cover kar lendi hai.',
    question: 'Eh pattern ki indicate karda hai?',
    options: [
      { text: 'A — Buyers are in full control', isCorrect: false },
      { text: 'B — Potential shift in momentum to sellers', isCorrect: true },
      { text: 'C — The market is ranging', isCorrect: false },
      { text: 'D — 100% chance of price dropping', isCorrect: false }
    ],
    explanation: 'Eh shift in momentum da sign hai. Sellers ne control take over kar leya hai, par confirmation zaroori hai. Always check if this happens at a key resistance level.',
    chart: [
      { type: 'bull', height: 'h-8', pos: 'bottom-4', wickTop: 'h-4 -top-4', wickBottom: 'h-2 -bottom-2' },
      { type: 'bear', height: 'h-20', pos: 'bottom-2', wickTop: 'h-2 -top-2', wickBottom: 'h-4 -bottom-4' }
    ]
  },
  {
    id: 'c_e_3', difficulty: 'easy', name: 'Doji',
    description: 'Candle di open aur close lagbhag same hai, te upar-niche lambe wicks ne.',
    question: 'Eh candle ki darshandi hai?',
    options: [
      { text: 'A — Indecision in the market', isCorrect: true },
      { text: 'B — Strong uptrend', isCorrect: false },
      { text: 'C — Strong downtrend', isCorrect: false },
      { text: 'D — High volatility breakout', isCorrect: false }
    ],
    explanation: 'Doji indecision show kardi hai. Buyers te sellers vichkar fight chal rahi hai te koi clearly win nahi kar reha. Hamesha next candle di direction da wait karo.',
    chart: [{ type: 'doji', height: 'h-1', pos: 'bottom-12', color: 'bg-slate-400', wickTop: 'h-10 -top-10', wickBottom: 'h-10 -bottom-10' }]
  },
  {
    id: 'c_e_4', difficulty: 'easy', name: 'Shooting Star',
    description: 'Candle de top te boht lamba wick hai te choti body bottom te hai.',
    question: 'Resistance de kol eh candle ki clue dindi hai?',
    options: [
      { text: 'A — Upper-price rejection', isCorrect: true },
      { text: 'B — Guaranteed sell', isCorrect: false },
      { text: 'C — Breakout incoming', isCorrect: false },
      { text: 'D — Buyers are gaining strength', isCorrect: false }
    ],
    explanation: 'Lamba upper wick sellers di entry darshanda hai jado price upar jaan di koshish kardi hai. Resistance de kol eh ek strong bearish clue ho sakda hai.',
    chart: [{ type: 'bear', height: 'h-6', pos: 'bottom-4', wickTop: 'h-16 -top-16', wickBottom: 'h-2 -bottom-2' }]
  },
  {
    id: 'c_e_5', difficulty: 'easy', name: 'Bullish Engulfing',
    description: 'Ek choti red candle ton baad, ek vaddi green candle aundi hai.',
    question: 'Support de kol eh pattern ki darshanda hai?',
    options: [
      { text: 'A — Trend continuation downwards', isCorrect: false },
      { text: 'B — Potential shift in momentum to buyers', isCorrect: true },
      { text: 'C — Indecision', isCorrect: false },
      { text: 'D — Avoid trading completely', isCorrect: false }
    ],
    explanation: 'Vaddi green candle darshandi hai ki buyers ne control le leya hai te previous selling momentum nu overcome kar leya hai.',
    chart: [
      { type: 'bear', height: 'h-8', pos: 'bottom-4', wickTop: 'h-2 -top-2', wickBottom: 'h-4 -bottom-4' },
      { type: 'bull', height: 'h-20', pos: 'bottom-2', wickTop: 'h-4 -top-4', wickBottom: 'h-2 -bottom-2' }
    ]
  },
  
  // MEDIUM
  {
    id: 'c_m_1', difficulty: 'medium', name: 'Hammer in Downtrend',
    description: 'Market downtrend vich hai, te achanak support level de kol ek lamba lower wick candle (Hammer) ban janda hai.',
    question: 'Is context vich eh candle ki suggest kardi hai?',
    options: [
      { text: 'A — Strong confirmation to BUY immediately', isCorrect: false },
      { text: 'B — Sellers are exhausted, but wait for a bullish confirmation candle', isCorrect: true },
      { text: 'C — Trend will continue downwards guaranteed', isCorrect: false },
      { text: 'D — It is a fakeout', isCorrect: false }
    ],
    explanation: 'Hammer ek potential reversal sign hai, par downtrend de against trade karan laye further confirmation (like next candle bullish) zaroori hai.',
    chart: [
      { type: 'bear', height: 'h-16', pos: 'bottom-[6rem]' },
      { type: 'bear', height: 'h-12', pos: 'bottom-[3rem]' },
      { type: 'bull', height: 'h-6', pos: 'bottom-4', wickBottom: 'h-16 -bottom-16', wickTop: 'h-2 -top-2' }
    ]
  },
  {
    id: 'c_m_2', difficulty: 'medium', name: 'Long Green Candle in Range',
    description: 'Market support te resistance de vichkar (range) move kar rahi hai. Achanak range de vichkar ek vaddi green candle bandi hai.',
    question: 'Is location te is candle da ki fayda hai?',
    options: [
      { text: 'A — Strong bullish momentum, must buy', isCorrect: false },
      { text: 'B — It guarantees a breakout above resistance', isCorrect: false },
      { text: 'C — Momentum may be present, but location makes it risky (no clear setup)', isCorrect: true },
      { text: 'D — It means the range is broken', isCorrect: false }
    ],
    explanation: 'Candle vaddi hai, par range de middle ch trade karna risky hunda hai kyunki stop loss placement logical nahi hundi te R/R kharab hunda hai.',
    chart: [
      { type: 'bear', height: 'h-8', pos: 'bottom-[4rem]' },
      { type: 'bull', height: 'h-6', pos: 'bottom-[3.5rem]' },
      { type: 'bull', height: 'h-24', pos: 'bottom-[4rem]' }
    ]
  },
  {
    id: 'c_m_3', difficulty: 'medium', name: 'Small Body after Volatility',
    description: 'Boht tez movement (lambi candles) ton baad, price ek choti jihi Doji ya spinning top banaundi hai.',
    question: 'Eh ki indicate karda hai?',
    options: [
      { text: 'A — The trend is accelerating', isCorrect: false },
      { text: 'B — Temporary balance or potential exhaustion', isCorrect: true },
      { text: 'C — Market is crashing', isCorrect: false },
      { text: 'D — You should enter with full margin', isCorrect: false }
    ],
    explanation: 'Vaddi movement ton baad choti candle aam taur te profit taking, exhaustion ya temporary pause nu darshandi hai. Reversal ya continuation layi next move da wait karo.',
    chart: [
      { type: 'bull', height: 'h-16', pos: 'bottom-4' },
      { type: 'bull', height: 'h-24', pos: 'bottom-[4.5rem]' },
      { type: 'doji', height: 'h-2', pos: 'bottom-[10.5rem]', color: 'bg-slate-400', wickTop: 'h-4 -top-4', wickBottom: 'h-4 -bottom-4' }
    ]
  },
  
  // HARD
  {
    id: 'c_h_1', difficulty: 'hard', name: 'Multiple Wick Rejections',
    description: 'Pichliyan 3 candles lamba upper wick dikha rahiya ne same level te, par price thalle vi nahi ja rahi (chotiyan green bodies).',
    question: 'Resistance area te is price action nu kivein read karoge?',
    options: [
      { text: 'A — Buyers are pushing up constantly, breakout imminent', isCorrect: false },
      { text: 'B — Sellers are absorbing all buying pressure, preparing for a drop', isCorrect: true },
      { text: 'C — This is a ranging market, no bias', isCorrect: false },
      { text: 'D — Candlesticks are broken', isCorrect: false }
    ],
    explanation: 'Jab price baar-baar upar ja ke thalle wapis aa jandi hai (long upper wicks), ehda matlab sellers active ne te buyers di power absorb kar rahe ne. Eh strong bearish bias indicate karda hai.',
    chart: [
      { type: 'bull', height: 'h-4', pos: 'bottom-12', wickTop: 'h-16 -top-16', wickBottom: 'h-2 -bottom-2' },
      { type: 'bull', height: 'h-3', pos: 'bottom-[3.2rem]', wickTop: 'h-14 -top-14', wickBottom: 'h-1 -bottom-1' },
      { type: 'bull', height: 'h-5', pos: 'bottom-[3.4rem]', wickTop: 'h-15 -top-15', wickBottom: 'h-3 -bottom-3' }
    ]
  },
  {
    id: 'c_h_2', difficulty: 'hard', name: 'Fake Breakout Candle (Bull Trap)',
    description: 'Price ne resistance nu ek strong green candle naal break kita, par exactly agli hi candle vaddi red bani jisne price nu wapis range ch la ditta.',
    question: 'Is scenario vich best approach ki hundi hai?',
    options: [
      { text: 'A — Buy immediately on the green breakout candle', isCorrect: false },
      { text: 'B — Wait for a retest or secondary confirmation before entering a breakout', isCorrect: true },
      { text: 'C — Sell on the green candle predicting a fakeout', isCorrect: false },
      { text: 'D — Never trade breakouts', isCorrect: false }
    ],
    explanation: 'Eh ek classic bull trap hai. Breakout te wait/retest strategy (process) use karna better hunda hai to avoid getting caught in false moves.',
    chart: [
      { type: 'bear', height: 'h-10', pos: 'bottom-4' },
      { type: 'bull', height: 'h-24', pos: 'bottom-[3rem]' }, // Breakout
      { type: 'bear', height: 'h-28', pos: 'bottom-2' } // Fakeout drop
    ]
  }
];
