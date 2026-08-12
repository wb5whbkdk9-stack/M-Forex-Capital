import os

with open('src/components/RiskCalculator.tsx', 'r') as f:
    content = f.read()

# I will replace `<section className="` with `<section id="calculator" className="`
content = content.replace('<section className="', '<section id="calculator" className="', 1)

with open('src/components/RiskCalculator.tsx', 'w') as f:
    f.write(content)
