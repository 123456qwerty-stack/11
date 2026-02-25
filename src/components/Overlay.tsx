import { motion } from 'motion/react';
import { Sparkles, Gift, Star, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export function Overlay() {
  const [isMuted, setIsMuted] = useState(true);

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#062c1e', '#ffffff'],
    });
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-between items-start pointer-events-auto"
      >
        <div className="space-y-1">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-60">Signature Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl gold-text tracking-tight">Arix Christmas</h1>
        </div>
        
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full glass-panel text-gold-bright hover:scale-110 transition-transform"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col items-center md:items-start space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-md space-y-6 pointer-events-auto"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gold-bright/40" />
            <span className="font-sans text-xs tracking-widest uppercase text-gold-soft">Interactive Experience</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-white">
            The Golden <br /> 
            <span className="italic font-light">Emerald</span> Tree
          </h2>
          
          <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed font-light">
            Experience the pinnacle of festive luxury. A handcrafted digital masterpiece 
            adorned with signature Arix ornaments and cinematic radiance.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={triggerCelebration}
              className="group relative px-8 py-4 bg-gold-bright text-emerald-deep font-sans font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Gift size={16} />
                Unwrap Magic
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className="px-8 py-4 glass-panel text-gold-bright font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold-bright/10 transition-colors flex items-center gap-2">
              <Star size={16} />
              Customize
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pointer-events-auto"
      >
        <div className="flex gap-8">
          <div className="space-y-1">
            <p className="font-sans text-[9px] uppercase tracking-tighter opacity-40">Material</p>
            <p className="font-serif text-sm italic">Emerald Silk & Gold</p>
          </div>
          <div className="space-y-1">
            <p className="font-sans text-[9px] uppercase tracking-tighter opacity-40">Lighting</p>
            <p className="font-serif text-sm italic">Cinematic Bloom</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-[10px] tracking-widest uppercase opacity-40">Scroll to Explore</span>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
      </motion.footer>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none hidden lg:block">
        <Sparkles size={120} className="text-gold-bright animate-pulse" />
      </div>
    </div>
  );
}
