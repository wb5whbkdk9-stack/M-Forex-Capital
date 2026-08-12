import re

with open('src/components/TradingJournal.tsx', 'r') as f:
    content = f.read()

bad_divs = """                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                    <span className="text-sm text-slate-300 font-medium">Losses (-1R)</span>
                  </div>
                </div>
              </div>
            </div>
            </div>"""

good_divs = """                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                    <span className="text-sm text-slate-300 font-medium">Losses (-1R)</span>
                  </div>
                </div>
              </div>
            </div>"""

content = content.replace(bad_divs, good_divs)

with open('src/components/TradingJournal.tsx', 'w') as f:
    f.write(content)
