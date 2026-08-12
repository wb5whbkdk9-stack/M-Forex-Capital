import React, { useMemo } from 'react';
import { Candle, Trade } from '../../hooks/useSimulatorState';

interface ChartProps {
  data: Candle[];
  openTrades: Trade[];
  orderConfig?: {
    entry: number;
    sl: number | null;
    tp: number | null;
  } | null;
}

export function Chart({ data, openTrades, orderConfig }: ChartProps) {
  const width = 800;
  const height = 400;
  const padding = { top: 20, right: 60, bottom: 30, left: 20 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    
    data.forEach(c => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    });

    if (orderConfig) {
      if (orderConfig.sl !== null) {
        if (orderConfig.sl < min) min = orderConfig.sl;
        if (orderConfig.sl > max) max = orderConfig.sl;
      }
      if (orderConfig.tp !== null) {
        if (orderConfig.tp < min) min = orderConfig.tp;
        if (orderConfig.tp > max) max = orderConfig.tp;
      }
    }

    openTrades.forEach(t => {
      if (t.entryPrice < min) min = t.entryPrice;
      if (t.entryPrice > max) max = t.entryPrice;
      if (t.sl && t.sl < min) min = t.sl;
      if (t.sl && t.sl > max) max = t.sl;
      if (t.tp && t.tp < min) min = t.tp;
      if (t.tp && t.tp > max) max = t.tp;
    });

    // Add some padding to price
    const range = max - min;
    const p = range * 0.1;
    return {
      minPrice: min - p,
      maxPrice: max + p,
      priceRange: (max + p) - (min - p)
    };
  }, [data, orderConfig, openTrades]);

  const priceToY = (p: number) => {
    if (priceRange === 0) return padding.top + innerHeight / 2;
    return padding.top + innerHeight - ((p - minPrice) / priceRange) * innerHeight;
  };

  const candleWidth = Math.max(2, (innerWidth / Math.max(data.length, 20)) * 0.8);
  const candleSpacing = innerWidth / Math.max(data.length, 20);

  const formatPrice = (p: number) => {
    return p >= 1000 ? p.toFixed(1) : p.toFixed(4);
  };

  // Y-axis grid lines
  const gridLines = [];
  if (priceRange > 0) {
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const p = minPrice + (priceRange * i) / steps;
      gridLines.push(p);
    }
  }

  return (
    <div className="w-full overflow-hidden bg-brand-black border border-slate-800 rounded-xl relative" style={{ aspectRatio: '2/1' }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full text-xs font-mono">
        {/* Grid and Y-axis */}
        {gridLines.map((p, i) => {
          const y = priceToY(p);
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1e293b" strokeDasharray="4 4" />
              <text x={width - padding.right + 5} y={y + 4} fill="#64748b">{formatPrice(p)}</text>
            </g>
          );
        })}

        {/* Candles */}
        {data.map((c, i) => {
          const x = padding.left + i * candleSpacing + candleSpacing / 2;
          const openY = priceToY(c.open);
          const closeY = priceToY(c.close);
          const highY = priceToY(c.high);
          const lowY = priceToY(c.low);
          
          const isBull = c.close >= c.open;
          const color = isBull ? '#22c55e' : '#ef4444'; // green : red

          return (
            <g key={i}>
              {/* Wick */}
              <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth={1} />
              {/* Body */}
              <rect 
                x={x - candleWidth / 2} 
                y={Math.min(openY, closeY)} 
                width={candleWidth} 
                height={Math.max(1, Math.abs(closeY - openY))} 
                fill={color} 
              />
            </g>
          );
        })}

        {/* Current Price Line */}
        {data.length > 0 && (
          <g>
            <line 
              x1={padding.left} 
              y1={priceToY(data[data.length-1].close)} 
              x2={width - padding.right} 
              y2={priceToY(data[data.length-1].close)} 
              stroke="#64748b" 
              strokeDasharray="2 2" 
            />
            <rect 
              x={width - padding.right} 
              y={priceToY(data[data.length-1].close) - 10} 
              width={60} 
              height={20} 
              fill="#334155" 
            />
            <text 
              x={width - padding.right + 5} 
              y={priceToY(data[data.length-1].close) + 4} 
              fill="white"
            >
              {formatPrice(data[data.length-1].close)}
            </text>
          </g>
        )}

        {/* Open Trades Visuals */}
        {openTrades.map((t, i) => (
          <g key={i}>
            <line x1={padding.left} y1={priceToY(t.entryPrice)} x2={width - padding.right} y2={priceToY(t.entryPrice)} stroke="#eab308" strokeWidth={1} />
            <text x={padding.left + 5} y={priceToY(t.entryPrice) - 5} fill="#eab308">ENTRY {t.direction}</text>
            
            {t.sl && (
              <>
                <line x1={padding.left} y1={priceToY(t.sl)} x2={width - padding.right} y2={priceToY(t.sl)} stroke="#ef4444" strokeWidth={1} strokeDasharray="4 2" />
                <text x={padding.left + 5} y={priceToY(t.sl) - 5} fill="#ef4444">SL</text>
              </>
            )}
            
            {t.tp && (
              <>
                <line x1={padding.left} y1={priceToY(t.tp)} x2={width - padding.right} y2={priceToY(t.tp)} stroke="#22c55e" strokeWidth={1} strokeDasharray="4 2" />
                <text x={padding.left + 5} y={priceToY(t.tp) - 5} fill="#22c55e">TP</text>
              </>
            )}
          </g>
        ))}

        {/* Planning Order Visuals */}
        {orderConfig && (
          <g>
            <line x1={padding.left} y1={priceToY(orderConfig.entry)} x2={width - padding.right} y2={priceToY(orderConfig.entry)} stroke="#eab308" strokeWidth={1} strokeDasharray="2 2" />
            <text x={padding.left + 5} y={priceToY(orderConfig.entry) - 5} fill="#eab308">PLAN ENTRY</text>
            
            {orderConfig.sl !== null && (
              <>
                <line x1={padding.left} y1={priceToY(orderConfig.sl)} x2={width - padding.right} y2={priceToY(orderConfig.sl)} stroke="#ef4444" strokeWidth={1} strokeDasharray="2 2" />
                <text x={padding.left + 5} y={priceToY(orderConfig.sl) - 5} fill="#ef4444">PLAN SL</text>
              </>
            )}
            
            {orderConfig.tp !== null && (
              <>
                <line x1={padding.left} y1={priceToY(orderConfig.tp)} x2={width - padding.right} y2={priceToY(orderConfig.tp)} stroke="#22c55e" strokeWidth={1} strokeDasharray="2 2" />
                <text x={padding.left + 5} y={priceToY(orderConfig.tp) - 5} fill="#22c55e">PLAN TP</text>
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
