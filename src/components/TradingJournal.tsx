import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Save, Target, CheckCircle2, XCircle } from 'lucide-react';

interface Trade {
  id: number;
  date: string;
  pair: string;
  setup: string;
  result: 'win' | 'loss';
  notes: string;
}

export function TradingJournal() {
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: 1,
      date: '2024-03-10',
      pair: 'EUR/USD',
      setup: 'Support Bounce + Engulfing',
      result: 'win',
      notes: 'Waited for candle close. Good entry.'
    }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({ result: 'win' });

  const handleSave = () => {
    if (newTrade.pair && newTrade.setup) {
      setTrades([
        { 
          id: Date.now(), 
          date: new Date().toISOString().split('T')[0],
          pair: newTrade.pair,
          setup: newTrade.setup,
          result: newTrade.result as 'win' | 'loss',
          notes: newTrade.notes || ''
        },
        ...trades
      ]);
      setIsAdding(false);
      setNewTrade({ result: 'win' });
    }
  };

  return (
    <section className="py-24 bg-brand-black border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-gold-400 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="font-bold tracking-widest text-sm uppercase">Track & Improve</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Trading Journal</h2>
              <p className="text-slate-400 text-lg">
                Vadde traders hamesha apni trades likhde ne. Aadat pao.
              </p>
            </div>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="px-6 py-3 bg-brand-card hover:bg-slate-800/30 border border-slate-700/50 hover:border-gold-500/50 text-white font-bold rounded-xl flex items-center gap-2 transition-all"
            >
              {isAdding ? <XCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isAdding ? 'Cancel' : 'New Trade'}
            </button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-xl mb-4 text-white">Add New Trade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Pair (e.g., GBP/USD)" 
                      className="bg-brand-black/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50"
                      value={newTrade.pair || ''}
                      onChange={e => setNewTrade({...newTrade, pair: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Setup Reason" 
                      className="bg-brand-black/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50"
                      value={newTrade.setup || ''}
                      onChange={e => setNewTrade({...newTrade, setup: e.target.value})}
                    />
                    <select 
                      className="bg-brand-black/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50"
                      value={newTrade.result}
                      onChange={e => setNewTrade({...newTrade, result: e.target.value as 'win'|'loss'})}
                    >
                      <option value="win">Win</option>
                      <option value="loss">Loss</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Notes / Mistakes" 
                      className="bg-brand-black/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50"
                      value={newTrade.notes || ''}
                      onChange={e => setNewTrade({...newTrade, notes: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    className="w-full py-3 bg-gold-600/20 text-gold-400 font-bold rounded-xl border border-gold-500/30 hover:bg-gold-600/30 transition-colors flex justify-center items-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Save Entry
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {trades.map((trade) => (
              <motion.div 
                key={trade.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 sm:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${trade.result === 'win' ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-red/20 text-brand-red'}`}>
                    {trade.result === 'win' ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-white text-lg">{trade.pair}</span>
                      <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-800/50 rounded-lg">{trade.date}</span>
                    </div>
                    <p className="text-sm text-slate-400">{trade.setup}</p>
                  </div>
                </div>
                <div className="md:text-right w-full md:w-auto bg-brand-black/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Notes</span>
                  <p className="text-sm text-slate-300 italic">"{trade.notes}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
