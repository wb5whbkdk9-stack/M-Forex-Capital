import React, { useState } from 'react';

import { Phone, Instagram, MessageSquare, Send } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Gal Kariye 👋</h2>
          <p className="text-lg text-slate-400">Website, community ya learning related koi question hai?</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Info */}
          <div className="flex-1 space-y-8">
            <div className="bg-brand-card p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <a href="tel:+917973986978" className="flex items-center gap-4 text-slate-300 hover:text-gold-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center border border-slate-800 group-hover:border-gold-500/50">
                    <Phone className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium mb-1">Phone / WhatsApp</div>
                    <div className="font-bold text-lg">+91 7973986978</div>
                  </div>
                </a>
                
                <a href="https://instagram.com/m.forex.capital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-gold-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center border border-slate-800 group-hover:border-gold-500/50">
                    <Instagram className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium mb-1">Instagram</div>
                    <div className="font-bold text-lg">@m.forex.capital</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-brand-card p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Community Links</h3>
              <div className="space-y-4">
                <a href="https://chat.whatsapp.com/CHWthrGsb7m01tgUxMH7Ft?s=cl&p=i&mlu=0&ilr=0&amv=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-brand-dark hover:bg-slate-800/30 border border-slate-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                    <span className="font-medium text-white">WhatsApp Community</span>
                  </div>
                  <span className="text-xs font-bold text-brand-green px-3 py-1 bg-brand-green/10 rounded-full group-hover:bg-brand-green/20">JOIN</span>
                </a>
                
                <a href="https://t.me/+yjAXBlYqmP5iYjll" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-brand-dark hover:bg-slate-800/30 border border-slate-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="font-medium text-white">Telegram Community</span>
                  </div>
                  <span className="text-xs font-bold text-blue-500 px-3 py-1 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20">JOIN</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-[1.5]">
            <div className="bg-brand-card p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-gold-500" /> Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                    <input required type="text" className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="Tera naam" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone / Email</label>
                    <input required type="text" className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="Contact info" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                  <textarea required rows={4} className="w-full bg-brand-dark border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" placeholder="Apna message likho..." />
                </div>
                
                {status === 'success' ? (
                  <div className="bg-brand-green/20 text-brand-green border border-brand-green/30 p-4 rounded-xl text-center font-medium">
                    Message receive ho gaya. M Forex Capital team naal contact kita jawega.
                  </div>
                ) : (
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-brand-black font-bold rounded-xl transition-all">
                    SEND MESSAGE <Send className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
