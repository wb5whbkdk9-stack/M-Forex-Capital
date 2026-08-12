import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Send } from 'lucide-react';
import { useTradingLabState } from '../../hooks/useTradingLabState';

interface LeaderboardEntry {
  name: string;
  xp: number;
  timestamp: string;
}

export function GlobalRankings() {
  const { state } = useTradingLabState();
  const [rankings, setRankings] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fetchRankings = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        setRankings(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), xp: state.xp })
      });
      if (res.ok) {
        const data = await res.json();
        setRankings(data);
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-gold-500/10 rounded-full mb-4">
          <Trophy className="w-10 h-10 text-gold-500" />
        </div>
        <h3 className="text-3xl font-display font-bold text-white mb-3">Global Rankings</h3>
        <p className="text-slate-400">Compete with traders worldwide. Only the most disciplined rise to the top.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-brand-black border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-24">
            <h4 className="text-xl font-bold text-white mb-6">Your Stats</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Star className="w-8 h-8 text-gold-500" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-white">{state.xp}</p>
                <p className="text-xs uppercase tracking-widest text-gold-500 font-bold">Total XP</p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Join Leaderboard</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your trader name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    maxLength={20}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-brand-black font-bold rounded-xl hover:from-gold-500 hover:to-gold-400 transition-all"
                >
                  <Send className="w-4 h-4" /> Submit Score
                </button>
              </form>
            ) : (
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-bold mb-1">Score Submitted!</p>
                <p className="text-sm text-slate-400">Keep learning to increase your rank.</p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2 md:p-4 shadow-xl">
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading rankings...</div>
            ) : rankings.length === 0 ? (
              <div className="p-12 text-center">
                <Medal className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No traders on the board yet.</p>
                <p className="text-sm text-slate-500">Be the first to submit your score!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {rankings.map((entry, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      i === 0 ? 'bg-gold-500/10 border border-gold-500/30' : 
                      i === 1 ? 'bg-slate-300/10 border border-slate-300/20' :
                      i === 2 ? 'bg-amber-700/10 border border-amber-700/30' :
                      'bg-brand-black border border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 text-center font-display font-bold ${
                        i === 0 ? 'text-gold-500 text-2xl' : 
                        i === 1 ? 'text-slate-300 text-xl' :
                        i === 2 ? 'text-amber-600 text-xl' :
                        'text-slate-600 text-lg'
                      }`}>
                        #{i + 1}
                      </div>
                      <div className="font-medium text-white">{entry.name}</div>
                    </div>
                    <div className="font-bold text-gold-400">
                      {entry.xp} <span className="text-xs text-slate-500">XP</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
