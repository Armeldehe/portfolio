// ============================
// App.jsx - Routeur principal de l'Admin Dashboard
// Inclut la protection des routes privées via JWT
// ============================

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Messages from "./pages/Messages";
import Videos from "./pages/Videos";
import Designs from "./pages/Designs";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// ─────────────────────────────────────────────
// PrivateRoute : redirige vers /login si pas authentifié
// ─────────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace />;
};

// ─────────────────────────────────────────────
// Layout : Sidebar + Navbar + contenu
// ─────────────────────────────────────────────
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publique : Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Redirect de la racine vers dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Routes protégées : nécessitent un token JWT */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout><Dashboard /></AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <AdminLayout><Projects /></AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/skills"
          element={
            <PrivateRoute>
              <AdminLayout><Skills /></AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <AdminLayout><Messages /></AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <PrivateRoute>
              <AdminLayout><Videos /></AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/designs"
          element={
            <PrivateRoute>
              <AdminLayout><Designs /></AdminLayout>
            </PrivateRoute>
          }
        />

        {/* 404 - Redirige vers dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
