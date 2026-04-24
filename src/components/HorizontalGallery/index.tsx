import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export default function HorizontalGallery() {
  const targetRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const items = [
    { title: "Protocol Alpha", color: "bg-navy" },
    { title: "Neural Link", color: "bg-mint" },
    { title: "Quantum Stitch", color: "bg-navy" },
    { title: "Edge Node", color: "bg-mint" },
    { title: "Flux Core", color: "bg-navy" },
  ];

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-canvas z-50 rounded-t-[80px] shadow-[0_-40px_100px_rgba(0,0,0,0.1)] -mt-20 overflow-hidden">
      {/* Background Interactive Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <motion.div 
          animate={{ 
            x: (mousePos.x - window.innerWidth/2) * 0.05,
            y: (mousePos.y - window.innerHeight/2) * 0.05,
          }}
          className="absolute inset-0 grid grid-cols-12 gap-8 p-12"
        >
          {Array.from({ length: 96 }).map((_, i) => (
             <div key={i} className="aspect-square border border-navy/10 rounded-full scale-[0.2]" />
          ))}
        </motion.div>
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-32 left-32">
            <h2 className="text-[12rem] font-display text-navy opacity-5 select-none pointer-events-none tracking-tighter">COLLECTION</h2>
        </div>
        
        <motion.div style={{ x }} className="flex gap-20 px-[10vw]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -30, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex-shrink-0 w-[60vw] md:w-[800px] h-[75vh] rounded-[80px] p-20 flex flex-col justify-between ${item.color === 'bg-navy' ? 'text-white' : 'text-navy'} ${item.color} shadow-3xl relative group overflow-hidden cursor-grab active:cursor-grabbing`}
            >
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                   <div className="w-20 h-20 rounded-full border border-current flex items-center justify-center">
                      <div className="w-4 h-4 bg-current rounded-full animate-pulse" />
                   </div>
                </div>

                <div className="text-[12rem] font-display opacity-10 leading-none">0{i+1}</div>
                <div>
                    <h3 className="text-6xl md:text-8xl font-display mb-10 tracking-tighter leading-none">{item.title}</h3>
                    <p className="opacity-60 text-xl font-light leading-relaxed max-w-lg">Implementing deep neural stitching across enterprise datasets with {item.color === 'bg-navy' ? 'Navy-Prime' : 'Mint-Flow'} priority protocols for high-fidelity throughput.</p>
                </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
