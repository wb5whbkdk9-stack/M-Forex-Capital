import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { TradingViewSection } from './components/TradingViewSection';", 
                          "import { TradingViewSection } from './components/TradingViewSection';\nimport { MarketBriefing } from './components/MarketBriefing';")

# Add component
content = content.replace("<TradingViewSection />", "<TradingViewSection />\n        <MarketBriefing />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
