import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Logo } from './Logo';

export type LegalType = 'privacy' | 'terms' | 'risk' | null;

export function LegalModal({ type, onClose }: { type: LegalType; onClose: () => void }) {
  if (!type) return null;

  let title = '';
  let content = null;

  if (type === 'terms') {
    title = 'Terms & Conditions';
    content = (
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p><strong>1. Introduction</strong><br/>
        Welcome to M Forex Capital. By accessing this website and using our resources, you agree to be bound by these Terms and Conditions.</p>
        
        <p><strong>2. Educational Purposes Only</strong><br/>
        All content provided by M Forex Capital, including but not limited to text, graphics, images, and other material, is for educational purposes only. We are not a broker, and we do not provide financial, investment, or trading advice.</p>
        
        <p><strong>3. No Guarantees</strong><br/>
        Trading foreign exchange on margin carries a high level of risk. We make no guarantees regarding profits or freedom from losses. Any examples or charts shown are for illustrative purposes and do not represent guaranteed outcomes.</p>
        
        <p><strong>4. User Responsibility</strong><br/>
        You are solely responsible for your own trading decisions. M Forex Capital, its founders, and community members shall not be held liable for any financial losses or damages incurred as a result of using the information provided.</p>
        
        <p><strong>5. Intellectual Property</strong><br/>
        All materials on this website are the intellectual property of M Forex Capital. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
      </div>
    );
  } else if (type === 'privacy') {
    title = 'Privacy Policy';
    content = (
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p><strong>1. Information Collection</strong><br/>
        We only collect basic information that you voluntarily provide to us when you contact us or join our community platforms (WhatsApp, Telegram, Instagram).</p>
        
        <p><strong>2. Use of Information</strong><br/>
        Any personal information provided is used solely for the purpose of communication, improving our educational content, and providing you with a better learning experience. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        
        <p><strong>3. Third-Party Links</strong><br/>
        Our website contains links to third-party platforms (like WhatsApp, Telegram, Instagram). We are not responsible for the privacy practices or the content of these third-party websites.</p>
        
        <p><strong>4. Data Security</strong><br/>
        We take reasonable measures to protect your information, but please be aware that no method of transmission over the internet or electronic storage is 100% secure.</p>
        
        <p><strong>5. Updates to Policy</strong><br/>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
      </div>
    );
  } else if (type === 'risk') {
    title = 'Risk Disclosure';
    content = (
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p><strong>HIGH RISK WARNING:</strong><br/>
        Trading foreign exchange (Forex), CFDs, and other leveraged products carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you.</p>
        
        <p><strong>1. Potential for Loss</strong><br/>
        Before deciding to trade Forex, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you could sustain a loss of some or all of your initial investment. Therefore, you should not invest money that you cannot afford to lose.</p>
        
        <p><strong>2. Educational Content</strong><br/>
        M Forex Capital provides educational content strictly for learning purposes. We do not provide trade signals or investment advice. Any trade setups or market analysis shared in the community or on this website are for educational discussion only.</p>
        
        <p><strong>3. Past Performance</strong><br/>
        Past performance of any trading system or methodology is not necessarily indicative of future results.</p>
        
        <p><strong>4. Seek Independent Advice</strong><br/>
        You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial advisor if you have any doubts.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl border border-gold-500/20 bg-brand-dark shadow-2xl"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between border-b border-slate-700/50 p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10">
              <Logo />
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-white uppercase tracking-wider">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 bg-brand-black hover:bg-slate-800 border border-slate-700/50 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {content}
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-slate-700/50 p-6 flex justify-center bg-brand-black/50">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" /> Close & Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
