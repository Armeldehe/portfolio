import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX    = useMotionValue(-100);
  const dotY    = useMotionValue(-100);

  // Smooth spring pour l'anneau extérieur
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  const isHovered = useRef(false);
  const scaleVal  = useMotionValue(1);
  const ringScale = useSpring(scaleVal, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onEnter = (e) => {
      const el = e.target;
      if (el.closest("a, button, [data-cursor-hover]")) {
        scaleVal.set(2.5);
        isHovered.current = true;
      }
    };

    const onLeave = (e) => {
      const el = e.target;
      if (el.closest("a, button, [data-cursor-hover]")) {
        scaleVal.set(1);
        isHovered.current = false;
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover",  onEnter);
    document.addEventListener("mouseout",   onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
    };
  }, []);

  return (
    <>
      {/* Anneau extérieur - suit avec spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-primary-light opacity-70" />
      </motion.div>

      {/* Point central - suit instantanément */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary-light shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
      </motion.div>
    </>
  );
}
