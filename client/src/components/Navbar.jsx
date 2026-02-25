// ============================
// Navbar.jsx - Barre supérieure du dashboard
// ============================

import { motion } from "framer-motion";
import { MdNotifications, MdAdminPanelSettings } from "react-icons/md";

export default function Navbar() {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-16 bg-dark-card border-b border-dark-border px-6 flex items-center justify-between shrink-0"
    >
      {/* Titre */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-text-secondary text-sm font-medium">
          Portfolio <span className="text-primary-light">/</span> Admin
        </span>
      </div>

      {/* Profil */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-dark-border transition-colors text-text-secondary hover:text-primary-light">
          <MdNotifications size={20} />
        </button>

        <div className="flex items-center gap-3 bg-dark-border px-4 py-2 rounded-xl border border-dark-border">
          <div className="w-7 h-7 rounded-lg bg-gradient-violet flex items-center justify-center">
            <MdAdminPanelSettings size={16} className="text-white" />
          </div>
          <div>
            <p className="text-text-primary text-xs font-semibold leading-tight">
              {adminInfo.name || "Admin"}
            </p>
            <p className="text-text-muted text-xs">{adminInfo.email || ""}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
