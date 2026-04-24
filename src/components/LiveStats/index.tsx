import { motion } from 'motion/react';

export default function LiveStats() {
  const stats = [
    { label: "Throughput", value: "98.4%", height: "80%" },
    { label: "Sync Latency", value: "0.2ms", height: "40%" },
    { label: "Nodes", value: "4.2k", height: "100%" },
    { label: "Integrations", value: "112+", height: "60%" },
  ];

  return (
    <section 
      className="sticky top-0 h-screen w-full bg-navy z-[60] flex items-center justify-center rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-6xl w-full px-6 flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16">
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: stat.height }}
               transition={{ duration: 1, ease: "circOut", delay: i * 0.1 }}
               className="w-24 md:w-32 bg-gradient-to-t from-mint/20 to-mint rounded-t-2xl relative group overflow-hidden"
             >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.div>
             <div className="text-center mt-8 space-y-2">
                <div className="text-white font-mono text-xs opacity-50 uppercase tracking-widest">{stat.label}</div>
                <div className="text-white text-3xl md:text-5xl font-display tracking-tight">{stat.value}</div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
         <div className="px-6 py-2 border border-mint/20 rounded-full text-mint font-mono text-sm">REALTIME_METRICS::ACTIVE</div>
      </div>
    </section>
  );
}
