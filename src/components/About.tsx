import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { BookOpen, Target, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gold-500/10 blur-[100px] rounded-full" />
              <Logo className="w-full h-full p-8" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">M Forex Capital Ki Hai?</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                M Forex Capital ik forex trading education te learning community hai jithe asi trading nu complicated language di jagah simple Punjabi + practical charts naal samjhaun di koshish karde haan.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Goal sirf eh nahi ke tusi candle da naam yaad karo. Goal eh hai ke tusi samjho:
              </p>
            </div>

            <ul className="space-y-3 font-medium text-gold-300 bg-brand-card/50 p-6 rounded-3xl border border-slate-800">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Market ki kar rahi?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Level kithe aa?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Structure ki aa?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Confirmation kado mili?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Entry kithon consider karni?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Risk kinna hona chahida?</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand-red" /> Trade kado avoid karni?</li>
            </ul>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-brand-dark p-5 rounded-xl border border-gold-500/20">
                <BookOpen className="w-6 h-6 text-gold-500 mb-3" />
                <div className="font-bold text-white mb-1">01 SAMJHO</div>
                <p className="text-sm text-slate-400">Market nu read karna.</p>
              </div>
              <div className="bg-brand-dark p-5 rounded-xl border border-gold-500/20">
                <Target className="w-6 h-6 text-gold-500 mb-3" />
                <div className="font-bold text-white mb-1">02 PRACTICE</div>
                <p className="text-sm text-slate-400">Charts te concepts identify karna.</p>
              </div>
              <div className="bg-brand-dark p-5 rounded-xl border border-gold-500/20">
                <TrendingUp className="w-6 h-6 text-gold-500 mb-3" />
                <div className="font-bold text-white mb-1">03 IMPLEMENT</div>
                <p className="text-sm text-slate-400">Proper confirmation te risk management naal.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
