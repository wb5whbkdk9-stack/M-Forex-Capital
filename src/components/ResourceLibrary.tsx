import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Bot, Eye, X, Maximize2 } from 'lucide-react';

export function ResourceLibrary({ onOpenAI }: { onOpenAI: () => void }) {
  const [previewPdf, setPreviewPdf] = useState<{ file: string; title: string } | null>(null);

  const resources = [
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
  ];

  return (
    <section id="resources" className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-white">Free Learning Resources 📚</h2>
          <p className="text-lg text-slate-300 mb-2">
            M Forex Capital de practical guides — beginners layi easy Punjabi + simple trading terminology ch.
          </p>
          <p className="text-gold-400 font-medium tracking-wide">
            Practical guides jo tusi directly open karke padh sakde ho.
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {resources.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-brand-card rounded-3xl border border-gold-500/10 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center group hover:border-gold-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300"
            >
              <div className="w-16 h-16 shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                <FileText className="w-8 h-8 text-gold-500" />
              </div>
              
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest rounded-full mb-3 uppercase">
                  {res.isPdf ? "PDF GUIDE" : "INTERACTIVE TOOL"}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{res.title}</h3>
                <p className="text-slate-300 font-medium mb-2">{res.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{res.desc}</p>
              </div>
              
              <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0 flex flex-col sm:flex-row gap-3">
                {res.isPdf && (
                  <button
                    onClick={() => setPreviewPdf({ file: res.file, title: res.title })}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-brand-black hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 font-bold rounded-xl transition-all duration-300 uppercase tracking-wide"
                  >
                    <Eye className="w-4 h-4" />
                    PREVIEW
                  </button>
                )}
                <a 
                  href={res.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-gold-500 text-white hover:text-brand-black border border-slate-700 hover:border-gold-500 font-bold rounded-xl transition-all duration-300 uppercase tracking-wide"
                >
                  {res.btnText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center mt-20 pt-16 border-t border-slate-800">
          <p className="text-xl text-slate-300 mb-6 font-medium">Guide samajh nahi aa rahi?</p>
          <button 
            onClick={onOpenAI}
            className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-1"
          >
            <Bot className="w-5 h-5" />
            ASK M FOREX AI →
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPdf(null)}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-brand-card border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-brand-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white tracking-wide">{previewPdf.title}</h3>
                    <p className="text-xs text-gold-400">Preview Mode</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={previewPdf.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setPreviewPdf(null)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-brand-black text-xs font-bold rounded-lg transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                    OPEN FULL PDF
                  </a>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="flex-1 w-full bg-slate-900 overflow-hidden relative">
                {/* Fallback loading state/background */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 -z-10">
                  <FileText className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-medium">Loading preview...</p>
                </div>
                <iframe 
                  src={`${previewPdf.file}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0"
                  title={`${previewPdf.title} Preview`}
                />
              </div>
              
              {/* Mobile open button (since we hid it in header for space) */}
              <div className="sm:hidden p-4 border-t border-slate-700/50 bg-brand-black">
                <a 
                  href={previewPdf.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setPreviewPdf(null)}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-gold-500 text-brand-black font-bold rounded-xl"
                >
                  <Maximize2 className="w-4 h-4" />
                  OPEN FULL PDF
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
