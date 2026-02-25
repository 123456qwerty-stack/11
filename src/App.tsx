/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#020a08]">
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020a08]"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 border-t-2 border-gold-bright rounded-full mb-8"
            />
            <h2 className="font-serif text-2xl gold-text tracking-widest uppercase">Arix Signature</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full relative">
        <Scene />
        <Overlay />
      </div>

      {/* Grain Overlay for cinematic texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-40" />
    </main>
  );
}
