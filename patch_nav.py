import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

nav_link = '            <a href="#trading-lab" className="text-sm font-bold tracking-widest hover:text-gold-400 transition-colors">TRADING LAB</a>'

content = content.replace('<a href="#learn" className="text-sm font-bold tracking-widest hover:text-gold-400 transition-colors">LEARN</a>', 
                          '<a href="#learn" className="text-sm font-bold tracking-widest hover:text-gold-400 transition-colors">LEARN</a>\n' + nav_link)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
