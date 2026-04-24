import { motion } from 'motion/react';

export default function PartnerMarquee() {
  const partners = ["NEURAL", "CYBER", "VOID", "OASIS", "SPECTRUM", "PRISM", "VECTOR", "FLUX"];

  return (
    <section className="relative h-40 bg-navy overflow-hidden z-35 flex items-center">
      <motion.div 
        className="flex gap-20 whitespace-nowrap px-10"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...partners, ...partners].map((name, i) => (
          <div key={i} className="text-4xl font-display font-bold text-white/20 tracking-widest hover:text-mint transition-colors cursor-default">
            {name}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
