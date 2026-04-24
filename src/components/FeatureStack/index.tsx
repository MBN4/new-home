import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export default function FeatureStack({ color = "navy" }: { color?: "navy" | "mint" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isNavy = color === "navy";

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const cards = [
    { title: "Neural Sync", desc: "Aligning thoughts with code." },
    { title: "Visual Mesh", desc: "Seeing data as architecture." },
    { title: "Core Stitched", desc: "The ultimate unity." }
  ];

  return (
    <section 
      className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-[45] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]`}
    >
      <div className={`absolute inset-0 ${isNavy ? 'navy-glass' : 'glass'} rounded-t-[50px]`} />
      
      {/* Interactive Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
            animate={{ 
                x: (mousePos.x - window.innerWidth/2) * 0.03,
                y: (mousePos.y - window.innerHeight/2) * 0.03,
            }}
            className="w-full h-full flex items-center justify-center"
        >
            <div className={`w-[800px] h-[800px] border ${isNavy ? 'border-mint/20' : 'border-navy/20'} rounded-full`} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-6 space-y-12">
         <h2 className={`text-4xl md:text-6xl font-display text-center mb-12 ${isNavy ? 'text-white' : 'text-navy'}`}>
            {isNavy ? 'SYSTEM CORE' : 'INTERFACE LAYER'}
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-8 rounded-3xl ${isNavy ? 'bg-white/5 border-white/10' : 'bg-navy/5 border-navy/10'} border backdrop-blur-sm`}
               >
                  <h4 className={`text-xl font-display mb-4 ${isNavy ? 'text-white' : 'text-navy'}`}>{card.title}</h4>
                  <p className={`text-sm font-light ${isNavy ? 'text-white/60' : 'text-navy/60'}`}>{card.desc}</p>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}
