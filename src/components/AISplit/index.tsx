import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export default function AISplit() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4], ["-100%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"]);

  return (
    <section 
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden flex z-40 bg-canvas rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
    >
      <motion.div 
        style={{ x: leftX }}
        className="w-1/2 h-full bg-terminal p-12 flex flex-col justify-center border-r border-white/10"
      >
        <div className="terminal-window rounded-xl overflow-hidden transform -rotate-1 max-w-lg w-full flex flex-col h-[400px]">
           <div className="h-8 bg-navy flex items-center px-4 gap-2 border-b border-mint/20">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-[10px] text-white/50 ml-4 font-mono">vision_agent.cpp</span>
           </div>
           <div className="p-6 font-mono text-xs text-mint space-y-1 overflow-hidden">
             <p><span className="opacity-40">01</span> <span className="text-pink-400">import</span> {'{ NeuralNet }'} from <span className="text-white">"stitched-core"</span>;</p>
             <p><span className="opacity-40">02</span></p>
             <p><span className="opacity-40">03</span> <span className="text-blue-400">async function</span> trackMouse(event) {'{'}</p>
             <p><span className="opacity-40">04</span>   <span className="opacity-40 italic">// Calculating AI Gaze Vectors</span></p>
             <p><span className="opacity-40">05</span>   <span className="text-pink-400">const</span> angle = Math.atan2(e.y, e.x);</p>
             <p><span className="opacity-40">06</span>   <span className="text-blue-400">await</span> Agent.lerp(angle, {'{ speed: 0.8 }'});</p>
             <p><span className="opacity-40">07</span> {'}'}</p>
             <p><span className="opacity-40">08</span></p>
             <p><span className="opacity-40">09</span> NeuralNet.initialize({'{'}</p>
             <p><span className="opacity-40">10</span>   accent: <span className="text-white">"#71FCAC"</span>,</p>
             <p><span className="opacity-40">11</span>   responsive: <span className="text-pink-400">true</span></p>
             <p><span className="opacity-40">12</span> {'}'});</p>
           </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ x: rightX }}
        className="w-1/2 h-full bg-white flex items-center justify-center relative p-12"
      >
        <div className="max-w-md">
            <div className="inline-block px-3 py-1 bg-mint text-navy text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 italic">
               Intelligent Interface
            </div>
            <h2 className="text-7xl font-display font-medium text-navy leading-tight mb-8">
               AI Split <br/>
               <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-navy to-mint">Horizon.</span>
            </h2>
            <p className="text-navy/60 font-light text-lg leading-relaxed mb-8">
               As you move your cursor across the digital landscape, the interface breathes. Our AI-driven eye-tracking logic ensures high-fidelity interaction that feels alive.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-navy rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-all cursor-pointer group">
                <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="font-bold uppercase text-[10px] tracking-widest">Explore the Core</span>
            </div>
        </div>

        {/* Floating Center Icon: AI Face */}
        <motion.div 
          style={{ 
            rotateX: mousePos.y * 30,
            rotateY: mousePos.x * 30,
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-48 h-48 rounded-full shadow-3xl flex items-center justify-center p-2 z-50 glass border-4 border-mint/30"
        >
          <div className="w-full h-full rounded-full bg-navy relative overflow-hidden flex items-center justify-center">
             <div className="relative w-32 h-16">
                <motion.div 
                  animate={{ 
                    x: mousePos.x * 20 - 20,
                    y: mousePos.y * 20 - 10,
                  }}
                  className="absolute left-6 top-4 w-5 h-5 bg-navy border border-mint rounded-full flex items-center justify-center overflow-hidden"
                >
                   <div className="w-2 h-2 bg-mint rounded-full shadow-[0_0_10px_#71FCAC]" />
                </motion.div>
                <motion.div 
                  animate={{ 
                    x: mousePos.x * 20 + 20,
                    y: mousePos.y * 20 - 10,
                  }}
                  className="absolute right-6 top-4 w-5 h-5 bg-navy border border-mint rounded-full flex items-center justify-center overflow-hidden"
                >
                   <div className="w-2 h-2 bg-mint rounded-full shadow-[0_0_10px_#71FCAC]" />
                </motion.div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-mint/20" />
             </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
