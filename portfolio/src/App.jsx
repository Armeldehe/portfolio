import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import AIChat from "./components/AIChat";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader plein écran */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* App principale - visible après loader */}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contact"      element={<Contact />} />
          </Routes>
        </Router>

        {/* Assistant IA — widget flottant global */}
        <AIChat />
      </div>
    </>
  );
}

export default App;

