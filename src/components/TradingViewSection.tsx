import { ArrowRight, LineChart } from 'lucide-react';

export function TradingViewSection() {
  return (
    <section id="charts" className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-gold-400 mb-4">
              <LineChart className="w-6 h-6" />
              <span className="font-bold tracking-widest text-sm uppercase">Live Analysis</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">Track Market Charts Here</h2>
            <p className="text-slate-400 text-lg">
              Real-time live markets de chart analyze karo. Aapne setups te strategies nu live market vich test karo te apni trading skills improve karo.
            </p>
          </div>
          <a
            href="https://www.tradingview.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] group transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Open TradingView <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-slate-700/50 bg-brand-black relative shadow-2xl">
           <iframe 
             src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=FX%3AEURUSD&interval=H&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en" 
             style={{ width: '100%', height: '100%' }} 
             frameBorder="0" 
             scrolling="no" 
             allowFullScreen={true}
             title="TradingView Chart"
           ></iframe>
        </div>
      </div>
    </section>
  );
}
