import re

# Update App.tsx
with open('src/App.tsx', 'r') as f:
    app_content = f.read()

app_content = app_content.replace("import { MarketBriefing } from './components/MarketBriefing';\n", "")
app_content = app_content.replace("        <MarketBriefing />\n", "")

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

# Update server.ts
with open('server.ts', 'r') as f:
    server_content = f.read()

# Pattern to remove the market briefing route
pattern = r"\s*// API Route for Market Briefing \(Uses Google Search Tool\).*?// Vite middleware for development"
server_content = re.sub(pattern, "\n  // Vite middleware for development", server_content, flags=re.DOTALL)

with open('server.ts', 'w') as f:
    f.write(server_content)
