import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useActiveSection } from "../hooks/useActiveSection";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(links.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 py-3 transition-all duration-300"
    >
      <nav
        className="section-container surface-nav flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-300"
        aria-label="Primary"
      >
        <button
          onClick={() => scrollTo("home")}
          className="font-display font-bold text-lg tracking-tight"
          aria-label="Go to top"
        >
          <span className="text-primary">&lt;</span>Asad<span className="text-secondary">/&gt;</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1 font-mono text-[13px]">
          {links.map((link) => (
            <li key={link.id} className="relative">
              <button
                onClick={() => scrollTo(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative z-10 px-4 py-2 rounded-lg transition-colors ${active === link.id ? "text-primary" : "text-muted hover:text-text"
                  }`}
              >
                {link.label}
              </button>
              {active === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full grid place-items-center border border-white/10 hover:border-primary/60 transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex font-mono text-[13px] px-4 py-2 rounded-lg text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
          >
            Hire Me
          </button>
          <button
            className="lg:hidden w-9 h-9 rounded-full grid place-items-center border border-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden section-container overflow-hidden"
          >
            <ul className="surface-nav mt-2 rounded-2xl flex flex-col p-3 gap-1 font-mono text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      console.log("Clicked:", link.id);
                      scrollTo(link.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${active === link.id ? "text-primary bg-primary/10" : "text-muted"
                      }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
