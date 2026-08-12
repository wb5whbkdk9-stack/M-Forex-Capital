export interface SetupScenario {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  name: string;
  context: string;
  bias: { q: string, a: string, exp: string };
  level: { q: string, a: string, exp: string };
  confirmation: { q: string, a: string, exp: string };
  result: { q: string, options: string[], correct: string, feedback: string };
}

export const SETUP_SCENARIOS: SetupScenario[] = [
  // EASY
  {
    id: 's_e_1',
    difficulty: 'easy',
    name: 'Classic Uptrend Retest',
    context: 'Market pichle 2 din ton higher highs (HH) aur higher lows (HL) bana rahi hai. Ek strong resistance break hoyi hai te price hun us level de upper aayi hai wapis.',
    bias: {
      q: 'Is market da current structure (Bias) ki hai?',
      a: 'Bullish (Uptrend)',
      exp: 'Higher highs and higher lows always mean an uptrend. Tuhada bias buy da hona chahida hai.'
    },
    level: {
      q: 'Price is waqt kis area (Level) kol hai?',
      a: 'Previous Resistance turning into Support',
      exp: 'Basic rule: Broken resistance becomes support. Eh ek high probability area (Point of Interest) hai.'
    },
    confirmation: {
      q: 'Tusi is level te ki dekhna chahte ho confirmation laye?',
      a: 'Bullish Rejection (Hammer/Engulfing)',
      exp: 'Sirf level kol aan naal entry nahi mildi. Price action nu us level ton reject hunda dekhna zaroori hai (e.g., long lower wick).'
    },
    result: {
      q: 'Confirmation candle mil gai (Bullish Pin Bar). Tuhada action?',
      options: ['Enter BUY', 'Enter SELL', 'Skip Trade'],
      correct: 'Enter BUY',
      feedback: 'Excellent. Tusi bias, level te confirmation teeno boxes tick kite. Eh A+ setup hai.'
    }
  },
  {
    id: 's_e_2',
    difficulty: 'easy',
    name: 'Downtrend Rejection',
    context: 'Price lagatar lower lows (LL) te lower highs (LH) bana rahi hai. Price wapis apne pichle breakdown zone (resistance) tak pahunch gai hai.',
    bias: {
      q: 'What is the Market Bias?',
      a: 'Bearish (Downtrend)',
      exp: 'Lower lows indicate sellers are in control.'
    },
    level: {
      q: 'Where is the price right now?',
      a: 'At Key Resistance',
      exp: 'Price is testing the previous support which now acts as resistance.'
    },
    confirmation: {
      q: 'What confirmation are we looking for?',
      a: 'Bearish patterns (Shooting Star, Bearish Engulfing)',
      exp: 'We need sellers to show up at this resistance level before we enter.'
    },
    result: {
      q: 'A Bearish Engulfing candle forms. What do you do?',
      options: ['Enter BUY', 'Enter SELL', 'Skip Trade'],
      correct: 'Enter SELL',
      feedback: 'Perfect execution of a trend-continuation trade.'
    }
  },
  
  // MEDIUM
  {
    id: 's_m_1',
    difficulty: 'medium',
    name: 'Counter-Trend Reversal',
    context: 'Market strong downtrend ch si. Par recent lower high (LH) nu price ne break karke upper close ditta hai. Hun price wapis thalle pullback kar rahi hai.',
    bias: {
      q: 'Market structure ne ki kitta hai?',
      a: 'Change of Character (ChoCh) - Shift to Bullish',
      exp: 'Jado downtrend vich pichla lower high break hunda hai, ta trend change (ChoCh) da pehla sign milda hai.'
    },
    level: {
      q: 'Pullback te kis level te focus karoge?',
      a: 'New Higher Low (Support/Demand Zone)',
      exp: 'Change of Character baad, aapan ek nava demand zone (order block/support) dhundhde aa jithe Buyers enter ho sakde ne.'
    },
    confirmation: {
      q: 'Ki sirf zone ch ponchde hi buy kar lena theek hai?',
      a: 'Nahi, Wait for Rejection (Bullish PA)',
      exp: 'Kyunki eh trend change da pehla step hai, fakeout ho sakda hai. Lower timeframe te rejection dekhna zaruri hai.'
    },
    result: {
      q: 'Price demand zone vich aundi hai aur bina rukke (strong red candles) tod dindi hai. Action?',
      options: ['Enter BUY early', 'Enter SELL', 'Skip Trade'],
      correct: 'Skip Trade',
      feedback: 'Good discipline. Level fail ho gaya te confirmation nahi mili. Capital bacha leya.'
    }
  },
  
  // HARD
  {
    id: 's_h_1',
    difficulty: 'hard',
    name: 'High Impact News Event',
    context: 'NFP (Non-Farm Payroll) news release hon wali hai 5 minute vich. Market ek range vich move kar rahi si. Tuhada setup almost ready lag reha hai.',
    bias: {
      q: 'Pre-news bias kida hona chahida hai?',
      a: 'Neutral / No Trade Zone',
      exp: 'News ton pehlan technical analysis fail ho sakda hai due to high volatility and low liquidity.'
    },
    level: {
      q: 'Levels da ki mahatav hai news time te?',
      a: 'Levels can easily be swept (fakeouts)',
      exp: 'News spikes aksar stop losses nu hit karan (liquidity sweep) layi levels break karde ne te fir reverse ho jande ne.'
    },
    confirmation: {
      q: 'News trade karan da best tarika ki hai?',
      a: 'Wait for the dust to settle (15-30 mins post news)',
      exp: 'Professional traders news de aunde spike te trade nahi karde, oh wait karde ne price nu settle hon dinde ne te real direction pakarde ne.'
    },
    result: {
      q: 'News release hundi hai te price tuhade level nu vaddi green candle naal cross kardi hai, par agli candle vaddi red aundi hai. Tusi ki kita hunda?',
      options: ['Trade the green breakout', 'Trade the red drop', 'Skip and watch'],
      correct: 'Skip and watch',
      feedback: 'Excellent. News time te eh "whipsaw" movement aam hai. Capital preserve karna zaroori si.'
    }
  }
];
