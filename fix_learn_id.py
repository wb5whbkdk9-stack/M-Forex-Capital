import re

with open('src/components/HomeSections.tsx', 'r') as f:
    content = f.read()

# For WhatYouWillLearn, find its section and add id="learn"
content = re.sub(r'(export function WhatYouWillLearn\(\) \{[\s\S]*?return \(\s*)<section className="py-24 bg-brand-black relative">', 
                 r'\1<section id="learn" className="py-24 bg-brand-black relative">', content)

with open('src/components/HomeSections.tsx', 'w') as f:
    f.write(content)

