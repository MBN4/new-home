import { motion } from 'motion/react';

export default function IntegrationGrid() {
  const icons = Array.from({ length: 12 });

  return (
    <section className="sticky top-0 h-screen w-full bg-white z-[70] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
      <div className="text-center mb-16 px-6">
         <h2 className="text-6xl font-display text-navy mb-4 tracking-tighter">INTEGRATIONS</h2>
         <p className="text-navy/60 font-light max-w-xl mx-auto">Connect with your favorite tools. Our protocol stitches into any environment seamlessly.</p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {icons.map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-canvas rounded-3xl border border-navy/5 flex items-center justify-center shadow-lg hover:shadow-mint/20 hover:border-mint transition-all cursor-pointer group"
          >
             <div className="w-12 h-12 bg-navy/5 rounded-2xl group-hover:bg-mint/30 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
