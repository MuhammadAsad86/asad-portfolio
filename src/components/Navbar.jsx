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
  const active = useActiveSection(links.map((link) => link.id));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
      initial={{
        y: -24,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={`fixed left-0 right-0 top-0 z-40 py-3 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <nav
        className="section-container surface-nav flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-300"
        aria-label="Primary"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Go to top"
        >
          <span className="text-primary">&lt;</span>
          Asad
          <span className="text-secondary">/&gt;</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 font-mono text-[13px] lg:flex">
          {links.map((link) => (
            <li
              key={link.id}
              className="relative"
            >
              <button
                onClick={() => scrollTo(link.id)}
                aria-current={
                  active === link.id ? "true" : undefined
                }
                className={`relative z-10 rounded-lg px-4 py-2 transition-colors ${
                  active === link.id
                    ? "text-primary"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
              </button>

              {active === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:border-primary/60"
          >
            {theme === "dark" ? (
              <FiSun size={16} />
            ) : (
              <FiMoon size={16} />
            )}
          </button>

          {/* Hire Me */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden rounded-lg px-4 py-2 font-mono text-[13px] font-semibold text-white md:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #4F8CFF, #22D3EE)",
            }}
          >
            Hire Me
          </button>

          {/* Mobile Menu Button */}
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <FiX size={18} />
            ) : (
              <FiMenu size={18} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="section-container overflow-hidden lg:hidden"
          >
            <ul className="surface-nav mt-2 flex flex-col gap-1 rounded-2xl p-3 font-mono text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    aria-current={
                      active === link.id
                        ? "true"
                        : undefined
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
                      active === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-white/5 hover:text-text"
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