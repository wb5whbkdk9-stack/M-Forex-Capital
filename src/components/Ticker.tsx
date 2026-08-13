import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

const tickerItems = [
  { text: "M FOREX CAPITAL", highlight: true, accent: false, dot: true },
  { text: "Trading Nu Easy Punjabi Ch Samjho", highlight: false, accent: false, dot: false },
  { text: "TRADING LAB", highlight: true, accent: false, dot: true, href: "#trading-lab" },
  { text: "Interactive Trading Practice", highlight: false, accent: false, dot: false },
  { text: "TRADING SIMULATOR", highlight: true, accent: false, dot: true, href: "#simulator" },
  { text: "Virtual Educational Account", highlight: false, accent: false, dot: false },
  { text: "CANDLESTICK MASTER GUIDE", highlight: false, accent: true, dot: true, action: "candlestick" },
  { text: "Learn Price Action Basics", highlight: false, accent: false, dot: false },
  { text: "TRADING PSYCHOLOGY", highlight: false, accent: true, dot: true, action: "psychology" },
  { text: "Build Better Trading Discipline", highlight: false, accent: false, dot: false },
  { text: "TRADING PLAYBOOK", highlight: false, accent: true, dot: true, action: "playbook" },
  { text: "Structure • Confirmation • Risk", highlight: false, accent: false, dot: false },
  { text: "COMMUNITY", highlight: true, accent: false, dot: true, href: "#community" },
  { text: "Learn With M Forex Capital", highlight: false, accent: false, dot: false },
  { text: "@m.forex.capital", highlight: true, accent: false, dot: true, href: "https://instagram.com/m.forex.capital" },
  { text: "Follow For Trading Education", highlight: false, accent: false, dot: false }
];

export function Ticker({ onOpenGuide }: { onOpenGuide?: (type: string) => void }) {
  return (
    <div className="w-full bg-[#050810] border-b border-gold-500/20 overflow-hidden flex items-center relative z-50 h-[38px] md:h-[42px] shrink-0">
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #050810 0%, transparent 2%, transparent 98%, #050810 100%)' }} />
      
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused] lg:hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center whitespace-nowrap">
            {tickerItems.map((item, j) => {
              const content = (
                <div className="flex items-center gap-3 mx-4">
                  {item.dot && <div className="w-1.5 h-1.5 rotate-45 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
                  <span className={`text-xs md:text-sm font-semibold tracking-wider flex items-center gap-1.5 ${
                    item.highlight ? 'text-gold-400' : item.accent ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    {item.text}
                    {item.href && <ExternalLink className="w-3 h-3 opacity-50" />}
                    {item.action && <BookOpen className="w-3 h-3 opacity-50" />}
                  </span>
                </div>
              );

              if (item.action) {
                return (
                  <button 
                    key={j} 
                    onClick={() => onOpenGuide?.(item.action)}
                    className="hover:bg-gold-500/10 px-2 py-1 rounded-md transition-colors cursor-pointer group"
                  >
                    {content}
                  </button>
                );
              }

              return item.href ? (
                <a 
                  key={j} 
                  href={item.href}
                  className="hover:bg-gold-500/10 px-2 py-1 rounded-md transition-colors cursor-pointer group"
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={j} className="px-2 py-1">
                  {content}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
