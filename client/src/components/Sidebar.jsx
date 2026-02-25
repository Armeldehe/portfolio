// ============================
// Sidebar.jsx - Navigation latérale
// Design noir premium avec hover violet
// ============================

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdWork,
  MdCode,
  MdEmail,
  MdVideoLibrary,
  MdPalette,
  MdLogout,
} from "react-icons/md";

const navItems = [
  { path: "/dashboard", icon: MdDashboard, label: "Dashboard" },
  { path: "/projects",  icon: MdWork,        label: "Projects" },
  { path: "/skills",    icon: MdCode,         label: "Skills" },
  { path: "/messages",  icon: MdEmail,        label: "Messages" },
  { path: "/videos",    icon: MdVideoLibrary, label: "Vidéos CapCut" },
  { path: "/designs",   icon: MdPalette,      label: "Designs Canva" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-64 bg-dark-card border-r border-dark-border flex flex-col h-full shrink-0"
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-violet flex items-center justify-center shadow-violet">
            <span className="text-white font-bold text-base">A</span>
          </div>
          <div>
            <p className="text-text-primary font-semibold text-sm leading-tight">Armel Dehe</p>
            <p className="text-primary-light text-xs">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
              ${isActive
                ? "bg-primary/15 text-primary-light border border-primary/30 shadow-violet"
                : "text-text-secondary hover:bg-dark-border hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  className={`transition-colors ${isActive ? "text-primary-light" : "text-text-muted group-hover:text-primary-light"}`}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                     text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <MdLogout size={20} className="text-text-muted group-hover:text-red-400 transition-colors" />
          Déconnexion
        </button>
      </div>
    </motion.aside>
  );
}
