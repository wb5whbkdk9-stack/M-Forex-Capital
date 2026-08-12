import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Let's just modify the main buttons
new_buttons = """
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a 
              href="#trading-lab" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              ENTER TRADING LAB <ArrowRight className="w-5 h-5" />
            </a>
            <button 
              onClick={onOpenCommunity}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-700 hover:border-gold-500 text-white font-bold rounded-xl transition-all hover:bg-slate-800"
            >
              JOIN COMMUNITY
            </button>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Practice trading concepts without using real money.
          </p>
"""

# Replace the existing buttons section
content = re.sub(r'<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">.*?JOIN COMMUNITY\s*</button>\s*</div>', new_buttons, content, flags=re.DOTALL)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
