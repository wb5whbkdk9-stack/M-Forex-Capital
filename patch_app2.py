import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { TradingViewSection } from './components/TradingViewSection';", 
                          "import { TradingViewSection } from './components/TradingViewSection';\nimport { TradingLab } from './components/TradingLab/TradingLab';")

content = content.replace("<TradingViewSection />\n                <AILearningPreview />", 
                          "<TradingViewSection />\n        <TradingLab />\n                <AILearningPreview />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
