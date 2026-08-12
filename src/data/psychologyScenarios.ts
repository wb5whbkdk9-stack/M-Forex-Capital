export interface PsychScenario {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenario: string;
  options: { text: string; correct: boolean; explanation: string; trait: string }[];
}

export const PSYCH_SCENARIOS: PsychScenario[] = [
  // EASY
  {
    id: 'p_e_1',
    difficulty: 'easy',
    scenario: 'Tuhade 3 lagatar stop-loss hit ho gaye ne aaj. Tuhada mind thoda gusse ch hai (frustrated). Tusi chart dekhde ho te ek average jeha setup disda hai.',
    options: [
      { text: 'A — "Ek aakhri trade laike apna loss recover karan di koshish karda haan."', correct: false, explanation: 'Revenge Trading. Market naal fight nahi kari di. Loss recover karan de chakkar ch loss aur wadda hunda hai.', trait: 'Revenge Trader' },
      { text: 'B — "Screen band kar dinda haan te kal nve mind naal aawanga."', correct: true, explanation: 'Professional decision. Capital protection zaroori hai. Consecutive losses baad break lena sabton best strategy hai.', trait: 'Disciplined Trader' },
      { text: 'C — "Lot size double karke enter karda haan taa jo jaldi recover ho jawe."', correct: false, explanation: 'Martingale / Gambler mindset. Eh account wash karan da sabton tez tarika hai.', trait: 'Gambler' }
    ]
  },
  {
    id: 'p_e_2',
    difficulty: 'easy',
    scenario: 'Tuhadi trade profit vich hai ($100), par tuhada target $200 si. Achanak price tezi naal waapis tuhade entry point wal aa rahi hai.',
    options: [
      { text: 'A — "Stop loss hata dinda haan, umeed hai wapis jayega."', correct: false, explanation: 'Hope Trading. Stop loss hatauna rule todna hai te account empty karwa sakda hai.', trait: 'Hopeful Loser' },
      { text: 'B — "Panic vich turant trade close kar dinda haan ($10 de profit te)."', correct: false, explanation: 'Fear. Plan nu follow nahi kitta. Achanak fear karan naal tuhi lamba profit hold nahi kar paoge.', trait: 'Fearful Trader' },
      { text: 'C — "Stop loss nu breakeven (entry point) te move kar dinda haan te plan follow karda haan."', correct: true, explanation: 'Risk Management. Tusi risk zero kar ditta te plan nu play out hon da time ditta. Win-win.', trait: 'Risk Manager' }
    ]
  },
  
  // MEDIUM
  {
    id: 'p_m_1',
    difficulty: 'medium',
    scenario: 'Tusi subah toh charts dekh rahe ho (4 ghante ho gaye) par koi clear setup nahi milya. Boreiyat (Boredom) feel ho rahi hai.',
    options: [
      { text: 'A — "Koi chota-mota support/resistance labh ke scalp kar lenda haan time pass layi."', correct: false, explanation: 'Overtrading due to boredom. Quality setups da wait karna hi trading da 80% hissa hai.', trait: 'Overtrader' },
      { text: 'B — "Alerts set karda haan aur screen ton door (break) chala janda haan."', correct: true, explanation: 'Excellent patience. Alerts tuhadi madad karan layi hunde ne. Screen time ghatt karo.', trait: 'Patient Trader' },
      { text: 'C — "YouTube te kisi live trader di stream dekh ke usda signal copy kar lenda haan."', correct: false, explanation: 'Blind following. Tusi apna process chhod ke kisi hor de process te risk le rahe ho.', trait: 'Dependent Trader' }
    ]
  },
  {
    id: 'p_m_2',
    difficulty: 'medium',
    scenario: 'Tusi ek trade miss kar ditti jo tuhade zone te aayi si, par tusi darr gaye. Hun oh trade sidha tuhade target vall badi tezi naal ja rahi hai (FOMO).',
    options: [
      { text: 'A — "Jaldi naal market price te buy kar lenda haan beech raste ch."', correct: false, explanation: 'FOMO (Fear Of Missing Out) Trading. Tusi bad R/R (Risk/Reward) te enter kar rahe ho.', trait: 'FOMO Victim' },
      { text: 'B — "Accept karda haan ki trade miss ho gai, aur next opportunity da wait karda haan."', correct: true, explanation: 'Emotional control. Market hamesha new opportunities dindi hai. Chasing is for amateurs.', trait: 'Professional' },
      { text: 'C — "Gusse vich short (sell) kar dinda haan yeh soch ke ki price gir jaayegi."', correct: false, explanation: 'Revenge/Counter-trend trading based on emotion rather than logic.', trait: 'Revenge Trader' }
    ]
  },
  
  // HARD
  {
    id: 'p_h_1',
    difficulty: 'hard',
    scenario: 'Pichle 2 hafte ton tuhada win rate 90% reha hai. Tusi boht confidence (overconfidence) vich ho. Aaj ek boht vadiya setup milya hai.',
    options: [
      { text: 'A — "Risk management rule tod ke 5x lot size use karda haan kyunki mainu pata hai main sahi haan."', correct: false, explanation: 'Overconfidence bias. Market kisi di nahi hai. Ek vadda loss pichle sare profits kha jayega.', trait: 'Arrogant Gambler' },
      { text: 'B — "Normal 1-2% risk de naal hi enter karda haan, process process hai."', correct: true, explanation: 'Consistency. Tusi jande ho ki har trade independent hundi hai te outcome uncertain hunda hai.', trait: 'Consistent Pro' },
      { text: 'C — "Take profit hata dinda haan kyunki eh trade ta asman chhed degi."', correct: false, explanation: 'Greed. Profit locking da koi plan nahi, market reverse hoke zero kar sakdi hai.', trait: 'Greedy' }
    ]
  }
];
