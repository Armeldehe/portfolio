// ============================
// Configuration du client API Axios
// Toutes les requêtes vers le backend passent par ici
// ============================

import axios from "axios";

// Instance Axios avec l'URL de base du backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────────────
// Intercepteur de requête : ajoute le token JWT automatiquement
// ─────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Intercepteur de réponse : redirige si token expiré (401)
// ─────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
