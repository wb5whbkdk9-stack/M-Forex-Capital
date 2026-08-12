import { Candle } from '../../hooks/useSimulatorState';

export interface Scenario {
  id: string;
  name: string;
  instrument: string;
  timeframe: string;
  data: Candle[];
}

function generateData(seed: number, count: number, startPrice: number, volatility: number, trend: number): Candle[] {
  let currentPrice = startPrice;
  let time = new Date('2026-08-01T00:00:00Z').getTime();
  const candles: Candle[] = [];

  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    
    // Random walk with trend
    const move = (Math.random() - 0.5 + trend) * volatility;
    const close = open + move;
    
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    candles.push({
      time: new Date(time).toISOString(),
      open,
      high,
      low,
      close
    });

    currentPrice = close;
    time += 15 * 60000; // 15m intervals
  }

  return candles;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    name: 'Bullish Trend',
    instrument: 'XAU/USD',
    timeframe: '15M',
    data: generateData(1, 100, 2400.00, 2.0, 0.2) // Gold-like
  },
  {
    id: 's2',
    name: 'Bearish Trend',
    instrument: 'EUR/USD',
    timeframe: '15M',
    data: generateData(2, 100, 1.1000, 0.002, -0.1)
  },
  {
    id: 's3',
    name: 'Range Bound',
    instrument: 'GBP/USD',
    timeframe: '15M',
    data: generateData(3, 100, 1.3000, 0.003, 0)
  },
  {
    id: 's4',
    name: 'Volatile Chop',
    instrument: 'USD/JPY',
    timeframe: '15M',
    data: generateData(4, 100, 150.00, 0.5, 0)
  },
  {
    id: 's5',
    name: 'Support Rejection',
    instrument: 'XAU/USD',
    timeframe: '15M',
    data: [
      ...generateData(5, 50, 2420, 1.5, -0.2), // drops
      ...generateData(6, 50, 2400, 2.0, 0.3)   // bounces
    ]
  },
  {
    id: 's6',
    name: 'Resistance Breakout',
    instrument: 'EUR/USD',
    timeframe: '15M',
    data: [
      ...generateData(7, 50, 1.0950, 0.001, 0.05), // grinds up
      ...generateData(8, 50, 1.1000, 0.003, 0.4)   // breaks out
    ]
  }
];

export function getRandomScenario(): Scenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}
