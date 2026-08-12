import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulatorState, Candle } from '../../hooks/useSimulatorState';
import { SCENARIOS, getRandomScenario, Scenario } from './scenarios';
import { Chart } from './Chart';
import { Play, Pause, SkipForward, RotateCcw, X, Target, AlertTriangle } from 'lucide-react';

export function SimulatorApp() {
  const { state, addTrade, closeTrade, updateEquity, reset, addXP } = useSimulatorState();
  
  const [scenario, setScenario] = useState<Scenario>(getRandomScenario());
  const [currentIndex, setCurrentIndex] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showOrderPanel, setShowOrderPanel] = useState<'BUY' | 'SELL' | null>(null);
  const [orderConfig, setOrderConfig] = useState<{ sl: number | null, tp: number | null, size: number, riskPercent: number }>({
    sl: null,
    tp: null,
    size: 0.1,
    riskPercent: 1
  });
  const [showReview, setShowReview] = useState<any>(null);

  const visibleData = scenario.data.slice(0, currentIndex);
  const currentPrice = visibleData[visibleData.length - 1]?.close || 0;

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNextCandle();
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, currentIndex, state.openTrades]);

  useEffect(() => {
    updateEquity(currentPrice);
  }, [currentPrice]);

  const handleNextCandle = () => {
    if (currentIndex >= scenario.data.length) {
      setIsPlaying(false);
      return;
    }
    const nextCandle = scenario.data[currentIndex];
    
    // Check SL/TP
    state.openTrades.forEach(trade => {
      if (trade.direction === 'BUY') {
        if (trade.sl && nextCandle.low <= trade.sl) closeTrade(trade.id, trade.sl, 'SL HIT');
        else if (trade.tp && nextCandle.high >= trade.tp) closeTrade(trade.id, trade.tp, 'TP HIT');
      } else {
        if (trade.sl && nextCandle.high >= trade.sl) closeTrade(trade.id, trade.sl, 'SL HIT');
        else if (trade.tp && nextCandle.low <= trade.tp) closeTrade(trade.id, trade.tp, 'TP HIT');
      }
    });

    setCurrentIndex(i => i + 1);
  };

  const handlePlaceTrade = () => {
    if (!showOrderPanel) return;
    
    // Calculate risk amount
    const riskAmount = (state.balance * orderConfig.riskPercent) / 100;
    const slDistance = Math.abs(currentPrice - (orderConfig.sl || currentPrice));
    const tpDistance = Math.abs(currentPrice - (orderConfig.tp || currentPrice));
    
    addTrade({
      instrument: scenario.instrument,
      direction: showOrderPanel,
      entryPrice: currentPrice,
      sl: orderConfig.sl,
      tp: orderConfig.tp,
      positionSize: orderConfig.size,
      riskAmount,
      potentialReward: tpDistance > 0 && slDistance > 0 ? riskAmount * (tpDistance / slDistance) : 0,
    });
    
    setShowOrderPanel(null);
    addXP(10);
  };

  return (
    <section id="simulator" className="py-24 bg-brand-dark border-y border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
            Educational Simulation
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            🎮 M FOREX <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">TRADING SIMULATOR</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            Trade Practice Karo — Real Money Ton Bina. Virtual balance naal simulated market ch BUY/SELL practice karo, Stop Loss te Take Profit set karo, position size samjho te har trade ton baad apni decision-making review karo.
          </p>
          <div className="text-red-400/80 text-sm font-bold bg-red-500/10 inline-block px-4 py-2 rounded-lg border border-red-500/20">
            Simulation Only — No Real Orders Are Placed.
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-brand-black border border-slate-800 p-4 rounded-xl text-center shadow-lg">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Virtual Balance</p>
            <p className="text-2xl font-bold text-white">₹{state.balance.toFixed(2)}</p>
          </div>
          <div className="bg-brand-black border border-slate-800 p-4 rounded-xl text-center shadow-lg">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Equity</p>
            <p className={`text-2xl font-bold ${state.equity >= state.balance ? 'text-green-400' : 'text-red-400'}`}>
              ₹{state.equity.toFixed(2)}
            </p>
          </div>
          <div className="bg-brand-black border border-slate-800 p-4 rounded-xl text-center shadow-lg">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Open Trades</p>
            <p className="text-2xl font-bold text-white">{state.openTrades.length}</p>
          </div>
          <div className="bg-brand-black border border-slate-800 p-4 rounded-xl text-center shadow-lg">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total P&L</p>
            <p className={`text-2xl font-bold ${state.balance - 10000 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{(state.balance - 10000).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center bg-brand-black border border-slate-800 p-4 rounded-xl shadow-lg">
              <div>
                <h3 className="font-bold text-white text-lg">{scenario.instrument}</h3>
                <p className="text-xs text-slate-400">{scenario.timeframe} • Simulated Market</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleNextCandle}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <select 
                  value={speed} 
                  onChange={e => setSpeed(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={5}>5x</option>
                </select>
                <button 
                  onClick={() => { setScenario(getRandomScenario()); setCurrentIndex(20); setIsPlaying(false); }}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
                  title="New Scenario"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Chart 
              data={visibleData} 
              openTrades={state.openTrades}
              orderConfig={showOrderPanel ? { entry: currentPrice, sl: orderConfig.sl, tp: orderConfig.tp } : null}
            />

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setShowOrderPanel('BUY'); setIsPlaying(false); }}
                className="py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-xl rounded-xl shadow-lg"
              >
                BUY
              </button>
              <button 
                onClick={() => { setShowOrderPanel('SELL'); setIsPlaying(false); }}
                className="py-4 bg-red-500 hover:bg-red-400 text-white font-bold text-xl rounded-xl shadow-lg"
              >
                SELL
              </button>
            </div>
          </div>

          {/* Side Panel: Order Config & Open Trades */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {showOrderPanel ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-brand-black border border-slate-800 p-6 rounded-2xl shadow-xl relative"
                >
                  <button onClick={() => setShowOrderPanel(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className={`text-xl font-bold mb-6 ${showOrderPanel === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                    New {showOrderPanel} Order
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Entry Price</label>
                      <div className="bg-slate-900 p-3 rounded-lg text-white font-mono">{currentPrice.toFixed(4)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Stop Loss</label>
                        <input 
                          type="number" 
                          step="0.0001"
                          value={orderConfig.sl || ''}
                          onChange={e => setOrderConfig({ ...orderConfig, sl: parseFloat(e.target.value) || null })}
                          className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg font-mono focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Take Profit</label>
                        <input 
                          type="number" 
                          step="0.0001"
                          value={orderConfig.tp || ''}
                          onChange={e => setOrderConfig({ ...orderConfig, tp: parseFloat(e.target.value) || null })}
                          className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg font-mono focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Risk (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={orderConfig.riskPercent}
                        onChange={e => setOrderConfig({ ...orderConfig, riskPercent: parseFloat(e.target.value) || 1 })}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg font-mono"
                      />
                      <p className="text-xs text-slate-500 mt-1">Planned Risk: ₹{((state.balance * orderConfig.riskPercent) / 100).toFixed(2)} virtual</p>
                    </div>

                    <button 
                      onClick={handlePlaceTrade}
                      className="w-full py-4 mt-4 bg-gradient-to-r from-gold-600 to-gold-500 text-brand-black font-bold rounded-xl"
                    >
                      PLACE SIMULATED TRADE
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-brand-black border border-slate-800 p-6 rounded-2xl shadow-xl h-full">
                  <h3 className="text-xl font-bold text-white mb-6">Open Trades</h3>
                  {state.openTrades.length === 0 ? (
                    <div className="text-center text-slate-500 py-12">
                      <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No open trades.</p>
                      <p className="text-sm">Wait for your setup and execute.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {state.openTrades.map(trade => {
                        const multiplier = trade.direction === 'BUY' ? 1 : -1;
                        const slDist = Math.abs(trade.entryPrice - (trade.sl || trade.entryPrice));
                        const priceDiff = (currentPrice - trade.entryPrice) * multiplier;
                        const currentPnl = slDist > 0 ? (priceDiff / slDist) * trade.riskAmount : priceDiff * trade.positionSize * 1000;
                        
                        return (
                          <div key={trade.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl relative">
                            <div className="flex justify-between items-start mb-2">
                              <span className={`font-bold ${trade.direction === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                                {trade.direction} {trade.instrument}
                              </span>
                              <span className={`font-mono font-bold ${currentPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {currentPnl >= 0 ? '+' : ''}₹{currentPnl.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 font-mono grid grid-cols-2 gap-2 mb-4">
                              <div>Entry: {trade.entryPrice.toFixed(4)}</div>
                              <div>Cur: {currentPrice.toFixed(4)}</div>
                              <div>SL: {trade.sl || 'None'}</div>
                              <div>TP: {trade.tp || 'None'}</div>
                            </div>
                            <button 
                              onClick={() => {
                                closeTrade(trade.id, currentPrice, 'Manual Close');
                                setShowReview(trade);
                              }}
                              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-colors"
                            >
                              CLOSE TRADE
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trade History */}
        <div className="mt-12 bg-brand-black border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h3 className="text-xl font-bold text-white mb-6">Trade History</h3>
          {state.tradeHistory.length === 0 ? (
            <p className="text-slate-500 text-center py-6">No closed trades yet.</p>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-widest text-xs">
                  <th className="pb-3 px-4">Instrument</th>
                  <th className="pb-3 px-4">Dir</th>
                  <th className="pb-3 px-4">Entry</th>
                  <th className="pb-3 px-4">Exit</th>
                  <th className="pb-3 px-4">Reason</th>
                  <th className="pb-3 px-4 text-right">P&L</th>
                </tr>
              </thead>
              <tbody>
                {state.tradeHistory.map((t, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                    <td className="py-3 px-4">{t.instrument}</td>
                    <td className={`py-3 px-4 font-bold ${t.direction === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>{t.direction}</td>
                    <td className="py-3 px-4 font-mono">{t.entryPrice.toFixed(4)}</td>
                    <td className="py-3 px-4 font-mono">{t.exitPrice?.toFixed(4)}</td>
                    <td className="py-3 px-4">{t.reason}</td>
                    <td className={`py-3 px-4 text-right font-mono font-bold ${(t.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(t.pnl || 0) >= 0 ? '+' : ''}₹{(t.pnl || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* Trade Review Modal */}
      <AnimatePresence>
        {showReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-dark border border-slate-700 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative my-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Trade Review</h3>
              <p className="text-slate-400 mb-6">Result ton zyada important process hai.</p>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 flex justify-between items-center">
                <div>
                  <div className="text-sm text-slate-500">P&L</div>
                  <div className={`text-2xl font-bold font-mono ${(showReview.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {(showReview.pnl || 0) >= 0 ? '+' : ''}₹{(showReview.pnl || 0).toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Reason</div>
                  <div className="font-bold text-white">{showReview.reason}</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-white mb-3">1. Entry ton pehla setup complete si?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">YES</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NO</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NOT SURE</button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-3">2. Confirmation mili si?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">YES</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NO</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NOT SURE</button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-3">3. Risk define kita si?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">YES</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NO</button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-3">4. Trade emotional si?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">YES</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NO</button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">NOT SURE</button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-lg font-bold text-gold-400 mb-2">Tusi profit/loss ton zyada important ki sikhya?</p>
                  <p className="text-sm text-slate-400 mb-4">Select all that apply:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Patience', 'Confirmation', 'Risk Management', 'Stop Loss Discipline', 'Psychology', 'Setup Selection'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-slate-300">
                        <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-gold-500 focus:ring-gold-500" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowReview(null);
                  addXP(20);
                }}
                className="w-full mt-8 py-4 bg-gold-500 hover:bg-gold-400 text-brand-black font-bold rounded-xl"
              >
                COMPLETE REVIEW & GET XP
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
