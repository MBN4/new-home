import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    { title: "Personal", price: "0", features: ["1 Node", "Community Support", "Basic Analytics"] },
    { title: "Professional", price: "49", features: ["10 Nodes", "Priority Support", "Advanced Analytics", "Custom Plugins"], popular: true },
    { title: "Enterprise", price: "Custom", features: ["Unlimited Nodes", "24/7 Support", "White-labeling", "On-premise deployment"] }
  ];

  return (
    <section className="sticky top-0 h-screen w-full bg-canvas z-[75] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ y: -10 }}
            className={`relative p-10 rounded-[40px] border flex flex-col justify-between h-[500px] transition-all overflow-hidden ${plan.popular ? 'bg-navy border-navy text-white shadow-3xl' : 'bg-white border-navy/5 text-navy shadow-xl'}`}
          >
             {plan.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-mint text-navy text-[10px] font-bold rounded-full uppercase">Most Popular</div>
             )}
             <div>
                <h3 className="text-2xl font-display mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-5xl font-display">{plan.price === 'Custom' ? '' : '$'}{plan.price}</span>
                   {plan.price !== 'Custom' && <span className="opacity-60 text-sm">/mo</span>}
                </div>
                <div className="space-y-4">
                   {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-light">
                         <Check size={16} className={plan.popular ? 'text-mint' : 'text-navy/40'} />
                         {f}
                      </div>
                   ))}
                </div>
             </div>
             <button className={`w-full py-4 rounded-2xl font-display font-medium transition-all ${plan.popular ? 'bg-mint text-navy hover:scale-[1.02]' : 'bg-navy text-white hover:bg-navy/90'}`}>
                Get Started
             </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
