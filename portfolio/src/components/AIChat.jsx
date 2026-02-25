import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdSend, MdSmartToy, MdPerson } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import axios from "axios";

// ─── Configuration ─────────────────────────────────────────────────────────
const API_URL = "http://localhost:5000/api/ai/chat";

const SUGGESTIONS = [
  { label: "🚀 Mes projets",     message: "Quels projets avez-vous réalisés ?" },
  { label: "⚡ Mes compétences", message: "Quelles technologies maîtrisez-vous ?" },
  { label: "📅 Disponibilité",   message: "Êtes-vous disponible pour du freelance ?" },
  { label: "📩 Contact",         message: "Comment vous contacter ?" },
];

const WELCOME = {
  role: "assistant",
  content: "👋 Bonjour ! Je suis l'assistant IA d'**Armel Dehe**, développeur Fullstack MERN.\n\nPosez-moi n'importe quelle question sur ses compétences, projets ou disponibilité !",
  id: "welcome",
};

// ─── Composant dot typing ───────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          className="w-1.5 h-1.5 rounded-full bg-primary-light block"
        />
      ))}
    </div>
  );
}

// ─── Rendu du message (Markdown minimal) ───────────────────────────────────
function MessageText({ content }) {
  const html = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Widget principal ───────────────────────────────────────────────────────
export default function AIChat() {
  const [open,    setOpen]    = useState(false);
  const [mode,    setMode]    = useState(null); // null | "Recruteur" | "Client"
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([WELCOME]);
  const [hasNew,  setHasNew]  = useState(true);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  // Focus input quand ouvert
  useEffect(() => {
    if (open) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  const sendMessage = async (text = input) => {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput("");

    const userMsg = { role: "user", content: msg, id: Date.now() };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setLoading(true);

    try {
      const contextHistory = newHistory
        .filter(m => m.id !== "welcome")
        .map(m => ({ role: m.role, content: m.content }));

      // Ajouter le mode dans le message si défini
      const enhancedMsg = mode ? `[Mode: ${mode}] ${msg}` : msg;

      const { data } = await axios.post(API_URL, {
        message: enhancedMsg,
        history: contextHistory.slice(0, -1),
      });

      setHistory(prev => [...prev, {
        role: "assistant", content: data.reply, id: Date.now() + 1,
      }]);
    } catch {
      setHistory(prev => [...prev, {
        role: "assistant",
        content: "Désolé, une erreur est survenue. Contactez directement Armel via le formulaire de contact !",
        id: Date.now() + 1, error: true,
      }]);
    } finally { setLoading(false); }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const selectMode = (m) => {
    setMode(m);
    setHistory([WELCOME, {
      role: "assistant",
      content: m === "Recruteur"
        ? "🤝 Parfait ! En tant que **recruteur**, je peux vous informer sur les compétences d'Armel, ses expériences et sa disponibilité pour un poste. Que souhaitez-vous savoir ?"
        : "💼 Excellent ! En tant que **client**, je vais vous présenter les services d'Armel et comment il peut concrétiser votre projet. Par où voulez-vous commencer ?",
      id: Date.now(),
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Chat Panel ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="absolute bottom-16 right-0 w-[360px] sm:w-[400px] flex flex-col overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: "linear-gradient(145deg, #1A1A2E 0%, #0F0F1A 100%)",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.2), 0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.12)",
              maxHeight: "80vh",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5"
              style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))" }}>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                  <FaRobot size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0F0F1A]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Assistant d'Armel</p>
                <p className="text-white/40 text-xs">Répond en quelques secondes · IA</p>
              </div>

              {/* Mode selector */}
              <div className="flex gap-1">
                {["Recruteur", "Client"].map(m => (
                  <button key={m} onClick={() => selectMode(m)}
                    className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-200"
                    style={{
                      background:   mode === m ? "rgba(124,58,237,0.3)" : "transparent",
                      borderColor:  mode === m ? "rgba(124,58,237,0.7)" : "rgba(255,255,255,0.1)",
                      color:        mode === m ? "#A78BFA" : "rgba(255,255,255,0.35)",
                    }}>
                    {m}
                  </button>
                ))}
              </div>

              <button onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all">
                <MdClose size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "320px" }}>
              {history.map((msg) => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-white/10"
                      : "bg-gradient-to-br from-primary to-primary-light shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  }`}>
                    {msg.role === "user"
                      ? <MdPerson size={14} className="text-white/60" />
                      : <FaRobot size={12} className="text-white" />
                    }
                  </div>

                  {/* Bubble */}
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: msg.role === "user"
                        ? "rgba(124,58,237,0.25)"
                        : "rgba(255,255,255,0.05)",
                      borderRadius: msg.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                      border: msg.role === "user"
                        ? "1px solid rgba(124,58,237,0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <MessageText content={msg.content} />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                    <FaRobot size={12} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/6 rounded-2xl rounded-tl-sm px-4 py-2.5">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {history.length <= 2 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button key={s.label} onClick={() => sendMessage(s.message)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200">
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-end gap-2 bg-white/[0.04] border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-all duration-200">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, 500))}
                  onKeyDown={handleKey}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-transparent text-white/80 text-sm placeholder-white/25 resize-none outline-none leading-relaxed"
                  style={{ maxHeight: "80px", minHeight: "20px" }}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{
                    background: input.trim() && !loading
                      ? "linear-gradient(135deg, #7C3AED, #A78BFA)"
                      : "rgba(255,255,255,0.05)",
                    boxShadow: input.trim() && !loading ? "0 0 16px rgba(124,58,237,0.5)" : "none",
                  }}
                >
                  <MdSend size={15} className={input.trim() && !loading ? "text-white" : "text-white/20"} />
                </motion.button>
              </div>
              <p className="text-white/15 text-[10px] text-center mt-1.5">Assistant IA d'Armel Dehe · Powered by OpenAI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ─────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
          boxShadow: open
            ? "0 0 30px rgba(124,58,237,0.7), 0 8px 30px rgba(0,0,0,0.5)"
            : "0 0 20px rgba(124,58,237,0.5), 0 8px 25px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MdClose size={24} className="text-white" />
              </motion.div>
            : <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FaRobot size={22} className="text-white" />
              </motion.div>
          }
        </AnimatePresence>

        {/* Badge notification */}
        {hasNew && !open && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
          >1</motion.span>
        )}

        {/* Ping */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-primary pointer-events-none"
          />
        )}
      </motion.button>
    </div>
  );
}
