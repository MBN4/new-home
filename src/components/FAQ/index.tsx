import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  const questions = [
    { q: "How does the 'stitched' architecture work?", a: "It uses custom-built connectors that bridge the gap between disparate data structures, allowing real-time synchronization without manual mapping." },
    { q: "Is this production ready?", a: "Yes, our protocols are currently powering several fortune 500 enterprise neural networks." },
    { q: "What is the primary support model?", a: "We offer tiered support starting from community forums up to dedicated on-premise engineers for enterprise clients." },
    { q: "Can I self-host the stitched node?", a: "Enterprise clients have full access to our containerized node architecture for on-premise deployments." }
  ];

  return (
    <section className="sticky top-0 h-screen w-full bg-white z-[80] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
         <h2 className="text-6xl font-display text-navy mb-16 text-center">QUESTIONS</h2>
         <div className="space-y-4">
            {questions.map((item, i) => (
               <div key={i} className="border-b border-navy/10 last:border-0 overflow-hidden">
                  <button 
                    onClick={() => setActive(active === i ? null : i)}
                    className="w-full flex items-center justify-between py-8 text-left group"
                  >
                     <span className="text-2xl font-display text-navy group-hover:text-mint transition-colors">{item.q}</span>
                     <ChevronDown className={`text-navy transition-transform duration-500 ${active === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                     {active === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        >
                           <div className="pb-8 text-navy/60 font-light text-lg leading-relaxed">
                              {item.a}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
}
