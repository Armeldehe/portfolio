import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const socials = [
  { href: "https://github.com",    icon: FaGithub,   label: "GitHub" },
  { href: "https://linkedin.com",  icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://wa.me/",        icon: FaWhatsapp, label: "WhatsApp" },
];

const footerLinks = [
  { href: "/#about",   label: "À propos" },
  { href: "/#skills",  label: "Skills" },
  { href: "/projects", label: "Projets" },
  { href: "/#video",   label: "Vidéo" },
  { href: "/#designs", label: "Designs" },
  { href: "/contact",  label: "Contact" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/5 py-12 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-violet flex items-center justify-center shadow-violet">
                <span className="text-white font-black text-sm">AD</span>
              </div>
              <span className="font-bold text-white text-base">
                Armel<span className="text-primary-light">.</span>dev
              </span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed">
              Développeur Fullstack MERN passionné, je crée des applications web modernes et performantes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-white/30 text-sm hover:text-primary-light transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Réseaux</h4>
            <div className="flex gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="p-3 rounded-xl bg-dark-card border border-dark-border text-white/40 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-white/20 text-xs mt-4">Disponible pour des opportunités freelance</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Armel Quepin Dehe · Tous droits réservés
          </p>
          <p className="text-white/10 text-xs">
            Conçu & développé avec ❤️ par Armel Dehe
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
