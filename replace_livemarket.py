import os

with open('src/components/LiveMarket.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Disclaimer: Live market examples educational purpose layi ne. Guaranteed signals nahi.',
    'Live market examples educational purpose layi ne.'
)

with open('src/components/LiveMarket.tsx', 'w') as f:
    f.write(content)
