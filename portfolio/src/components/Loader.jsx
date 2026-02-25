import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=init, 1=loading, 2=done

  useEffect(() => {
    // Phase 0 -> 1 légère pause initiale
    const t0 = setTimeout(() => setPhase(1), 300);

    // Remplissage barre progression
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => { setPhase(2); setTimeout(onComplete, 800); }, 400);
      }
      setProgress(Math.min(current, 100));
    }, 80);

    return () => { clearTimeout(t0); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0F0F0F] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Glow orbs */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mb-10 relative"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.6)]">
              <span className="text-white font-black text-3xl tracking-tight">AD</span>
            </div>
            {/* Ring rotatif */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl border-2 border-transparent"
              style={{ borderTopColor: "#A78BFA", borderRightColor: "#7C3AED", margin: "-6px" }}
            />
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-white font-bold text-xl mb-1">Armel Dehe</h2>
            <p className="text-white/30 text-sm font-light tracking-widest uppercase">Chargement de l'expérience...</p>
          </motion.div>

          {/* Barre progression */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5 }}
            className="w-64"
          >
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-white/20 text-xs">{Math.round(progress)}%</span>
              {progress === 100 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-primary-light text-xs font-medium">Prêt ✓</motion.span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
