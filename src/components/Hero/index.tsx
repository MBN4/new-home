import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
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
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Use springs for smooth mouse tracking with a jelly/elastic feel
  const springConfig = { stiffness: 150, damping: 15, mass: 1 };
  const smoothMouseX = useSpring(mousePos.x, springConfig);
  const smoothMouseY = useSpring(mousePos.y, springConfig);

  // Jelly distortion
  const skewX = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const skewY = useTransform(smoothMouseY, [-0.5, 0.5], [-5, 5]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[120vh] w-full z-10"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-canvas">
        
        {/* Interactive Background Elements (Jelly Blobs) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            style={{ 
              x: useTransform(smoothMouseX, [-0.5, 0.5], [50, -50]),
              y: useTransform(smoothMouseY, [-0.5, 0.5], [50, -50]),
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
            }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-mint/10 rounded-full blur-[120px]"
          />
          <motion.div 
            style={{ 
              x: useTransform(smoothMouseX, [-0.5, 0.5], [-100, 100]),
              y: useTransform(smoothMouseY, [-0.5, 0.5], [-100, 100]),
            }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-navy/5 rounded-full blur-[150px]"
          />
        </div>

        <motion.div 
          style={{ 
            opacity, 
            scale, 
            y,
            rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]),
            rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]),
            skewX,
            skewY,
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
          className="relative z-10 w-full max-w-5xl px-6"
        >
          {/* Main Glass Content Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass p-12 md:p-24 rounded-[80px] shadow-3xl text-center flex flex-col items-center border-white/60 backdrop-blur-3xl relative overflow-hidden group"
          >
            {/* Inner Light Sweep */}
            <motion.div 
               animate={{ x: [-500, 500] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-block mb-10 px-6 py-2 rounded-full border border-navy/10 text-navy font-mono text-[10px] uppercase tracking-[0.4em] bg-white/40 shadow-sm"
               style={{ translateZ: "50px" }}
            >
              Stitched :: GEN_V2.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-display font-medium text-navy leading-[0.8] tracking-tighter mb-12"
              style={{ translateZ: "100px" }}
            >
              FUTURE<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-navy via-navy to-mint drop-shadow-sm">STITCHED.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl text-navy/60 font-sans max-w-2xl mx-auto mb-16 leading-relaxed font-light"
              style={{ translateZ: "70px" }}
            >
              Architecting the next dimension of digital interaction through <span className="text-navy font-medium">stitched protocols</span> and neural design layers.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-10"
              style={{ translateZ: "80px" }}
            >
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="group relative px-14 py-7 bg-navy text-white rounded-full font-display font-medium text-xl overflow-hidden shadow-2xl shadow-navy/30 transition-all"
              >
                <span className="relative z-10 transition-colors group-hover:text-navy">Initialize</span>
                <div className="absolute inset-0 bg-mint translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.9 }}
                className="px-14 py-7 border-2 border-navy/5 text-navy rounded-full font-display font-medium text-xl hover:bg-white transition-all backdrop-blur-sm"
              >
                Evolution
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
