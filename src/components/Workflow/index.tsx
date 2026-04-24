import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Workflow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  const steps = [
    { name: "Injest", x: 10, y: 10 },
    { name: "Stitch", x: 90, y: 30 },
    { name: "Execute", x: 10, y: 50 },
    { name: "Iterate", x: 90, y: 70 },
    { name: "Evolve", x: 50, y: 90 },
  ];

  return (
    <section 
      ref={containerRef}
      className="sticky top-0 h-screen w-full bg-white z-[55] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 10 10 L 90 30 L 10 50 L 90 70 L 50 90"
            fill="none"
            stroke="#71FCAC"
            strokeWidth="0.2"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-center">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="absolute p-6 glass rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 border-mint"
            style={{ left: `${step.x}%`, top: `${step.y}%` }}
          >
             <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-[10px] font-mono">{i+1}</div>
             <div className="text-xl font-display text-navy">{step.name}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="absolute top-24 left-24">
         <h2 className="text-5xl font-display text-navy">STITCHED<br/>WORKFLOW</h2>
      </div>
    </section>
  );
}
