import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { LiveMarket } from './components/LiveMarket';", 
                          "import { LiveMarket } from './components/LiveMarket';\nimport { TradingViewSection } from './components/TradingViewSection';")

# Add component
content = content.replace("<LiveMarket />", "<LiveMarket />\n        <TradingViewSection />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
