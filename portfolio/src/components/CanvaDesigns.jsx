import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdOpenInNew } from "react-icons/md";

function getDesigns() {
  try { return JSON.parse(localStorage.getItem("adminDesigns") || "[]"); } catch { return []; }
}

const catColors = {
  Poster:       "bg-violet-500/15 text-violet-300",
  Banner:       "bg-blue-500/15 text-blue-300",
  "Social Media": "bg-rose-500/15 text-rose-300",
};

// Composant carte avec effet tilt 3D
function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect   = card.getBoundingClientRect();
    const cx     = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy     = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-cy * 12}deg) rotateY(${cx * 12}deg) scale(1.02)`;
    card.style.boxShadow  = `${cx * 20}px ${cy * 20}px 40px rgba(124,58,237,0.25)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.boxShadow  = "";
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`tilt-card transition-transform duration-200 ease-out ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

export default function CanvaDesigns() {
  const designs = getDesigns();

  return (
    <section id="designs" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-primary right-0 top-0" style={{ opacity: 0.07 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-12"
        >
          <p className="section-subtitle">Créations Canva</p>
          <h2 className="section-title">Designs & Visuels</h2>
          <p className="text-white/40 max-w-lg text-sm">
            Affiches, bannières et créations graphiques réalisées avec Canva.
          </p>
        </motion.div>

        {designs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="card overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-primary-light/5 flex items-center justify-center relative">
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <span className="text-4xl relative z-10">🎨</span>
                  </div>
                  <div className="p-4">
                    <p className="text-white/20 text-sm text-center">Design {i} — Ajoutez via le dashboard</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {designs.map((d, i) => (
              <motion.div key={d.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <TiltCard className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden">
                  <div className="relative overflow-hidden">
                    {d.imageUrl ? (
                      <>
                        <img src={d.imageUrl} alt={d.title} className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-2xl">
                          <a href={d.imageUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20">
                            <MdOpenInNew size={20} />
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-primary-light/5 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm">{d.title}</h3>
                    {d.description && <p className="text-white/30 text-xs mt-1 line-clamp-2">{d.description}</p>}
                    {d.category && (
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${catColors[d.category] || "bg-white/10 text-white/50"}`}>
                        {d.category}
                      </span>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
