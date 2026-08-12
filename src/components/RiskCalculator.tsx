import { useState } from 'react';
import { Calculator } from 'lucide-react';

export function RiskCalculator() {
  const [balance, setBalance] = useState<number | string>(1000);
  const [riskPercent, setRiskPercent] = useState<number | string>(1);
  const [entry, setEntry] = useState<number | string>('');
  const [stopLoss, setStopLoss] = useState<number | string>('');
  const [target, setTarget] = useState<number | string>('');

  const riskAmount = (Number(balance) * Number(riskPercent)) / 100;
  
  let rewardAmount = 0;
  let rrRatio = 0;

  if (entry && stopLoss && target) {
    const riskDistance = Math.abs(Number(entry) - Number(stopLoss));
    const rewardDistance = Math.abs(Number(target) - Number(entry));
    
    if (riskDistance > 0) {
      rrRatio = rewardDistance / riskDistance;
      rewardAmount = riskAmount * rrRatio;
    }
  }

  return (
    <section id="calculator" className="py-24 bg-brand-black border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-brand-card rounded-full mb-6 border border-slate-700/50">
            <Calculator className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Educational Risk Calculator</h2>
          <p className="text-lg text-slate-400">Position size te risk manage karna sikho.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-card rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Inputs */}
          <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-slate-700/50 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Account Balance ($)</label>
                <input 
                  type="number" 
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Risk (%)</label>
                <input 
                  type="number" 
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-700/50">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Entry Price</label>
                <input 
                  type="number" 
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="e.g. 1.1000"
                  className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Stop Loss</label>
                <input 
                  type="number" 
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="e.g. 1.0950"
                  className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Target (Take Profit)</label>
                <input 
                  type="number" 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="e.g. 1.1100"
                  className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 p-8 bg-brand-dark/50 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-8">Calculated Risk</h3>
            
            <div className="space-y-6">
              <div className="bg-brand-card p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Risk Amount</span>
                <span className="text-2xl font-bold text-brand-red">${riskAmount.toFixed(2)}</span>
              </div>
              
              <div className="bg-brand-card p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Potential Reward</span>
                <span className="text-2xl font-bold text-brand-green">${rewardAmount.toFixed(2)}</span>
              </div>
              
              <div className="bg-brand-card p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Risk/Reward Ratio</span>
                <span className="text-2xl font-bold text-gold-400">1 : {rrRatio ? rrRatio.toFixed(2) : '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <p className="text-xs text-brand-red/80 uppercase tracking-widest font-medium">
            Warning: Eh calculator educational purpose layi hai. Actual spread, slippage, leverage, instrument specifications te trading costs results nu affect kar sakde ne.
          </p>
        </div>
      </div>
    </section>
  );
}
