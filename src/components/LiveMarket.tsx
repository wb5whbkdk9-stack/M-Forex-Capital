import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function LiveMarket() {
  const flow = [
    "LEARN",
    "WATCH",
    "IDENTIFY",
    "CONFIRM",
    "PLAN",
    "EXECUTE RESPONSIBLY",
    "REVIEW"
  ];

  return (
    <section className="py-24 bg-brand-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Theory Ton Live Market Tak.</h2>
          <p className="text-lg text-slate-400 mb-4">
            Sirf PDF padh ke trading skill complete nahi hundi.
          </p>
          <p className="text-lg text-gold-400 font-medium">
            Real learning odon develop hundi hai jadon tusi chart te concept identify karna sikhde ho.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-lg mx-auto">
          {flow.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`w-full py-4 px-6 text-center rounded-xl font-bold tracking-widest text-sm md:text-base border ${
                  index === flow.length - 2 
                    ? 'bg-gold-500 text-brand-black border-gold-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'bg-brand-card text-white border-slate-700/50'
                }`}
              >
                {step}
              </motion.div>
              {index < flow.length - 1 && (
                <div className="py-3 text-gold-500/50">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Live market examples educational purpose layi ne.
          </p>
        </div>
      </div>
    </section>
  );
}
