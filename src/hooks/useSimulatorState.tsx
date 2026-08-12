import { useState, useEffect } from 'react';

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Trade {
  id: string;
  instrument: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  sl: number | null;
  tp: number | null;
  positionSize: number;
  riskAmount: number;
  potentialReward: number;
  status: 'OPEN' | 'CLOSED';
  exitPrice?: number;
  pnl?: number;
  reason?: 'SL HIT' | 'TP HIT' | 'Manual Close';
  openTime: string;
  closeTime?: string;
}

export interface SimulatorState {
  balance: number;
  equity: number;
  openTrades: Trade[];
  tradeHistory: Trade[];
  xp: number;
}

const INITIAL_BALANCE = 10000;

export function useSimulatorState() {
  const [state, setState] = useState<SimulatorState>(() => {
    const saved = localStorage.getItem('mforex_simulator');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      balance: INITIAL_BALANCE,
      equity: INITIAL_BALANCE,
      openTrades: [],
      tradeHistory: [],
      xp: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('mforex_simulator', JSON.stringify(state));
  }, [state]);

  const addTrade = (trade: Omit<Trade, 'id' | 'status' | 'openTime'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Math.random().toString(36).substr(2, 9),
      status: 'OPEN',
      openTime: new Date().toISOString()
    };
    setState(s => ({
      ...s,
      openTrades: [...s.openTrades, newTrade]
    }));
  };

  const closeTrade = (id: string, exitPrice: number, reason: Trade['reason']) => {
    setState(s => {
      const trade = s.openTrades.find(t => t.id === id);
      if (!trade) return s;

      const multiplier = trade.direction === 'BUY' ? 1 : -1;
      // Simple pip-based or direct calculation depending on how we define position size.
      // Let's assume positionSize is the actual monetary stake for 1% move, or simpler:
      // standard forex lots. 1 lot = $10 per pip on EURUSD. We can just use a generic multiplier.
      // For simplicity: PNL = (Exit - Entry) * PositionSize * Multiplier (with a fixed scale factor)
      // Actually, if riskAmount is known, we can calculate PNL based on Risk / (Entry - SL).
      const priceDiff = (exitPrice - trade.entryPrice) * multiplier;
      // If we use R:R, and user sets SL, the distance is entry - SL.
      const slDistance = Math.abs(trade.entryPrice - (trade.sl || trade.entryPrice));
      
      let pnl = 0;
      if (slDistance > 0) {
        // If price moves by slDistance, PNL = riskAmount
        pnl = (priceDiff / slDistance) * trade.riskAmount;
      } else {
        // Fallback simple calc
        pnl = priceDiff * trade.positionSize * 1000; 
      }

      const closedTrade: Trade = {
        ...trade,
        status: 'CLOSED',
        exitPrice,
        pnl,
        reason,
        closeTime: new Date().toISOString()
      };

      const newBalance = s.balance + pnl;

      return {
        ...s,
        balance: newBalance,
        equity: newBalance, // will update later with floating
        openTrades: s.openTrades.filter(t => t.id !== id),
        tradeHistory: [...s.tradeHistory, closedTrade]
      };
    });
  };

  const updateEquity = (currentPrice: number) => {
    setState(s => {
      let floatingPnl = 0;
      s.openTrades.forEach(trade => {
        const multiplier = trade.direction === 'BUY' ? 1 : -1;
        const priceDiff = (currentPrice - trade.entryPrice) * multiplier;
        const slDistance = Math.abs(trade.entryPrice - (trade.sl || trade.entryPrice));
        if (slDistance > 0) {
          floatingPnl += (priceDiff / slDistance) * trade.riskAmount;
        } else {
          floatingPnl += priceDiff * trade.positionSize * 1000;
        }
      });
      return {
        ...s,
        equity: s.balance + floatingPnl
      };
    });
  };

  const updateTradeSLTP = (id: string, sl: number | null, tp: number | null) => {
    setState(s => ({
      ...s,
      openTrades: s.openTrades.map(t => t.id === id ? { ...t, sl, tp } : t)
    }));
  };

  const reset = () => {
    setState({
      balance: INITIAL_BALANCE,
      equity: INITIAL_BALANCE,
      openTrades: [],
      tradeHistory: [],
      xp: 0
    });
  };

  const addXP = (amount: number) => {
    setState(s => ({ ...s, xp: s.xp + amount }));
  };

  return {
    state,
    addTrade,
    closeTrade,
    updateEquity,
    updateTradeSLTP,
    reset,
    addXP
  };
}
