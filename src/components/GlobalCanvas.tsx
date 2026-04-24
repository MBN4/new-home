import { useScroll, useSpring } from 'motion/react';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BackgroundPoints() {
  const ref = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();
  const scrollSpeed = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sphere = useMemo(() => {
    const pts = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Rotate based on scroll speed
    const s = scrollSpeed.get();
    ref.current.rotation.y += delta * (0.1 + s * 2);
    ref.current.rotation.x += delta * (0.05 + s);

    // Follow mouse with gravity pull effect
    const targetX = mouse.current.x * 5;
    const targetY = mouse.current.y * 5;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;

    // Pulse size based on speed
    ref.current.scale.setScalar(1 + s * 0.5);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#1A277A"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#F9FAFB]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <BackgroundPoints />
      </Canvas>
    </div>
  );
}
