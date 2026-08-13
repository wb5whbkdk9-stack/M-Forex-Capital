import { Logo } from './Logo';

import { LegalType } from "./LegalModal";

export function Footer({ onOpenLegal }: { onOpenLegal: (type: LegalType) => void }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="w-16 h-16 mb-6">
              <Logo />
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-widest mb-2">M FOREX CAPITAL</h3>
            <p className="text-gold-400 font-medium text-sm italic">
              "Trading nu shortcut nahi — skill samjho."
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">LINKS</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold-400 transition-colors">About</a></li>
              <li><a href="#learn" className="hover:text-gold-400 transition-colors">Learn</a></li>
              <li><a href="#roadmap" className="hover:text-gold-400 transition-colors">Roadmap</a></li>
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">COMMUNITY</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="https://chat.whatsapp.com/CHWthrGsb7m01tgUxMH7Ft?s=cl&p=i&mlu=0&ilr=0&amv=0" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">WhatsApp</a>
              </li>
              <li>
                <a href="https://t.me/+yjAXBlYqmP5iYjll" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Telegram</a>
              </li>
              <li>
                <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Instagram</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider">CONTACT</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="tel:+917973986978" className="hover:text-gold-400 transition-colors">+91 7973986978</a>
              </li>
              <li>
                <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">@m.forex.capital</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="text-xs text-slate-500 leading-relaxed text-justify mb-8 uppercase">
            Disclaimer: M Forex Capital educational content provide karda hai. Eh website financial, investment ya trading advice nahi dindi. Forex te leveraged products vich substantial risk ho sakda hai. Kise vi strategy, setup, example ya educational material nu guaranteed profit signal na samjho. Past performance future results di guarantee nahi.
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {currentYear} M Forex Capital. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('privacy'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Privacy Policy</button>
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('terms'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Terms & Conditions</button>
              <button onClick={(e) => { e.preventDefault(); onOpenLegal('risk'); }} className="hover:text-white transition-colors uppercase tracking-wider font-medium">Risk Disclosure</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
