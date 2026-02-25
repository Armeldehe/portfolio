import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-2">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <MdArrowBack size={16} /> Retour à l'accueil
          </Link>
        </motion.div>
      </div>
      <ContactSection />
      <Footer />
    </>
  );
}
