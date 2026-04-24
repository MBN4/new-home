/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import GlobalCanvas from './components/GlobalCanvas';
import Hero from './components/Hero';
import KineticGlobe from './components/KineticGlobe';
import ValueProp from './components/ValueProp';
import PartnerMarquee from './components/PartnerMarquee';
import AISplit from './components/AISplit';
import FeatureStack from './components/FeatureStack';
import HorizontalGallery from './components/HorizontalGallery';
import Workflow from './components/Workflow';
import LiveStats from './components/LiveStats';
import TestimonialSlider from './components/TestimonialSlider';
import IntegrationGrid from './components/IntegrationGrid';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative w-full overflow-x-hidden">
      <GlobalCanvas />
      
      {/* Top Navigation Rail */}
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-10 border-b border-navy/10 bg-white/50 backdrop-blur-md z-[200]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-navy rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-mint rotate-45"></div>
          </div>
          <span className="font-display font-bold tracking-tighter text-xl uppercase italic text-navy">Stitched.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-navy">
          <a href="#hero" className="text-mint border-b border-mint">01 Hero</a>
          <a href="#globe" className="opacity-50 hover:opacity-100 transition-opacity">02 Globe</a>
          <a href="#features" className="opacity-50 hover:opacity-100 transition-opacity">07 Features</a>
          <a href="#pricing" className="px-4 py-1 border border-navy rounded-full hover:bg-navy hover:text-white transition-all">Connect</a>
        </div>
      </nav>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-16 left-0 right-0 h-0.5 bg-mint z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* Side Rails */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-12 z-[100] pointer-events-none">
        <div className="w-[1px] h-32 bg-navy/20"></div>
        <div className="rotate-90 text-[9px] uppercase tracking-[0.4em] font-bold whitespace-nowrap text-navy/40">
          SCROLL FOR STACK EFFECT
        </div>
        <div className="w-[1px] h-32 bg-navy/20"></div>
      </div>

      <div className="fixed left-6 bottom-32 hidden lg:flex flex-col gap-4 z-[100] pointer-events-none">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold opacity-30 text-navy uppercase">Uptime</span>
          <span className="text-sm font-mono text-navy">99.98%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold opacity-30 text-navy uppercase">Latency</span>
          <span className="text-sm font-mono text-mint">12ms</span>
        </div>
      </div>

      <div className="relative">
        <Hero />
        <KineticGlobe />
        <ValueProp />
        <PartnerMarquee />
        <AISplit />
        <FeatureStack color="mint" />
        <FeatureStack color="navy" />
        <HorizontalGallery />
        <Workflow />
        <LiveStats />
        <TestimonialSlider />
        <IntegrationGrid />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
