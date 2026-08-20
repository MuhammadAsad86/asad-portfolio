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
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <motion.nav
        animate={{
          scale: scrolled ? 0.98 : 1,
          y: scrolled ? -1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        className="section-container surface-nav flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-300"
        aria-label="Primary"
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo("home")}
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Go to top"
          whileHover={{
            scale: 1.06,
            y: -1,
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <span className="text-primary">&lt;</span>
          Asad
          <span className="text-secondary">/&gt;</span>
        </motion.button>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 font-mono text-[13px] lg:flex">
          {links.map((link) => (
            <li key={link.id} className="relative">
              <motion.button
                onClick={() => scrollTo(link.id)}
                aria-current={
                  active === link.id ? "true" : undefined
                }
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                }}
                className={`relative z-10 rounded-lg px-4 py-2 transition-colors ${
                  active === link.id
                    ? "text-primary"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
              </motion.button>

              {active === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  initial={false}
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.7,
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{
              scale: 1.08,
              rotate: 12,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 18,
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:border-primary/60"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <FiSun size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <FiMoon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hire Me */}
          <motion.button
            onClick={() => scrollTo("contact")}
            whileHover={{
              y: -2,
              scale: 1.03,
              boxShadow: "0 12px 30px rgba(34, 211, 238, 0.25)",
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
            }}
            className="hidden rounded-lg px-4 py-2 font-mono text-[13px] font-semibold text-white md:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #4F8CFF, #22D3EE)",
            }}
          >
            Hire Me
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={open}
            whileTap={{
              scale: 0.9,
            }}
            animate={{
              rotate: open ? 90 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <FiX size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <FiMenu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="section-container overflow-hidden lg:hidden"
          >
            <ul className="surface-nav mt-2 flex flex-col gap-1 rounded-2xl p-3 font-mono text-sm">
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                >
                  <motion.button
                    onClick={() => scrollTo(link.id)}
                    aria-current={
                      active === link.id
                        ? "true"
                        : undefined
                    }
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
                      active === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-white/5 hover:text-text"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}