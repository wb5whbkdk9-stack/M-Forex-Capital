import os
import re

# 1. Update App.tsx
with open('src/App.tsx', 'r') as f:
    app_content = f.read()

app_content = re.sub(r"import \{ ResourceLibrary \} from '\./components/ResourceLibrary';\n?", "", app_content)
app_content = re.sub(r"<ResourceLibrary[^>]*/>\n?", "", app_content)

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

# 2. Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

nav_content = re.sub(r"\s*\{\s*name:\s*'Resources',\s*href:\s*'#resources'\s*\},", "", nav_content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)

# 3. Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

footer_content = re.sub(r"\s*<li><a href=\"#resources\" className=\"hover:text-gold-400 transition-colors\">Resources</a></li>", "", footer_content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(footer_content)

# 4. Update Hero.tsx
with open('src/components/Hero.tsx', 'r') as f:
    hero_content = f.read()

hero_content = hero_content.replace('href="#resources"', 'href="#learn"')
hero_content = hero_content.replace('EXPLORE FREE RESOURCES', 'START LEARNING')

with open('src/components/Hero.tsx', 'w') as f:
    f.write(hero_content)

# 5. Update HomeSections.tsx
with open('src/components/HomeSections.tsx', 'r') as f:
    home_content = f.read()

home_content = re.sub(r"<a href=\"#resources\" className=\"text-sm font-bold text-gold-500 hover:text-gold-400 flex items-center gap-1 uppercase tracking-wider\">\s*Learn More <ArrowRight className=\"w-4 h-4\" />\s*</a>", "", home_content)
home_content = home_content.replace('href="#resources"', 'href="#learn"')
home_content = home_content.replace('{ title: "Learning Resources", desc: "Practical PDFs te guides.", icon: <BookOpen /> }', '{ title: "Interactive Learning", desc: "Live chart examples te tests.", icon: <BookOpen /> }')

with open('src/components/HomeSections.tsx', 'w') as f:
    f.write(home_content)

