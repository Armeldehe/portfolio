import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MdArrowForward, MdMail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThreeScene from "./ThreeScene";

// Hook typing effect
function useTyping(words, speed = 100, pause = 1800) {
  const [display, setDisplay]   = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const titles = [
  "Développeur Fullstack MERN",
  "React & Node.js Expert",
  "Créateur d'Apps Modernes",
  "UI/UX Passionné",
];

const techBadges = ["React", "Node.js", "MongoDB", "Express", "Vite", "TailwindCSS"];

export default function Hero() {
  const heroRef  = useRef(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const springX  = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY  = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const orb1X = useTransform(springX, [-1, 1], ["-40px", "40px"]);
  const orb1Y = useTransform(springY, [-1, 1], ["-40px", "40px"]);
  const orb2X = useTransform(springX, [-1, 1], ["30px", "-30px"]);
  const orb2Y = useTransform(springY, [-1, 1], ["30px", "-30px"]);
  const textX = useTransform(springX, [-1, 1], ["-8px", "8px"]);
  const textY = useTransform(springY, [-1, 1], ["-5px", "5px"]);

  const typed = useTyping(titles);

  const handleMouseMove = (e) => {
    const rect   = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    mouseX.set(cx * 2);
    mouseY.set(cy * 2);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particules background viennent du App global */}

      {/* Orb 1 — gauche */}
      <motion.div style={{ x: orb1X, y: orb1Y }}
        className="glow-orb w-[700px] h-[700px] bg-primary top-1/4 -left-1/4"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }} style={{ opacity: 0.12, x: orb1X, y: orb1Y }} />

      {/* Orb 2 — droite */}
      <motion.div style={{ x: orb2X, y: orb2Y }}
        className="glow-orb w-[400px] h-[400px] bg-primary-light bottom-0 right-0" style={{ opacity: 0.07, x: orb2X, y: orb2Y }} />

      {/* Grid décoratif */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* 3D Scene — côté droit */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block" style={{ zIndex: 1 }}>
        <ThreeScene />
      </div>

      {/* Contenu Hero — gauche */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div style={{ x: textX, y: textY }}>
          {/* Badge disponible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-primary-light text-sm font-medium">Disponible pour des projets freelance</span>
          </motion.div>

          {/* Nom avec effet glitch */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-none mb-6"
          >
            <span className="text-white block">Armel</span>
            <span
              className="glitch-text gradient-text block"
              data-text="Dehe."
            >
              Dehe.
            </span>
          </motion.h1>

          {/* Typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-10 mb-6 flex items-center"
          >
            <span className="text-lg md:text-xl font-semibold text-primary-light">
              {typed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block ml-0.5 text-primary-light"
              >|</motion.span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/50 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Je crée des applications web{" "}
            <span className="text-white/80 font-medium">modernes</span>,{" "}
            <span className="text-white/80 font-medium">performantes</span> et{" "}
            <span className="text-white/80 font-medium">professionnelles</span> qui font la différence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-10"
          >
            <Link to="/projects" className="btn-primary">
              Voir mes projets <MdArrowForward size={18} />
            </Link>
            <Link to="/contact" className="btn-outline">
              <MdMail size={18} /> Me contacter
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {[
              { href: "https://github.com",   icon: FaGithub,   label: "GitHub" },
              { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                className="p-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Tech Badges — mobile/tablet uniquement (lg: masqué par 3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="lg:hidden flex flex-wrap gap-3 justify-center"
        >
          {techBadges.map((tech, i) => (
            <motion.span key={tech}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              whileHover={{ scale: 1.1, borderColor: "rgba(124,58,237,0.6)" }}
              className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-medium cursor-default">
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-white/15 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary-light rounded-full" />
        </motion.div>
        <p className="text-white/20 text-xs text-center mt-2">Scroll</p>
      </motion.div>
    </section>
  );
}
