import re

with open('src/components/TradingJournal.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Save, Target, CheckCircle2, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';"""

content = re.sub(r"import \{ useState \} from 'react';[\s\S]*?import \{[^}]+\} from 'lucide-react';", imports, content)

# Add sample data
sample_trades = """  const [trades, setTrades] = useState<Trade[]>([
    { id: 7, date: '2024-03-16', pair: 'GBP/JPY', setup: 'Breakout', result: 'loss', notes: 'Fakeout, got stopped out early.' },
    { id: 6, date: '2024-03-15', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Good patience waiting for confirmation.' },
    { id: 5, date: '2024-03-14', pair: 'XAU/USD', setup: 'Trendline', result: 'win', notes: 'Hit TP perfectly on news.' },
    { id: 4, date: '2024-03-12', pair: 'GBP/USD', setup: 'Engulfing', result: 'loss', notes: 'Early entry, should have waited for close.' },
    { id: 3, date: '2024-03-11', pair: 'EUR/USD', setup: 'Order Block', result: 'win', notes: 'Clean setup, no drawdown.' },
    { id: 2, date: '2024-03-10', pair: 'USD/JPY', setup: 'Resistance Reject', result: 'loss', notes: 'News impact spiked me out.' },
    { id: 1, date: '2024-03-09', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Waited for candle close. Good entry.' },
  ]);"""

content = re.sub(r"  const \[trades, setTrades\] = useState<Trade\[\]>\(\[\s*\{\s*id: 1,[\s\S]*?\}\s*\]\);", sample_trades, content)

# Add useMemo for chart data
chart_data = """
  const chartData = useMemo(() => {
    const sorted = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let cumulative = 0;
    return sorted.map(t => {
      cumulative += t.result === 'win' ? 2 : -1; // Assuming 1:2 average RR
      return {
        date: t.date,
        performance: cumulative
      };
    });
  }, [trades]);

  const [isAdding"""

content = content.replace("  const [isAdding", chart_data)

# Add chart UI
chart_ui = """          <AnimatePresence>
            {isAdding && (
"""

chart_markup = """
          <div className="mb-12 glass-card p-6 md:p-8 rounded-3xl border border-slate-800">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xl text-white tracking-wide">Performance Trends</h3>
                <p className="text-sm text-slate-400">Cumulative performance assuming average 1:2 Risk-Reward ratio.</p>
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
            
            <div className="h-72 w-full">
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
            </div>
          </div>

          <AnimatePresence>
            {isAdding && ("""

content = content.replace(chart_ui, chart_markup)

with open('src/components/TradingJournal.tsx', 'w') as f:
    f.write(content)

