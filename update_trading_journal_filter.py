import re

with open('src/components/TradingJournal.tsx', 'r') as f:
    content = f.read()

imports = """import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Save, Target, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';"""

content = re.sub(r"import \{ useState, useMemo \} from 'react';[\s\S]*?import \{[^}]+\} from 'recharts';", imports, content)

sample_trades = """  const [trades, setTrades] = useState<Trade[]>([
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

  const [dateFilter, setDateFilter] = useState('all');"""

content = re.sub(r"  const \[trades, setTrades\] = useState<Trade\[\]>\(\[[\s\S]*?\}\s*\]\);", sample_trades, content)


filter_logic = """
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
"""

content = re.sub(r"  const chartData = useMemo\(\(\) => \{[\s\S]*?\}, \[trades\]\);", filter_logic, content)


chart_header = """            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            </div>"""

content = re.sub(r'            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">[\s\S]*?</div>\s*</div>', chart_header, content)

# update map
content = content.replace('{trades.map((trade) => (', '{filteredTrades.map((trade) => (')


with open('src/components/TradingJournal.tsx', 'w') as f:
    f.write(content)
