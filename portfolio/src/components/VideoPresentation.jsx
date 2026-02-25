import { useState } from "react";
import { motion } from "framer-motion";
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function VideoPresentation() {
  const VIDEO_URL = ""; // Remplacer par l'URL de votre vidéo CapCut (.mp4 ou embed)

  return (
    <section id="video" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-primary left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" style={{ opacity: 0.06 }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <p className="section-subtitle">Vidéo Présentation</p>
          <h2 className="section-title">Qui est Armel ?</h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm">
            Ma présentation personnelle réalisée avec CapCut — ce qui me rend unique.
          </p>
        </motion.div>

        {/* Player container avec glow flottant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          animate={{ y: [0, -8, 0] }}
          // Note: combine avec whileInView en encapsulant
          className="relative group"
        >
          {/* Glow border animé */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary via-primary-light to-primary opacity-60 blur-[2px] group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-primary via-primary-light to-primary opacity-20 blur-xl" />

          <div
            className="relative rounded-3xl overflow-hidden bg-dark-muted border border-primary/20"
            style={{ aspectRatio: "16/9" }}
          >
            {VIDEO_URL ? (
              <video src={VIDEO_URL} controls className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-card via-dark to-dark-muted">
                {/* Background grid */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* Cercles concentriques animés */}
                {[140, 100, 60].map((size, i) => (
                  <motion.div key={size}
                    className="absolute rounded-full border border-primary/20"
                    style={{ width: size, height: size }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}

                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.6)]"
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>

                <p className="relative z-10 text-white/40 text-sm mt-5 font-medium">Vidéo de présentation CapCut</p>
                <p className="relative z-10 text-white/20 text-xs mt-1">Ajoutez VIDEO_URL dans VideoPresentation.jsx</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-dark-card border border-dark-border rounded-2xl p-6"
        >
          <div>
            <h3 className="font-bold text-white text-lg">Intéressé par ma façon de travailler ?</h3>
            <p className="text-white/40 text-sm mt-1">Discutons de votre prochain projet ensemble.</p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">
            <MdMail size={18} /> Me contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
