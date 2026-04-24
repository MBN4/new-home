import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'motion/react';

function EarthPoints() {
  const ref = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 15000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 5 + Math.random() * 0.1;
        pts.push(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        );
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (0.05 + scrollYProgress.get() * 0.5);
    ref.current.rotation.x = scrollYProgress.get() * 0.5;
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#1A277A"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function KineticGlobe() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const globeScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 2]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [100, 0, 0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] w-full z-20 -mt-[20vh]"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
        <motion.div 
          style={{ scale: globeScale, opacity: globeOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Canvas camera={{ position: [0, 0, 15] }}>
             <ambientLight intensity={0.5} />
             <EarthPoints />
          </Canvas>
        </motion.div>
        
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 text-center max-w-4xl px-6 pointer-events-none"
        >
           <h2 className="text-7xl md:text-[10rem] font-display text-navy mb-8 tracking-tighter leading-none">
             NEURAL<br/><span className="text-mint">MESH.</span>
           </h2>
           <p className="text-xl md:text-3xl text-navy/40 font-light max-w-2xl mx-auto lowercase tracking-tight">
             Decentralized intelligence synchronization across global edge nodes.
           </p>
        </motion.div>
      </div>
    </section>
  );
}
