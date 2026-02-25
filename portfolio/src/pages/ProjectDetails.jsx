import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack, MdOpenInNew, MdCode, MdVideoLibrary } from "react-icons/md";
import api from "../services/api";
import Footer from "../components/Footer";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(({ data }) => setProject(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white/30">
      <MdCode size={48} className="mb-3" />
      <p>Projet introuvable</p>
      <Link to="/projects" className="btn-outline mt-6 text-sm">Retour aux projets</Link>
    </div>
  );

  return (
    <>
      <div className="min-h-screen pt-24 px-6 md:px-12 pb-24 max-w-5xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/projects" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <MdArrowBack size={16} /> Retour aux projets
          </Link>
        </motion.div>

        {/* Hero image */}
        {project.image && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden h-72 md:h-96 mb-10 shadow-violet-lg">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6">
            <div>
              <p className="section-subtitle">Projet</p>
              <h1 className="text-3xl md:text-4xl font-black text-white">{project.title}</h1>
            </div>
            <p className="text-white/50 leading-relaxed">{project.description}</p>

            {/* Tech Stack */}
            {project.technologies?.length > 0 && (
              <div>
                <h3 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Stack technique</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary-light text-sm font-medium">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Video demo */}
            {project.videoDemo && (
              <div>
                <h3 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Démo vidéo</h3>
                <a href={project.videoDemo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-primary-light hover:text-white transition-colors text-sm">
                  <MdVideoLibrary size={18} /> Voir la démonstration
                </a>
              </div>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            <div className="card p-6 space-y-4">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary flex">
                  <MdOpenInNew size={18} /> Voir le site live
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline flex justify-center">
                  <MdCode size={18} /> Code source
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
