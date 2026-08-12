import re

# Fix HomeSections.tsx
with open('src/components/HomeSections.tsx', 'r') as f:
    content = f.read()

content = content.replace('export function WhatYouWillLearn() {\n  return (\n    <section className="py-24', 'export function WhatYouWillLearn() {\n  return (\n    <section id="learn" className="py-24')
content = content.replace('export function LearningMethod() {\n  const steps', 'export function LearningMethod() {\n  const steps')
content = content.replace('export function LearningMethod() {\n', 'export function LearningMethod() {\n')
content = content.replace('<section className="py-24 bg-brand-dark border-y border-slate-800">', '<section id="roadmap" className="py-24 bg-brand-dark border-y border-slate-800">', 1)
content = content.replace('export function WhyMForex() {\n', 'export function WhyMForex() {\n')
content = content.replace('<section className="py-24 bg-brand-dark border-y border-slate-800">', '<section id="about" className="py-24 bg-brand-dark border-y border-slate-800">', 1)
content = content.replace('export function CommunityCTA({ onOpenCommunity }: { onOpenCommunity: () => void }) {\n  return (\n    <section className="py-24', 'export function CommunityCTA({ onOpenCommunity }: { onOpenCommunity: () => void }) {\n  return (\n    <section id="community" className="py-24')

with open('src/components/HomeSections.tsx', 'w') as f:
    f.write(content)

# Fix CommunityModal.tsx
with open('src/components/CommunityModal.tsx', 'r') as f:
    modal = f.read()

modal = modal.replace('className="relative w-full max-w-2xl overflow-hidden rounded-3xl', 'className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl')

with open('src/components/CommunityModal.tsx', 'w') as f:
    f.write(modal)

