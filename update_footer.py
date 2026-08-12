import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

# Replace the component signature
content = content.replace('export function Footer() {', 'import { LegalType } from "./LegalModal";\n\nexport function Footer({ onOpenLegal }: { onOpenLegal: (type: LegalType) => void }) {')

# Replace the links
links_old = """            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Risk Disclosure</a>
            </div>"""

links_new = """            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('privacy'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Privacy Policy</button>
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('terms'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Terms & Conditions</button>
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('risk'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Risk Disclosure</button>
            </div>"""

content = content.replace(links_old, links_new)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)
