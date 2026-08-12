import os

with open('src/components/ResourceLibrary.tsx', 'r') as f:
    content = f.read()

# I will just write a python script to replace the resources array.
new_resources = """const resources = [
    {
      title: "Risk Calculator",
      subtitle: "Calculates Pip Value & Risk Management",
      desc: "Apna stop loss te position size calculate karo trade open karan ton pehla. Proper risk management naal account protect karo.",
      file: "#calculator", // Link to internal section
      isPdf: false,
      btnText: "OPEN CALCULATOR →"
    },
    {
      title: "Price Action Guide",
      subtitle: "Live chart nu structure naal read karan layi.",
      desc: "Price action te market structure nu samajh ke trade setup identify karan layi visual guide.",
      file: "/M.capital.forex.trading.playbook.pdf",
      isPdf: true,
      btnText: "OPEN PDF →"
    },
    {
      title: "Community Journal",
      subtitle: "Psychology & Trade Logging Template",
      desc: "Apne trades, emotions, te mistakes nu log karan layi template. Consistent profitable trader banan layi daily journaling zaroori hai.",
      file: "/M.forex.capital.psychology.guide .pdf",
      isPdf: true,
      btnText: "OPEN JOURNAL →"
    }
  ];"""

# Replace the old array. The old array starts with `const resources = [` and ends with `  ];` right before `return (`
import re

content = re.sub(r'const resources = \[\s*\{.*?\];', new_resources, content, flags=re.DOTALL)

# Update the rendering to handle isPdf flag.
# I need to change:
# <div className="inline-block px-3 py-1 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest rounded-full mb-3 uppercase">
#   PDF GUIDE
# </div>
# to check isPdf.
content = content.replace(
    'PDF GUIDE',
    '{res.isPdf ? "PDF GUIDE" : "INTERACTIVE TOOL"}'
)

# And for the preview button:
# <button onClick={() => setPreviewPdf({ file: res.file, title: res.title })}
# I should only show preview for PDFs.
content = content.replace(
    """<button
                  onClick={() => setPreviewPdf({ file: res.file, title: res.title })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-brand-black hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 font-bold rounded-xl transition-all duration-300 uppercase tracking-wide"
                >
                  <Eye className="w-4 h-4" />
                  PREVIEW
                </button>""",
    """{res.isPdf && (
                  <button
                    onClick={() => setPreviewPdf({ file: res.file, title: res.title })}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-brand-black hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 font-bold rounded-xl transition-all duration-300 uppercase tracking-wide"
                  >
                    <Eye className="w-4 h-4" />
                    PREVIEW
                  </button>
                )}"""
)

with open('src/components/ResourceLibrary.tsx', 'w') as f:
    f.write(content)
