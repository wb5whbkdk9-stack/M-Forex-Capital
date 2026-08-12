export interface ChartScenario {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  context: string;
  chart: { type: 'bull' | 'bear' | 'doji'; height: string; pos: string; wick?: 'top' | 'bottom' | 'both'; highlight?: boolean }[];
  question: string;
  options: string[];
  correctProcess: string;
  feedback: Record<string, { msg: string; detail: string; xp: number }>;
  nextCandles: { type: 'bull' | 'bear' | 'doji'; height: string; pos: string; wick?: 'top' | 'bottom' | 'both' }[];
}

export const CHART_SCENARIOS: ChartScenario[] = [
  // EASY
  {
    id: 'ch_e_1',
    difficulty: 'easy',
    title: 'Breakout at Resistance',
    context: 'Price pichle kuch time ton ek strong resistance level de thalle si. Hun ek vaddi green candle ne is level nu cross kar ditta hai.',
    chart: [
      { type: 'bull', height: 'h-10', pos: 'bottom-2' },
      { type: 'bear', height: 'h-6', pos: 'bottom-8' },
      { type: 'bull', height: 'h-12', pos: 'bottom-6' },
      { type: 'bear', height: 'h-4', pos: 'bottom-[3.5rem]' },
      { type: 'bull', height: 'h-24', pos: 'bottom-[4rem]', highlight: true }, // Breakout candle
    ],
    question: 'Hun tusi ki observe/expect karoge?',
    options: ['BUY', 'SELL', 'WAIT'],
    correctProcess: 'WAIT',
    feedback: {
      BUY: { msg: 'Is scenario ch tusi early entry (FOMO) choose kiti.', detail: 'Breakout candle vaddi hai, par haley retest ya further confirmation nahi aayi. Faked out hon da risk hai.', xp: -5 },
      SELL: { msg: 'Against momentum trade.', detail: 'Strong bullish breakout de against sell karna risky hai.', xp: -5 },
      WAIT: { msg: 'Good process!', detail: 'Patience. Breakout ton baad retest (pullback) te confirmation da wait karna best hunda hai.', xp: 20 },
    },
    nextCandles: [
      { type: 'bear', height: 'h-8', pos: 'bottom-[8rem]' }, // Pullback
      { type: 'bull', height: 'h-16', pos: 'bottom-[7rem]' }, // Continuation
    ]
  },
  {
    id: 'ch_e_2',
    difficulty: 'easy',
    title: 'Downtrend Pullback',
    context: 'Market clear downtrend vich hai. Ek recent support break hon ton baad, price wapis thoda upar ja rehi hai (pullback).',
    chart: [
      { type: 'bear', height: 'h-16', pos: 'top-2' },
      { type: 'bear', height: 'h-20', pos: 'top-12' },
      { type: 'bull', height: 'h-8', pos: 'top-[7rem]' },
      { type: 'bull', height: 'h-10', pos: 'top-[6rem]', highlight: true }, // Pullback approaching resistance
    ],
    question: 'Market structure downtrend ch hai. Hun ki karoge?',
    options: ['BUY', 'SELL', 'WAIT'],
    correctProcess: 'WAIT',
    feedback: {
      BUY: { msg: 'Counter-trend trade.', detail: 'Downtrend vich buy karna risky hai. Overall trend bears de control ch hai.', xp: -5 },
      SELL: { msg: 'Entry too early.', detail: 'Tusi sell theek sochi hai, par haley price resistance (purani support) te ponch ke rejection nahi dikha rahi.', xp: 5 },
      WAIT: { msg: 'Smart choice.', detail: 'Price nu resistance area te ponch len dyo, te othe bearish rejection candle da wait karo before selling.', xp: 20 },
    },
    nextCandles: [
      { type: 'bear', height: 'h-6', pos: 'top-[5rem]', wick: 'top' }, // Rejection
      { type: 'bear', height: 'h-24', pos: 'top-[6.5rem]' }, // Drop
    ]
  },
  
  // MEDIUM
  {
    id: 'ch_m_1',
    difficulty: 'medium',
    title: 'The Middle of the Range',
    context: 'Price support aur resistance de vichkar fassi hui hai. Achanak ik lami green candle range de exactly middle vich bandi hai.',
    chart: [
      { type: 'bull', height: 'h-12', pos: 'bottom-2' },
      { type: 'bear', height: 'h-16', pos: 'bottom-[4rem]' },
      { type: 'bull', height: 'h-6', pos: 'bottom-8' },
      { type: 'bull', height: 'h-20', pos: 'bottom-12', highlight: true },
    ],
    question: 'Big green candle! Ki trade launi chahidi aa?',
    options: ['BUY', 'SELL', 'WAIT / NO TRADE'],
    correctProcess: 'WAIT / NO TRADE',
    feedback: {
      BUY: { msg: 'No clear setup zone.', detail: 'Range de middle vich trade karna risky hai kyunki target chota reh janda hai te SL badda hunda hai.', xp: -10 },
      SELL: { msg: 'Fighting momentum.', detail: 'Green candle de directly against sell karna without rejection proof galat hai.', xp: -5 },
      'WAIT / NO TRADE': { msg: 'Excellent discipline.', detail: 'Trade na lena vi ik decision hai. High probability setups sirf extremes (support ya resistance) te milde ne.', xp: 25 },
    },
    nextCandles: [
      { type: 'doji', height: 'h-2', pos: 'bottom-[7rem]', wick: 'both' },
      { type: 'bear', height: 'h-12', pos: 'bottom-[4rem]' },
    ]
  },
  {
    id: 'ch_m_2',
    difficulty: 'medium',
    title: 'Support Retest with Rejection',
    context: 'Price resistance tod ke upar gai si. Hun wapis usi level (jo hun support hai) te aayi hai te ek long wick rejection (hammer) banaya hai.',
    chart: [
      { type: 'bull', height: 'h-24', pos: 'bottom-2' }, // Initial Breakout
      { type: 'bear', height: 'h-8', pos: 'bottom-[6rem]' },
      { type: 'bear', height: 'h-6', pos: 'bottom-[4.5rem]' },
      { type: 'bull', height: 'h-6', pos: 'bottom-[4rem]', wick: 'bottom', highlight: true }, // Hammer retest
    ],
    question: 'Context, level aur confirmation present ne. Tusi ki karoge?',
    options: ['BUY', 'SELL', 'WAIT'],
    correctProcess: 'BUY',
    feedback: {
      BUY: { msg: 'Good execution!', detail: 'Structure (Uptrend) + Key Level (Retest) + Confirmation (Hammer/Rejection). Eh ek valid high-probability setup hai.', xp: 20 },
      SELL: { msg: 'Wrong bias.', detail: 'Support te bullish confirmation milan baad sell karna illogical hai.', xp: -10 },
      WAIT: { msg: 'Over-cautious.', detail: 'Confirmation aa chuki hai. Kadi-kadi zyada wait karan naal good R/R opportunity miss ho jandi hai.', xp: 5 },
    },
    nextCandles: [
      { type: 'bull', height: 'h-16', pos: 'bottom-[5rem]' },
      { type: 'bull', height: 'h-20', pos: 'bottom-[8rem]' },
    ]
  },
  
  // HARD
  {
    id: 'ch_h_1',
    difficulty: 'hard',
    title: 'The Liquidity Grab (Fakeout)',
    context: 'Price apne previous high nu cross kardi hai (breakout), par turant baad ek vaddi red engulfing candle previous level de thalle wapis aa jandi hai.',
    chart: [
      { type: 'bull', height: 'h-16', pos: 'bottom-8' },
      { type: 'bear', height: 'h-6', pos: 'bottom-[5rem]' },
      { type: 'bull', height: 'h-20', pos: 'bottom-[3.5rem]' }, // Breaks high
      { type: 'bear', height: 'h-28', pos: 'bottom-[2rem]', highlight: true }, // Engulfs back in
    ],
    question: 'Breakout fail ho gaya lagda hai. Tuhada decision?',
    options: ['BUY', 'SELL', 'WAIT'],
    correctProcess: 'SELL',
    feedback: {
      BUY: { msg: 'Trapped!', detail: 'Tusi fakeout ch fass gaye. Jab price aggressively wapis aundi hai, oh liquidity grab hunda hai. Bullish momentum khatam ho chuka hai.', xp: -15 },
      SELL: { msg: 'Advanced read!', detail: 'Fakeout/Liquidity grab ek boht strong reversal signal hunda hai. Aggressive entry theek si.', xp: 30 },
      WAIT: { msg: 'Acceptable safety.', detail: 'Wait karna safe hai, par professional traders fakeouts nu high probability setup mannde ne.', xp: 10 },
    },
    nextCandles: [
      { type: 'bear', height: 'h-16', pos: 'bottom-[1rem]' },
      { type: 'bear', height: 'h-24', pos: 'bottom-[-4rem]' },
    ]
  }
];
