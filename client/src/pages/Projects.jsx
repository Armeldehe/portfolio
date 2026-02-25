// ============================
// Projects.jsx - Gestion des projets CRUD
// ============================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdDelete, MdEdit, MdLink, MdClose, MdStar, MdCode, MdWork } from "react-icons/md";
import api from "../services/api";

const emptyProject = {
  title: "", description: "", image: "", technologies: [],
  githubLink: "", liveLink: "", videoDemo: "", featured: false,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try { const { data } = await api.get("/projects"); setProjects(data.data); } catch {}
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => { setForm(emptyProject); setEditing(null); setModal(true); };
  const openEdit   = (p)  => { setForm(p); setEditing(p._id); setModal(true); };
  const closeModal = ()   => { setModal(false); setTechInput(""); };

  const addTech = () => {
    if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
      setForm(f => ({ ...f, technologies: [...f.technologies, techInput.trim()] }));
    }
    setTechInput("");
  };

  const removeTech = (t) => setForm(f => ({ ...f, technologies: f.technologies.filter(x => x !== t) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) await api.put(`/projects/${editing}`, form);
      else         await api.post("/projects", form);
      fetchProjects();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    try { await api.delete(`/projects/${id}`); fetchProjects(); } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Projets</h1>
          <p className="text-text-secondary text-sm mt-1">{projects.length} projet(s) au total</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={openCreate} className="btn-primary">
          <MdAdd size={20} /> Nouveau projet
        </motion.button>
      </div>

      {/* Grid de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div key={p._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card group"
            >
              {/* Image */}
              {p.image && (
                <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-dark-muted">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  {p.featured && (
                    <span className="absolute top-2 right-2 badge bg-primary/20 text-primary-light border border-primary/30">
                      <MdStar size={12} className="mr-1" /> Featured
                    </span>
                  )}
                </div>
              )}
              <h3 className="font-bold text-text-primary text-lg mb-1 truncate">{p.title}</h3>
              <p className="text-text-secondary text-sm line-clamp-2 mb-3">{p.description}</p>

              {/* Technologies */}
              {p.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.technologies.slice(0, 4).map(t => (
                    <span key={t} className="badge bg-dark-muted text-text-secondary border border-dark-border">
                      {t}
                    </span>
                  ))}
                  {p.technologies.length > 4 && (
                    <span className="badge bg-dark-muted text-text-muted border border-dark-border">
                      +{p.technologies.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-dark-border">
                {p.liveLink && (
                  <a href={p.liveLink} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-primary-light hover:text-primary transition-colors">
                    <MdLink size={14} /> Live
                  </a>
                )}
                {p.githubLink && (
                  <a href={p.githubLink} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors">
                    <MdCode size={14} /> GitHub
                  </a>
                )}
                <div className="ml-auto flex gap-2">
                  <button onClick={() => openEdit(p)}
                    className="p-2 rounded-lg bg-dark-muted hover:bg-primary/20 hover:text-primary-light text-text-muted transition-all">
                    <MdEdit size={16} />
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                    className="p-2 rounded-lg bg-dark-muted hover:bg-red-500/20 hover:text-red-400 text-text-muted transition-all">
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {projects.length === 0 && (
          <div className="col-span-full text-center py-20 text-text-muted">
            <MdWork size={48} className="mx-auto mb-3 opacity-30" />
            <p>Aucun projet. Cliquez sur "Nouveau projet" pour commencer.</p>
          </div>
        )}
      </div>

      {/* Modal Formulaire */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box">
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <h2 className="text-xl font-bold text-text-primary">
                  {editing ? "Modifier le projet" : "Nouveau projet"}
                </h2>
                <button onClick={closeModal} className="text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-dark-muted transition-colors">
                  <MdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Titre *</label>
                    <input className="input-field" required value={form.title}
                      onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Mon super projet" />
                  </div>
                  <div>
                    <label className="label">Image URL *</label>
                    <input className="input-field" required value={form.image}
                      onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="label">Description *</label>
                  <textarea className="input-field h-24 resize-none" required value={form.description}
                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description du projet..." />
                </div>
                {/* Technologies */}
                <div>
                  <label className="label">Technologies</label>
                  <div className="flex gap-2">
                    <input className="input-field" value={techInput} onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                      placeholder="React, Node.js..." />
                    <button type="button" onClick={addTech} className="btn-secondary px-4 shrink-0">Ajouter</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.technologies.map(t => (
                      <span key={t} className="badge bg-primary/15 text-primary-light border border-primary/30 cursor-pointer"
                        onClick={() => removeTech(t)}>
                        {t} <MdClose size={12} className="ml-1" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">GitHub Link</label>
                    <input className="input-field" value={form.githubLink}
                      onChange={(e) => setForm(f => ({ ...f, githubLink: e.target.value }))} placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="label">Live Link</label>
                    <input className="input-field" value={form.liveLink}
                      onChange={(e) => setForm(f => ({ ...f, liveLink: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="label">Video Demo URL</label>
                  <input className="input-field" value={form.videoDemo}
                    onChange={(e) => setForm(f => ({ ...f, videoDemo: e.target.value }))} placeholder="https://youtube.com/..." />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={form.featured}
                    onChange={(e) => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-primary" />
                  <label htmlFor="featured" className="text-sm text-text-secondary cursor-pointer">
                    Mettre en avant (Featured)
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="btn-secondary flex-1">Annuler</button>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-primary flex-1 justify-center">
                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (editing ? "Modifier" : "Créer")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
