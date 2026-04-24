import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function TestimonialSlider() {
  const testimonials = [
    { text: "The stitched architecture changed how we process multi-modal data. Seamless.", author: "Sarah Zhang", role: "CTO @ Flux" },
    { text: "Finally an AI interface that feels like it belongs in the future.", author: "Alex Rivers", role: "Product Designer" },
    { text: "Scaling to thousands of nodes was a weekend task, not a month project.", author: "Marcus Aurelius", role: "Lead Dev @ Void" },
  ];

  return (
    <section className="sticky top-0 h-screen w-full bg-canvas z-[65] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ x: 500, opacity: 0, scale: 0.8 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`absolute w-[300px] md:w-[450px] p-12 glass rounded-[40px] shadow-2xl border-white/50 bg-white/30`}
            style={{ 
                top: `${20 + i * 20}%`, 
                left: i % 2 === 0 ? '15%' : 'auto',
                right: i % 2 !== 0 ? '15%' : 'auto'
            }}
          >
             <Quote className="text-mint mb-6" size={40} />
             <p className="text-navy text-xl font-light mb-8 italic">{t.text}</p>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-navy/10" />
                <div>
                   <div className="text-navy font-display text-sm">{t.author}</div>
                   <div className="text-navy/40 text-xs font-light">{t.role}</div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-24 right-24 text-right">
         <h2 className="text-6xl font-display text-navy opacity-10">THE<br/>ECHO</h2>
      </div>
    </section>
  );
}
