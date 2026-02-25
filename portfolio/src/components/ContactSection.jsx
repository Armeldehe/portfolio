import { useState } from "react";
import { motion } from "framer-motion";
import { MdMail, MdPerson, MdMessage, MdSend, MdCheckCircle } from "react-icons/md";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ContactSection() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/messages", form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi. Réessayez.");
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-primary bottom-0 left-1/2 -translate-x-1/2" style={{ opacity: 0.08 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <p className="section-subtitle">Contact</p>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Un projet en tête ? Une question ? N'hésitez pas à me contacter, je réponds sous 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info colonne */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card p-6 space-y-5">
              {[
                { icon: MdMail,    label: "Email",    value: "armel@exemple.com" },
                { icon: MdPerson,  label: "Statut",   value: "Disponible pour projets" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <p className="text-white/50 text-sm leading-relaxed">
                "Je suis passionné par la création de produits numériques qui combinent 
                <span className="text-white/80"> design premium</span> et 
                <span className="text-white/80"> performance technique</span>."
              </p>
              <p className="text-primary-light text-xs font-semibold mt-3">— Armel Dehe</p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 text-center"
              >
                <MdCheckCircle size={56} className="text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-white/40 text-sm">Je vous répondrai dans les 24 heures.</p>
                <button onClick={() => setSent(false)}
                  className="btn-outline mt-6 mx-auto">Envoyer un autre message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs mb-2 block">Nom *</label>
                    <div className="relative">
                      <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                      <input className="input-field pl-10" required value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Votre nom" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-xs mb-2 block">Email *</label>
                    <div className="relative">
                      <MdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                      <input type="email" className="input-field pl-10" required value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="votre@email.com" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-2 block">Sujet</label>
                  <input className="input-field" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="De quoi s'agit-il ?" />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-2 block">Message *</label>
                  <div className="relative">
                    <MdMessage className="absolute left-4 top-4 text-white/30" size={16} />
                    <textarea required className="input-field pl-10 h-36 resize-none" value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Décrivez votre projet ou votre demande..." />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
                )}

                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center py-4">
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><MdSend size={18} /> Envoyer le message</>
                  }
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
