import { motion } from "framer-motion";
import { MdVerified, MdCode, MdRocketLaunch } from "react-icons/md";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stats = [
  { value: "5+", label: "Projets réalisés" },
  { value: "MERN", label: "Stack certifiée" },
  { value: "100%", label: "Passion & dévouement" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-primary right-0 top-1/2 -translate-y-1/2" style={{ opacity: 0.08 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <p className="section-subtitle">À propos</p>
          <h2 className="section-title">Qui suis-je ?</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Avatar card */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Cercle décoratif */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-violet blur-2xl opacity-20 scale-110" />
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-dark-card border border-dark-border overflow-hidden shadow-violet-lg">
                {/* Photo certificat */}
                <img
                  src="/certificat.png"
                  alt="Certificat MERN — Armel Dehe"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-dark-card border border-primary/30 rounded-2xl px-4 py-3 shadow-violet"
              >
                <div className="flex items-center gap-2">
                  <MdVerified className="text-primary-light" size={18} />
                  <span className="text-white text-xs font-semibold">Certifié MERN</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Développeur passionné, 
              <span className="gradient-text"> créateur de solutions</span>
            </h3>
            <p className="text-white/50 text-base leading-relaxed">
              Je suis <strong className="text-white/80">Armel Quepin Dehe</strong>, développeur Fullstack MERN 
              passionné par la création d'applications web modernes et performantes. 
              Certifié sur la stack MERN, je maîtrise l'ensemble du cycle de développement, 
              du backend avec Node.js/MongoDB jusqu'au frontend avec React.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Je combine mes compétences techniques avec un sens aigu du design pour créer des 
              produits qui impressionnent autant qu'ils fonctionnent. Chaque projet est une 
              opportunité de repousser les limites du possible.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: MdCode,         text: "Stack MERN complète : React, Node.js, Express, MongoDB" },
                { icon: MdRocketLaunch, text: "Applications performantes & production-ready" },
                { icon: MdVerified,     text: "Certification & expertise Fullstack confirmée" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-primary-light" />
                  </div>
                  <p className="text-white/60 text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center bg-dark-card border border-dark-border rounded-xl p-4">
                  <p className="text-2xl font-black gradient-text">{value}</p>
                  <p className="text-white/40 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
