import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function ValueProp() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const features = [
    { title: "KINETIC", desc: "Energy-efficient model processing for rapid iteration." },
    { title: "STITCHED", desc: "Seamless integration across disparate data sources." },
    { title: "FLUID", desc: "Adaptive UI that moves with user intent." }
  ];

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section 
      className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[50px] overflow-hidden"
    >
      {/* Glass Layer */}
      <div className="absolute inset-0 glass rounded-t-[50px]" />
      
      {/* Decorative Interactive Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.div 
          animate={{ 
            x: (mousePos.x - window.innerWidth/2) * 0.05,
            y: (mousePos.y - window.innerHeight/2) * 0.05,
          }}
          className="w-full h-full grid grid-cols-6 grid-rows-6"
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-navy/20" />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-canvas border border-navy/5 hover:border-mint/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mb-8 group-hover:bg-mint/20 transition-colors">
              <div className="w-4 h-4 bg-navy rounded-full group-hover:bg-mint transition-colors" />
            </div>
            <h3 className="text-3xl font-display text-navy mb-4 tracking-tighter">{item.title}</h3>
            <p className="text-navy/60 leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
