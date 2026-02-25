// ============================
// Videos.jsx - Gestion des vidéos CapCut
// Stockage localStorage (pas de modèle backend dédié)
// ============================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdDelete, MdVideoLibrary, MdClose, MdStar, MdPlayCircle } from "react-icons/md";

const STORAGE_KEY = "adminVideos";
const emptyVideo  = { id: "", title: "", description: "", videoUrl: "", thumbnail: "", featured: false };

export default function Videos() {
  const [videos,  setVideos]  = useState([]);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState(emptyVideo);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setVideos(saved);
  }, []);

  const save = (updated) => {
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = { ...form, id: Date.now().toString() };
    save([...videos, newVideo]);
    setModal(false);
    setForm(emptyVideo);
  };

  const handleDelete = (id) => {
    if (!confirm("Supprimer cette vidéo ?")) return;
    save(videos.filter(v => v.id !== id));
    if (playing === id) setPlaying(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Vidéos CapCut</h1>
          <p className="text-text-secondary text-sm mt-1">{videos.length} vidéo(s) de présentation</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => setModal(true)} className="btn-primary">
          <MdAdd size={20} /> Ajouter une vidéo
        </motion.button>
      </div>

      {/* Grille de vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {videos.map((v) => (
            <motion.div key={v.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card group">
              {/* Thumbnail / Player */}
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-dark-muted">
                {playing === v.id && v.videoUrl ? (
                  <video src={v.videoUrl} controls autoPlay className="w-full h-full object-cover" />
                ) : (
                  <>
                    {v.thumbnail
                      ? <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center bg-gradient-dark">
                          <MdVideoLibrary size={48} className="text-text-muted opacity-40" />
                        </div>
                    }
                    {v.videoUrl && (
                      <button onClick={() => setPlaying(v.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MdPlayCircle size={56} className="text-white drop-shadow-lg" />
                      </button>
                    )}
                  </>
                )}
                {v.featured && (
                  <span className="absolute top-2 left-2 badge bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <MdStar size={12} className="mr-1" /> Featured
                  </span>
                )}
              </div>

              <h3 className="font-bold text-text-primary mb-1 truncate">{v.title}</h3>
              {v.description && <p className="text-text-secondary text-sm line-clamp-2 mb-3">{v.description}</p>}

              <div className="flex justify-between items-center pt-2 border-t border-dark-border">
                {playing === v.id
                  ? <button onClick={() => setPlaying(null)} className="text-xs text-primary-light hover:text-primary">⏹ Arrêter</button>
                  : <span />
                }
                <button onClick={() => handleDelete(v.id)}
                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <MdDelete size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {videos.length === 0 && (
          <div className="col-span-full text-center py-20 text-text-muted">
            <MdVideoLibrary size={48} className="mx-auto mb-3 opacity-30" />
            <p>Aucune vidéo CapCut ajoutée.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box max-w-lg">
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <h2 className="text-xl font-bold text-text-primary">Nouvelle vidéo CapCut</h2>
                <button onClick={() => setModal(false)} className="text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-dark-muted">
                  <MdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Titre *</label>
                  <input className="input-field" required value={form.title}
                    onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre de la vidéo" />
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea className="input-field h-20 resize-none" value={form.description}
                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description..." />
                </div>
                <div>
                  <label className="label">URL Vidéo</label>
                  <input className="input-field" value={form.videoUrl}
                    onChange={(e) => setForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="https://..." />
                </div>
                <div>
                  <label className="label">Thumbnail URL</label>
                  <input className="input-field" value={form.thumbnail}
                    onChange={(e) => setForm(f => ({ ...f, thumbnail: e.target.value }))} placeholder="https://..." />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="vfeatured" checked={form.featured}
                    onChange={(e) => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-primary" />
                  <label htmlFor="vfeatured" className="text-sm text-text-secondary cursor-pointer">Mettre en avant</label>
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
