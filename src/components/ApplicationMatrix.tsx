import { motion } from 'motion/react';
import { useState } from 'react';
import { Microscope, Activity, ShieldCheck, Zap, HeartPulse, Leaf } from 'lucide-react';

const CATEGORIES = [
  { 
    id: 'pharma', 
    name: 'Pharmaceutical', 
    icon: Microscope, 
    color: 'blue', 
    desc: 'High-purity grades compliant with USP, EP, and AJI standards for injection and infusion.',
    accent: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  { 
    id: 'supplement', 
    name: 'Dietary Supplement', 
    icon: HeartPulse, 
    color: 'cyan', 
    desc: 'Crystalline powders optimized for bioavailability in sports nutrition and health supplements.',
    accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  { 
    id: 'food', 
    name: 'Food & Beverage', 
    icon: Zap, 
    color: 'purple', 
    desc: 'Flavor enhancement and nutritional fortification components for functional foods.',
    accent: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  { 
    id: 'feed', 
    name: 'Animal Nutrition', 
    icon: Leaf, 
    color: 'green', 
    desc: 'Cost-effective bulk amino acids for precision animal feed formulations.',
    accent: 'bg-green-500/20 text-green-400 border-green-500/30'
  }
];

export default function ApplicationMatrix() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      <div className="col-span-1 space-y-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat)}
            className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
              activeTab.id === cat.id 
                ? 'bg-slate-900 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              activeTab.id === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'
            }`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-bold ${activeTab.id === cat.id ? 'text-white' : 'text-slate-400'}`}>
                {cat.name}
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Industrial Grade</p>
            </div>
          </button>
        ))}
      </div>

      <div className="col-span-1 lg:col-span-2 relative">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-12 rounded-3xl flex flex-col justify-center"
        >
          <div className={`px-4 py-1 rounded-full text-[10px] font-mono border inline-block mb-8 ${activeTab.accent}`}>
            {activeTab.name.toUpperCase()} SOLUTIONS
          </div>
          <h3 className="text-4xl font-bold text-white mb-6">
            Optimized for <span className={`${activeTab.id === 'pharma' ? 'text-blue-500' : 
                                             activeTab.id === 'supplement' ? 'text-cyan-500' :
                                             activeTab.id === 'food' ? 'text-purple-500' : 'text-green-500'}`}>
              Professional {activeTab.name}
            </span> Challenges.
          </h3>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-12">
            {activeTab.desc} We provide comprehensive documentation support and batch-specific analysis to ensure total compliance with regional regulations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 flex items-start gap-4">
              <Activity className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h5 className="text-white font-bold mb-2">Technical Support</h5>
                <p className="text-sm text-slate-500">Formulation assistance and application data provided by our chemical engineering team.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h5 className="text-white font-bold mb-2">Quality Tracking</h5>
                <p className="text-sm text-slate-500">Every batch is trackable with digital COA and automated stability testing reports.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
