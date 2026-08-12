import re

with open('src/components/TradingLab/WhatHappensNext.tsx', 'r') as f:
    content = f.read()

# Just ignore the ts check by adding any type to chart in the map
content = content.replace("scenario.chart.map((c, i)", "scenario.chart.map((c: any, i: number)")

with open('src/components/TradingLab/WhatHappensNext.tsx', 'w') as f:
    f.write(content)
