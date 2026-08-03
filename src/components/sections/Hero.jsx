import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import ParticleBackground from "../ui/ParticleBackground";

const roles = [
  "MERN Stack Developer",
  "React.js Engineer",
  "Node.js & Express Developer",
  "BS IT Student, Class of 2027",
];

const socials = [
  { icon: FiGithub, href: "https://github.com/MuhammadAsad86", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/muhammadasad86", label: "LinkedIn" },
  { icon: FiMail, href: "mailto:rootedasad@gmail.com", label: "Email" },
];

export default function Hero() {
  const typed = useTypingEffect(roles);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-20 overflow-hidden">
      {/* Animated gradient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.20] animated-gradient pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, #4F8CFF, #A855F7, #22D3EE, #4F8CFF)",
        }}
      />
      <ParticleBackground />

      {/* Floating blurred shapes — subtle ambient motion, not flashy */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full blur-3xl opacity-25 pointer-events-none float-shape"
        style={{ background: "radial-gradient(circle, #4F8CFF, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 pointer-events-none float-shape"
        style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)", animationDelay: "3s" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-[0.12] pointer-events-none float-shape"
        style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)", animationDelay: "1.5s" }}
      />

      <div className="section-container relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full surface-card mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Open to Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-tight"
          >
            Hi, I'm{" "}
            <span className="text-gradient">Muhammad Asad</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-mono text-[clamp(1.05rem,2.2vw,1.4rem)] text-muted mt-4 h-8"
          >
            {typed}
            <span className="typing-caret text-primary">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted text-[15.5px] leading-relaxed mt-6 max-w-xl"
          >
            BS Information Technology student in Multan, Pakistan, building full-stack
            web applications with the MERN stack. NAVTTC-trained in REST APIs, JWT
            authentication, Redux Toolkit and MVC architecture — I turn ideas into
            responsive, production-ready products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8"
          >
            <motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ y: -2, boxShadow: "0 12px 30px -8px rgba(79,140,255,0.45)" }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
              className="px-7 py-3.5 rounded-xl font-semibold text-white text-sm flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
            >
              Hire Me
              <FiArrowRight size={15} />
            </motion.button>

            <motion.a
              href="/Muhammad_Asad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/15 hover:border-primary/60 hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              👁 View CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex items-center justify-center lg:justify-start gap-3 mt-8"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-full grid place-items-center surface-card hover:text-primary hover:-translate-y-1 transition-all"
              >
                <s.icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div
            className="absolute inset-0 opacity-[0.05] animated-gradient pointer-events-none"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
            aria-hidden="true"
          />
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2rem] overflow-hidden surface-card p-2">
            <img
              src="/images/profile.png"
              alt="Portrait of Muhammad Asad"
              className="w-full h-full object-cover rounded-[1.6rem]"
              loading="eager"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 surface-card rounded-2xl px-4 py-3 font-mono text-xs"
          >
            <span className="text-secondary">const</span> stack ={" "}
            <span className="text-accent">"MERN"</span>;
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <FiChevronDown size={22} />
      </motion.button>
    </section>
  );
}
