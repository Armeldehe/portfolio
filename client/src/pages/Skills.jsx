// ============================
// Skills.jsx - Gestion des compétences techniques
// ============================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdDelete, MdClose, MdCode } from "react-icons/md";
import api from "../services/api";

const levels   = ["Beginner", "Intermediate", "Advanced", "Expert"];
const cats     = ["Frontend", "Backend", "Database", "Tools", "Design"];

const levelColors = {
  Beginner:     "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Advanced:     "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Expert:       "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const catColors = {
  Frontend: "text-violet-400", Backend: "text-blue-400",
  Database: "text-emerald-400", Tools: "text-amber-400", Design: "text-rose-400",
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState({ name: "", level: "Intermediate", category: "Frontend", icon: "" });
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try { const { data } = await api.get("/skills"); setSkills(data.data); } catch {}
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post("/skills", form);
      fetchSkills();
      setModal(false);
      setForm({ name: "", level: "Intermediate", category: "Frontend", icon: "" });
    } catch (err) { alert(err.response?.data?.message || "Erreur"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette compétence ?")) return;
    try { await api.delete(`/skills/${id}`); fetchSkills(); } catch {}
  };

  // Grouper par catégorie
  const grouped = cats.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Compétences</h1>
          <p className="text-text-secondary text-sm mt-1">{skills.length} compétence(s) au total</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => setModal(true)} className="btn-primary">
          <MdAdd size={20} /> Ajouter
        </motion.button>
      </div>

      {/* Groupé par catégorie */}
      {cats.map(cat => grouped[cat].length > 0 && (
        <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`text-base font-semibold mb-3 ${catColors[cat] || "text-text-secondary"}`}>{cat}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {grouped[cat].map(s => (
              <motion.div key={s._id} layout className="card hover:border-primary/40 group relative">
                <button onClick={() => handleDelete(s._id)}
                  className="absolute top-2 right-2 p-1 rounded-lg opacity-0 group-hover:opacity-100
                             text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <MdDelete size={14} />
                </button>
                {s.icon && <p className="text-2xl mb-2">{s.icon}</p>}
                <p className="font-semibold text-text-primary text-sm truncate">{s.name}</p>
                <span className={`badge mt-2 border text-xs ${levelColors[s.level] || "bg-dark-muted text-text-muted"}`}>
                  {s.level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <MdCode size={48} className="mx-auto mb-3 opacity-30" />
          <p>Aucune compétence ajoutée pour l'instant.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <h2 className="text-xl font-bold text-text-primary">Nouvelle compétence</h2>
                <button onClick={() => setModal(false)} className="text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-dark-muted transition-colors">
                  <MdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Nom *</label>
                  <input className="input-field" required value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="React, Node.js..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Niveau</label>
                    <select className="input-field" value={form.level}
                      onChange={(e) => setForm(f => ({ ...f, level: e.target.value }))}>
                      {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Catégorie</label>
                    <select className="input-field" value={form.category}
                      onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                      {cats.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Icône (emoji)</label>
                  <input className="input-field" value={form.icon}
                    onChange={(e) => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="⚛️ 🟢 🛢️..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1">Annuler</button>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="btn-primary flex-1 justify-center">
                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Ajouter"}
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
