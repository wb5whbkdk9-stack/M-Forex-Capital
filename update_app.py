import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Imports
content = content.replace("import { CommunityModal } from './components/CommunityModal';", 
                          "import { CommunityModal } from './components/CommunityModal';\nimport { LegalModal, LegalType } from './components/LegalModal';")

# State
content = content.replace('  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);',
                          '  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);\n  const [legalModalType, setLegalModalType] = useState<LegalType>(null);')

# Footer
content = content.replace('<Footer />', '<Footer onOpenLegal={(type) => setLegalModalType(type)} />')

# Modals
modal_str = """      <AnimatePresence>
        {isCommunityModalOpen && (
          <CommunityModal onClose={() => setIsCommunityModalOpen(false)} />
        )}
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
        )}
      </AnimatePresence>"""

content = re.sub(r'<AnimatePresence>[\s\S]*?</AnimatePresence>', modal_str, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
