import re

with open('src/components/TradingJournal.tsx', 'r') as f:
    content = f.read()

old_state = """  const [trades, setTrades] = useState<Trade[]>([
    { id: 7, date: '2024-03-16', pair: 'GBP/JPY', setup: 'Breakout', result: 'loss', notes: 'Fakeout, got stopped out early.' },
    { id: 6, date: '2024-03-15', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Good patience waiting for confirmation.' },
    { id: 5, date: '2024-03-14', pair: 'XAU/USD', setup: 'Trendline', result: 'win', notes: 'Hit TP perfectly on news.' },
    { id: 4, date: '2024-03-12', pair: 'GBP/USD', setup: 'Engulfing', result: 'loss', notes: 'Early entry, should have waited for close.' },
    { id: 3, date: '2024-03-11', pair: 'EUR/USD', setup: 'Order Block', result: 'win', notes: 'Clean setup, no drawdown.' },
    { id: 2, date: '2024-03-10', pair: 'USD/JPY', setup: 'Resistance Reject', result: 'loss', notes: 'News impact spiked me out.' },
    { id: 1, date: '2024-03-09', pair: 'EUR/USD', setup: 'Support Bounce', result: 'win', notes: 'Waited for candle close. Good entry.' },
  ]);"""

new_state = """  const [trades, setTrades] = useState<Trade[]>([
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

content = content.replace(old_state, new_state)

with open('src/components/TradingJournal.tsx', 'w') as f:
    f.write(content)
