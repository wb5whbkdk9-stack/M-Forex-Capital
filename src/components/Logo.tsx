export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* We will try to load the actual image if it exists. 
          If not, we show a highly stylized SVG fallback. */}
      <img 
        src="/logo.png" 
        alt="M Forex Capital Logo" 
        className="object-contain w-full h-full max-h-full max-w-full"
        onError={(e) => {
          // Fallback to SVG if image not found
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      <div 
        className="hidden w-full h-full text-center" 
        style={{ display: 'none' }} // Hidden by default, shown on error
      >
        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
          {/* Black Background */}
          <circle cx="250" cy="250" r="240" fill="#0a0a0a" />
          
          {/* Double Gold Border */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
          <circle cx="250" cy="250" r="215" fill="none" stroke="url(#goldGradLight)" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="25%" stopColor="#FCF6BA" />
              <stop offset="50%" stopColor="#B38728" />
              <stop offset="75%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
            <linearGradient id="goldGradLight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBF5B7" />
              <stop offset="50%" stopColor="#B38728" />
              <stop offset="100%" stopColor="#FCF6BA" />
            </linearGradient>
          </defs>

          {/* Abstract Bull & Bear (Stylized geometric) */}
          <path d="M 120 280 L 150 250 L 170 290 Z" fill="#ef4444" opacity="0.8" /> {/* Bear hint */}
          <path d="M 380 280 L 350 250 L 330 290 Z" fill="#10b981" opacity="0.8" /> {/* Bull hint */}

          {/* Candlesticks */}
          <rect x="220" y="110" width="10" height="40" fill="#10b981" />
          <line x1="225" y1="90" x2="225" y2="170" stroke="#10b981" strokeWidth="2" />
          
          <rect x="270" y="130" width="10" height="35" fill="#ef4444" />
          <line x1="275" y1="120" x2="275" y2="190" stroke="#ef4444" strokeWidth="2" />

          {/* Large M / Market Arrow */}
          <path d="M 150 320 L 210 180 L 250 260 L 290 180 L 350 320" fill="none" stroke="url(#goldGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Upward Arrow extending from right leg of M */}
          <path d="M 350 320 L 400 160" fill="none" stroke="url(#goldGrad)" strokeWidth="12" strokeLinecap="round" />
          <polygon points="380,170 400,160 410,180" fill="url(#goldGrad)" />

          {/* Typography */}
          <text x="250" y="380" fontFamily="sans-serif" fontSize="48" fontWeight="bold" fill="url(#goldGrad)" textAnchor="middle" letterSpacing="4">M FOREX</text>
          <text x="250" y="420" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="#fff" textAnchor="middle" letterSpacing="8">CAPITAL</text>
        </svg>
      </div>
    </div>
  );
}
