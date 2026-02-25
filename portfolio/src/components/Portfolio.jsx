import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdArrowForward, MdCode, MdOpenInNew, MdStar } from "react-icons/md";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }),
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [hovered,  setHovered]  = useState(null);

  useEffect(() => {
    api.get("/projects").then(({ data }) => setProjects(data.data?.slice(0,6)||[])).catch(()=>{});
  }, []);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-primary-light right-1/4 bottom-0" style={{ opacity: 0.06 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="section-subtitle">Portfolio</p>
          <h2 className="section-title">Mes projets récents</h2>
          <p className="text-white/40 max-w-lg text-sm">Des applications pensées pour l'utilisateur, construites pour durer.</p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-20 text-white/20">
            <MdCode size={48} className="mx-auto mb-3" />
            <p>Les projets seront affichés dès qu'ils sont ajoutés depuis le dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(p._id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link to={`/projects/${p._id}`}
                  className="block rounded-2xl overflow-hidden bg-dark-card border border-dark-border group relative"
                  style={{
                    boxShadow: hovered === p._id ? "0 20px 60px rgba(124,58,237,0.35)" : "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "box-shadow 0.4s ease, border-color 0.3s ease",
                    borderColor: hovered === p._id ? "rgba(124,58,237,0.4)" : "",
                  }}
                >
                  {/* Image avec overlay violet au hover */}
                  <div className="relative h-52 overflow-hidden bg-dark-muted">
                    {p.image
                      ? <img src={p.image} alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700"
                          style={{ transform: hovered === p._id ? "scale(1.12)" : "scale(1)" }} />
                      : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/10 flex items-center justify-center">
                          <MdCode size={48} className="text-primary-light/30" />
                        </div>
                    }

                    {/* Overlay violet hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hovered === p._id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: hovered === p._id ? 1 : 0, scale: hovered === p._id ? 1 : 0.8 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="flex gap-3"
                      >
                        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                          <MdOpenInNew size={20} />
                        </div>
                      </motion.div>
                    </motion.div>

                    {p.featured && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary-light text-xs font-medium">
                        <MdStar size={12} /> Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-light transition-colors">{p.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2 mb-4">{p.description}</p>
                    {p.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.technologies.slice(0,4).map(t => (
                          <span key={t} className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary-light text-xs">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-white/5">
                      <span className="text-white/30 text-xs">Voir le projet</span>
                      <motion.div
                        animate={{ x: hovered === p._id ? 4 : 0, opacity: hovered === p._id ? 1 : 0.3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdArrowForward className="text-primary-light" size={18} />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/projects" className="btn-outline inline-flex">
              Voir tous les projets <MdArrowForward size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
