// ============================
// Designs.jsx - Galerie designs Canva
// Stockage localStorage, galerie masonry premium
// ============================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdDelete, MdPalette, MdClose, MdOpenInNew } from "react-icons/md";

const STORAGE_KEY = "adminDesigns";
const CATS        = ["Poster", "Banner", "Social Media"];
const emptyDesign = { id: "", title: "", description: "", imageUrl: "", category: "Poster" };

const catColors = {
  Poster:       "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Banner:       "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Social Media": "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export default function Designs() {
  const [designs, setDesigns] = useState([]);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState(emptyDesign);
  const [filter,  setFilter]  = useState("Tous");

  useEffect(() => {
    setDesigns(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  }, []);

  const save = (updated) => {
    setDesigns(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save([...designs, { ...form, id: Date.now().toString() }]);
    setModal(false);
    setForm(emptyDesign);
  };

  const handleDelete = (id) => {
    if (!confirm("Supprimer ce design ?")) return;
    save(designs.filter(d => d.id !== id));
  };

  const filtered = filter === "Tous" ? designs : designs.filter(d => d.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Designs Canva</h1>
          <p className="text-text-secondary text-sm mt-1">{designs.length} design(s) au total</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => setModal(true)} className="btn-primary">
          <MdAdd size={20} /> Ajouter un design
        </motion.button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {["Tous", ...CATS].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border
              ${filter === cat
                ? "bg-primary/15 text-primary-light border-primary/30"
                : "text-text-secondary border-dark-border hover:border-primary/30 hover:text-text-primary"
              }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Galerie grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {filtered.map(d => (
            <motion.div key={d.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card break-inside-avoid group"
            >
              {d.imageUrl ? (
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <img src={d.imageUrl} alt={d.title} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <a href={d.imageUrl} target="_blank" rel="noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                      <MdOpenInNew size={20} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-36 rounded-xl bg-dark-muted flex items-center justify-center mb-3">
                  <MdPalette size={36} className="text-text-muted opacity-30" />
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-text-primary truncate">{d.title}</h3>
                  {d.description && <p className="text-text-secondary text-xs mt-0.5 line-clamp-2">{d.description}</p>}
                  <span className={`badge mt-2 border text-xs ${catColors[d.category] || "bg-dark-muted text-text-muted"}`}>
                    {d.category}
                  </span>
                </div>
                <button onClick={() => handleDelete(d.id)}
                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 opacity-0 group-hover:opacity-100">
                  <MdDelete size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <MdPalette size={48} className="mx-auto mb-3 opacity-30" />
          <p>Aucun design dans cette catégorie.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box max-w-lg">
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <h2 className="text-xl font-bold text-text-primary">Nouveau design Canva</h2>
                <button onClick={() => setModal(false)} className="text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-dark-muted">
                  <MdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Titre *</label>
                  <input className="input-field" required value={form.title}
                    onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nom du design" />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input className="input-field" value={form.imageUrl}
                    onChange={(e) => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
                </div>
                <div>
                  <label className="label">Catégorie</label>
                  <select className="input-field" value={form.category}
                    onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea className="input-field h-20 resize-none" value={form.description}
                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1">Annuler</button>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-primary flex-1 justify-center">Ajouter</motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
