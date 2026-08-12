import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Save, Target, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    { id: 10, date: '2024-04-05', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Clean setup, hit TP1.' },
    { id: 9, date: '2024-04-02', pair: 'GBP/JPY', setup: 'Breakout', result: 'loss', notes: 'Fakeout, got stopped out early.' },
    { id: 8, date: '2024-03-28', pair: 'XAU/USD', setup: 'Trendline', result: 'win', notes: 'Hit TP perfectly on news.' },
    { id: 7, date: '2024-03-16', pair: 'GBP/JPY', setup: 'Breakout', result: 'loss', notes: 'Fakeout, got stopped out early.' },
    { id: 6, date: '2024-03-15', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Good patience waiting for confirmation.' },
    { id: 5, date: '2024-03-14', pair: 'XAU/USD', setup: 'Trendline', result: 'win', notes: 'Hit TP perfectly on news.' },
    { id: 4, date: '2024-03-12', pair: 'GBP/USD', setup: 'Engulfing', result: 'loss', notes: 'Early entry, should have waited for close.' },
    { id: 3, date: '2024-03-11', pair: 'EUR/USD', setup: 'Order Block', result: 'win', notes: 'Clean setup, no drawdown.' },
    { id: 2, date: '2024-03-10', pair: 'USD/JPY', setup: 'Resistance Reject', result: 'loss', notes: 'News impact spiked me out.' },
    { id: 1, date: '2024-02-28', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Waited for candle close. Good entry.' },
  ]);

  const [dateFilter, setDateFilter] = useState('all');
  


  const filteredTrades = useMemo(() => {
    if (dateFilter === 'all') return trades;
    
    const now = new Date('2024-04-10'); // Mocking current date for sample data consistency
    const filterDate = new Date('2024-04-10');
    
    if (dateFilter === '7days') {
      filterDate.setDate(now.getDate() - 7);
    } else if (dateFilter === '30days') {
      filterDate.setDate(now.getDate() - 30);
    } else if (dateFilter === 'march') {
      return trades.filter(t => t.date.startsWith('2024-03'));
    } else if (dateFilter === 'february') {
      return trades.filter(t => t.date.startsWith('2024-02'));
    }

    return trades.filter(t => new Date(t.date) >= filterDate);
  }, [trades, dateFilter]);

  const chartData = useMemo(() => {
    const sorted = [...filteredTrades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let cumulative = 0;
    return sorted.map(t => {
      cumulative += t.result === 'win' ? 2 : -1; // Assuming 1:2 average RR
      return {
        date: t.date,
        performance: cumulative
      };
    });
  }, [filteredTrades]);


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


          <div className="mb-12 glass-card p-6 md:p-8 rounded-3xl border border-slate-800">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xl text-white tracking-wide">Performance Trends</h3>
                <p className="text-sm text-slate-400">Cumulative performance assuming average 1:2 Risk-Reward ratio.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2 bg-brand-black/50 border border-slate-700/50 rounded-lg px-3 py-1.5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <select 
                    className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="march">March 2024</option>
                    <option value="february">February 2024</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                    <span className="text-sm text-slate-300 font-medium">Wins (+2R)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                    <span className="text-sm text-slate-300 font-medium">Losses (-1R)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-72 w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dateFilter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}R`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#eab308', fontWeight: 'bold' }}
                    formatter={(val: number) => [`${val > 0 ? '+' : ''}${val}R`, 'Net Performance']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#eab308" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPerf)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (              <motion.div
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
            {filteredTrades.map((trade) => (
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
