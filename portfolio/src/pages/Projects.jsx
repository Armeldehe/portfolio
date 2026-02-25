import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdArrowBack, MdCode, MdFilterList, MdStar } from "react-icons/md";
import api from "../services/api";
import Footer from "../components/Footer";

const filters = ["Tous"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter]     = useState("Tous");
  const [allTechs, setAllTechs] = useState([]);

  useEffect(() => {
    api.get("/projects").then(({ data }) => {
      const projs = data.data || [];
      setProjects(projs);
      const techs = [...new Set(projs.flatMap(p => p.technologies || []))];
      setAllTechs(techs);
    }).catch(() => {});
  }, []);

  const filtered = filter === "Tous"
    ? projects
    : projects.filter(p => p.technologies?.includes(filter));

  return (
    <>
      <div className="min-h-screen pt-24 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
            <MdArrowBack size={16} /> Retour à l'accueil
          </Link>
          <p className="section-subtitle">Portfolio</p>
          <h1 className="section-title">Tous mes projets</h1>
          <p className="text-white/40 text-sm">{projects.length} projet(s) réalisé(s)</p>
        </motion.div>

        {/* Filtres tech */}
        {allTechs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10">
            {["Tous", ...allTechs].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all
                  ${filter === t
                    ? "bg-primary text-white border-primary"
                    : "bg-dark-card text-white/40 border-dark-border hover:border-primary/40 hover:text-white"}`}>
                {t}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grille */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20">
            <MdCode size={48} className="mx-auto mb-3" />
            <p>Aucun projet pour l'instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p._id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/projects/${p._id}`} className="card block group overflow-hidden">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl bg-dark-muted">
                    {p.image
                      ? <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/10 flex items-center justify-center">
                          <MdCode size={48} className="text-primary-light/30" />
                        </div>
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent" />
                    {p.featured && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary-light text-xs font-medium">
                        <MdStar size={12} /> Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white mb-2 group-hover:text-primary-light transition-colors">{p.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2 mb-4">{p.description}</p>
                    {p.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies.slice(0,5).map(t => (
                          <span key={t} className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-primary-light text-xs">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
