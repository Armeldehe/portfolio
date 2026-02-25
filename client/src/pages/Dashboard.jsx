// ============================
// Dashboard.jsx - Vue principale avec statistiques
// ============================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdWork, MdCode, MdEmail, MdVideoLibrary, MdPalette, MdTrendingUp } from "react-icons/md";
import api from "../services/api";

const statCards = [
  { key: "projects",  label: "Projets",          color: "from-violet-600 to-purple-500",  icon: MdWork,        bg: "bg-violet-500/10",  border: "border-violet-500/20" },
  { key: "skills",    label: "Compétences",       color: "from-blue-600 to-cyan-500",      icon: MdCode,        bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  { key: "messages",  label: "Messages",          color: "from-emerald-600 to-teal-500",   icon: MdEmail,       bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { key: "videos",    label: "Vidéos CapCut",     color: "from-rose-600 to-pink-500",      icon: MdVideoLibrary,bg: "bg-rose-500/10",    border: "border-rose-500/20" },
  { key: "designs",   label: "Designs Canva",     color: "from-amber-500 to-orange-400",   icon: MdPalette,     bg: "bg-amber-500/10",   border: "border-amber-500/20" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Dashboard() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, messages: 0, videos: 0, designs: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [proj, skill, msg] = await Promise.all([
          api.get("/projects"),
          api.get("/skills"),
          api.get("/messages"),
        ]);
        const videosRaw = JSON.parse(localStorage.getItem("adminVideos") || "[]");
        const designsRaw = JSON.parse(localStorage.getItem("adminDesigns") || "[]");
        setCounts({
          projects: proj.data.count || 0,
          skills: skill.data.count || 0,
          messages: msg.data.count || 0,
          videos: videosRaw.length,
          designs: designsRaw.length,
        });
      } catch {}
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-text-secondary mt-1">Bienvenue sur votre espace de gestion, Armel 👋</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        {statCards.map(({ key, label, color, icon: Icon, bg, border }) => (
          <motion.div key={key} variants={cardVariants}>
            <div className={`card ${bg} ${border} group hover:scale-[1.03] transition-transform cursor-default`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon size={22} className="text-white" />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{counts[key]}</p>
              <p className="text-text-secondary text-sm font-medium">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card border-primary/20 bg-primary/5"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-violet flex items-center justify-center shadow-violet shrink-0">
            <MdTrendingUp size={20} className="text-white" />
          </div>
          <div>
            <p className="text-text-primary font-semibold">Portfolio actif 🚀</p>
            <p className="text-text-secondary text-sm">
              Backend connecté sur{" "}
              <span className="text-primary-light font-medium">http://localhost:5000</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
