import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const tunnelScale = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <footer 
      ref={containerRef}
      className="relative h-screen w-full bg-navy flex items-center justify-center z-[90] overflow-hidden rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
    >
      {/* Warp speed effect */}
      <motion.div 
        style={{ scale: tunnelScale, opacity: tunnelOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-full h-full border-[200px] border-mint/20 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-24 text-white">
         <div className="md:col-span-2">
            <h2 className="text-8xl font-display font-medium mb-12 tracking-tight">STITCHED.</h2>
            <p className="text-white/40 text-xl font-light max-w-md">Bridging the divide between intelligence and implementation. Join the evolution.</p>
         </div>
         
         <div className="space-y-6">
            <div className="font-mono text-xs opacity-30 uppercase tracking-widest">Navigation</div>
            <ul className="space-y-4 text-xl font-display">
               <li><a href="#" className="hover:text-mint transition-colors">Home</a></li>
               <li><a href="#" className="hover:text-mint transition-colors">Research</a></li>
               <li><a href="#" className="hover:text-mint transition-colors">Protocol</a></li>
               <li><a href="#" className="hover:text-mint transition-colors">Nodes</a></li>
            </ul>
         </div>

         <div className="space-y-6">
            <div className="font-mono text-xs opacity-30 uppercase tracking-widest">Connect</div>
            <div className="flex gap-6">
               <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-navy transition-all"><Twitter size={20} /></a>
               <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-navy transition-all"><Github size={20} /></a>
               <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-navy transition-all"><Linkedin size={20} /></a>
            </div>
            <div className="pt-12">
               <div className="font-mono text-xs opacity-30 uppercase tracking-widest mb-4">Newsletter</div>
               <div className="flex border-b border-white/20 pb-2">
                  <input type="text" placeholder="Your email" className="bg-transparent text-white outline-none w-full font-light" />
                  <button className="text-mint font-mono uppercase text-xs tracking-widest">JOIN</button>
               </div>
            </div>
         </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 font-mono text-[10px] opacity-20 uppercase tracking-[0.5em] text-white">
         <div>© 2026 STITCHED PROTOCOLS</div>
         <div>LOCAL TIME: {new Date().toLocaleTimeString()}</div>
         <div>VERSION_FINAL_STABLE</div>
      </div>
    </footer>
  );
}
