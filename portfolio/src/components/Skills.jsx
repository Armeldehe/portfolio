import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const levelPercent = { Beginner: 25, Intermediate: 55, Advanced: 80, Expert: 95 };
const levelColor   = {
  Beginner: "from-slate-500 to-slate-400",
  Intermediate: "from-blue-600 to-blue-400",
  Advanced: "from-violet-600 to-violet-400",
  Expert: "from-emerald-600 to-emerald-400",
};

const categories = ["Frontend", "Backend", "Database", "Tools", "Design"];
const catIcons = { Frontend: "🎨", Backend: "⚙️", Database: "🗄️", Tools: "🛠️", Design: "✨" };

export default function Skills() {
  const [skills,  setSkills]  = useState([]);
  const [active,  setActive]  = useState("Frontend");

  useEffect(() => {
    api.get("/skills").then(({ data }) => setSkills(data.data)).catch(() => {});
  }, []);

  const filtered = skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-primary left-0 top-1/2 -translate-y-1/2" style={{ opacity: 0.07 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="section-subtitle">Compétences</p>
          <h2 className="section-title">Mon expertise technique</h2>
          <p className="text-white/40 max-w-lg text-sm">
            Maîtrise complète de la stack MERN et des outils modernes du développement web.
          </p>
        </motion.div>

        {/* Tabs catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                ${active === cat
                  ? "bg-primary text-white border-primary shadow-violet"
                  : "bg-dark-card text-white/50 border-dark-border hover:border-primary/40 hover:text-white"
                }`}
            >
              {catIcons[cat]} {cat}
            </button>
          ))}
        </motion.div>

        {/* Barres de compétence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.length > 0
            ? filtered.map((skill, i) => (
                <motion.div key={skill._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-dark-card border border-dark-border rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {skill.icon && <span className="text-xl">{skill.icon}</span>}
                      <span className="font-semibold text-white text-sm">{skill.name}</span>
                    </div>
                    <span className="text-xs text-white/40 font-medium">{skill.level}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${levelPercent[skill.level] || 50}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${levelColor[skill.level] || "from-primary to-primary-light"}`}
                    />
                  </div>
                </motion.div>
              ))
            : (
                // Fallback quand pas de données API
                <div className="col-span-2 text-center py-12 text-white/30 text-sm">
                  Ajoutez des compétences depuis le dashboard admin pour les voir ici.
                </div>
              )
          }
        </div>
      </div>
    </section>
  );
}
