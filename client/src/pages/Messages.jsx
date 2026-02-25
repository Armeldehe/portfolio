// ============================
// Messages.jsx - Lecture des messages de contact
// ============================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPerson, MdSubject, MdMessage, MdSchedule } from "react-icons/md";
import api from "../services/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try { const { data } = await api.get("/messages"); setMessages(data.data); } catch {}
    };
    fetch();
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Messages</h1>
        <p className="text-text-secondary text-sm mt-1">{messages.length} message(s) reçu(s)</p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <MdEmail size={48} className="mx-auto mb-3 opacity-30" />
          <p>Aucun message reçu pour l'instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste */}
          <div className="lg:col-span-1 space-y-3">
            {messages.map((m, i) => (
              <motion.div key={m._id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(m)}
                className={`card cursor-pointer transition-all ${selected?._id === m._id ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-violet flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{m.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary text-sm truncate">{m.name}</p>
                    <p className="text-text-muted text-xs truncate">{m.email}</p>
                    {m.subject && <p className="text-text-secondary text-xs mt-1 truncate">{m.subject}</p>}
                  </div>
                  <p className="text-text-muted text-xs shrink-0">{formatDate(m.createdAt).split(" ")[0]}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Détail du message sélectionné */}
          <div className="lg:col-span-2">
            {selected ? (
              <motion.div key={selected._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card h-full">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-dark-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-violet flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{selected.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{selected.name}</p>
                    <p className="text-text-muted text-sm">{selected.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {selected.subject && (
                    <div className="flex items-start gap-3">
                      <MdSubject size={18} className="text-primary-light mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-text-muted mb-0.5">Sujet</p>
                        <p className="text-text-primary font-medium">{selected.subject}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MdMessage size={18} className="text-primary-light mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Message</p>
                      <p className="text-text-primary leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-dark-border">
                    <MdSchedule size={16} className="text-text-muted" />
                    <p className="text-text-muted text-sm">{formatDate(selected.createdAt)}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="card h-48 flex items-center justify-center text-text-muted">
                <div className="text-center">
                  <MdEmail size={36} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Sélectionnez un message</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
