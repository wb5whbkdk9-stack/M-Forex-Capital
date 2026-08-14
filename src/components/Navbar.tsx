import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { Ticker } from './Ticker';

export function Navbar({ onOpenCommunity, onOpenGuide }: { onOpenCommunity: () => void, onOpenGuide?: (type: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'What You Will Learn', href: '#learn' },
    { name: 'Live Classes & Course', href: '#live-classes' },
    { name: 'Candlestick Guide', action: 'candlestick' },
    { name: 'Trading Psychology', action: 'psychology' },
    { name: 'Trading Playbook', action: 'playbook' },
    { name: 'Community', href: '#community' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <Ticker onOpenGuide={onOpenGuide} />
      <header
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-brand-black/90 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'
        }`}
      >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <a href="#" className="flex items-center gap-2 z-50">
            <div className="h-10 w-10 md:h-12 md:w-12">
              <Logo />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-white tracking-wider hidden sm:block">
              M FOREX CAPITAL
            </span>
          </a>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.name}
                    onClick={() => onOpenGuide?.(link.action)}
                    className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </button>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Desktop CTA & Socials */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+917973986978" className="text-slate-300 hover:text-gold-400 transition-colors" title="+91 7973986978">
              <Phone className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-gold-400 transition-colors" title="@m.forex.capital">
              <Instagram className="h-5 w-5" />
            </a>
            <button
              onClick={onOpenCommunity}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-brand-black font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5"
            >
              JOIN COMMUNITY
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-b border-gold-500/10 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  if (link.action) {
                    return (
                      <button
                        key={link.name}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onOpenGuide?.(link.action);
                        }}
                        className="text-lg font-medium text-left text-slate-300 hover:text-gold-400"
                      >
                        {link.name}
                      </button>
                    );
                  }
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-slate-300 hover:text-gold-400"
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
              
              <div className="h-px w-full bg-slate-800/50" />
              
              <div className="flex items-center gap-6">
                <a href="tel:+917973986978" className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-5 w-5 text-gold-500" />
                  <span>+91 7973986978</span>
                </a>
                <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300">
                  <Instagram className="h-5 w-5 text-gold-500" />
                  <span>Instagram</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCommunity();
                }}
                className="w-full py-4 mt-4 bg-gradient-to-r from-gold-600 to-gold-500 text-brand-black font-bold rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] text-lg"
              >
                JOIN COMMUNITY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </div>
  );
}
