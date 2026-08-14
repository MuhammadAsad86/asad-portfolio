import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // 3D mouse-tilt effect for the profile image — rests at a gentle natural
  // tilt, then reacts further to mouse movement for extra depth on hover
  const tiltRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -20]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 22]), {
    stiffness: 120,
    damping: 16,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["20%", "90%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["10%", "80%"]);

  const handleTiltMove = (e) => {
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTiltLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
          className="relative mx-auto w-80 h-80 sm:w-[26rem] sm:h-[26rem] grid place-items-center"
          style={{ perspective: 1000 }}
        >
          {/* Soft floating depth shadow beneath the blob */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 bottom-2 h-16 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #4F8CFF, transparent 70%)" }}
          />

          {/* Glowing gradient blob backdrop, morphs shape continuously */}
          <div
            aria-hidden="true"
            className="absolute w-64 h-64 sm:w-80 sm:h-80 blob-shape opacity-90 blur-lg pointer-events-none"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#A855F7,#22D3EE)" }}
          />

          {/* Thin glowing outline that morphs in sync, visible as an accent edge */}
          <div
            aria-hidden="true"
            className="absolute w-64 h-64 sm:w-80 sm:h-80 blob-shape pointer-events-none"
            style={{
              boxShadow: "0 0 0 3px rgba(79,140,255,0.55), 0 0 40px 6px rgba(168,85,247,0.35)",
            }}
          />

          {/* Orbiting particles */}
          {[
            { size: 20, radius: 165, duration: "9s", delay: "0s", color: "#4F8CFF" },
            { size: 15, radius: 185, duration: "13s", delay: "-4s", color: "#22D3EE" },
            { size: 12, radius: 150, duration: "7s", delay: "-2s", color: "#A855F7" },
            { size: 10, radius: 195, duration: "11s", delay: "-6s", color: "#4F8CFF" },
          ].map((p, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ width: 0, height: 0 }}
            >
              <div
                className="orbit-particle rounded-full blur-[1px]"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 12px 2px ${p.color}`,
                  "--orbit-radius": `${p.radius}px`,
                  "--orbit-duration": p.duration,
                  animationDelay: p.delay,
                }}
              />
            </div>
          ))}

          <motion.div
            ref={tiltRef}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            initial={false}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 blob-shape overflow-hidden surface-card p-2 shadow-[0_30px_60px_-15px_rgba(79,140,255,0.45)] backdrop-blur-xl"
          >
            <img
              src="/images/profile.png"
              alt="Portrait of Muhammad Asad"
              className="w-full h-full object-cover blob-shape pointer-events-none"
              loading="eager"
              style={{ transform: "translateZ(20px)" }}
            />
            {/* Glassy top-light sheen for extra depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 blob-shape pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 35%)",
              }}
            />
            {/* Mouse-follow glow highlight for extra depth */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 blob-shape pointer-events-none mix-blend-overlay"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([gx, gy]) =>
                    `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 60%)`
                ),
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ transform: "translateZ(40px)" }}
            className="absolute -bottom-2 -left-1 sm:-bottom-3 sm:left-0 surface-card backdrop-blur-xl rounded-2xl px-4 py-3 font-mono text-xs"
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