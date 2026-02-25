import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import VideoPresentation from "../components/VideoPresentation";
import CanvaDesigns from "../components/CanvaDesigns";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  return (
    <main className="relative">
      {/* Particules flottantes - portée globale sur toutes les sections */}
      <ParticlesBackground />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <VideoPresentation />
        <CanvaDesigns />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
