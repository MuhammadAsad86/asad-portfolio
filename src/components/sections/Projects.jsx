import { memo, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
} from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { projects } from "../../data/projects";

/* ============================ PROJECT CARD ============================ */

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [3, -3]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-3, 3]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  useEffect(() => {
    const touchDevice = window.matchMedia("(hover: none)").matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (touchDevice || reducedMotion) {
      setTiltEnabled(false);
    }
  }, []);

  const handleMouseMove = (event) => {
    if (!tiltEnabled || !cardRef.current) return;

    setHovered(true);

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
      }}
      style={
        tiltEnabled
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }
          : undefined
      }
      className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/10 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* PROJECT IMAGE */}

      <div
        className="relative overflow-hidden bg-black/20 p-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[16/7.5] overflow-hidden rounded-xl border border-white/10 bg-black/10">
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover object-top"
            animate={{
              scale: hovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.4,
            }}
          />

          <motion.div
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute inset-0 flex items-center justify-center bg-[#08101d]/65 backdrop-blur-[2px]"
            style={{
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-medium text-[#101827] shadow-xl transition-transform hover:scale-105"
              >
                <FiExternalLink size={13} />
                Live Preview
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-medium text-[#101827] shadow-xl">
                <FiExternalLink size={13} />
                Preview
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CARD CONTENT */}

      <div className="flex flex-1 flex-col px-5 pb-4 pt-3">
        {/* TITLE */}

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-primary/60">
              Featured Project
            </p>

            <h3 className="font-display text-lg font-semibold leading-tight">
              {project.title}
            </h3>
          </div>

          <span className="mt-1 shrink-0 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wide text-primary">
            {project.category}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-2 text-[13px] leading-5 text-muted">
          {project.description}
        </p>

        {/* FEATURES */}

        <div className="mt-3">
          <div className="grid gap-1.5">
            {project.features.slice(0, 2).map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-[11px] text-muted"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD FOOTER */}

        <div className="mt-auto pt-4">
          {/* TECH STACK */}

          <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
            {project.tech.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-primary/15 bg-primary/5 px-2 py-1 font-mono text-[9px] text-primary"
              >
                {technology}
              </span>
            ))}
          </div>

          {/* ACTIONS */}

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 font-mono text-[11px] font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <FiGithub size={14} />
                Code
              </a>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-[11px] text-muted opacity-40">
                <FiGithub size={14} />
                Code
              </div>
            )}

            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #4F8CFF 0%, #22D3EE 100%)",
                }}
              >
                <FiArrowUpRight size={14} />
                Live Demo
              </a>
            ) : (
              <div
                className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] font-semibold text-white opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #4F8CFF 0%, #22D3EE 100%)",
                }}
              >
                <FiArrowUpRight size={14} />
                Live Demo
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ========================== PROJECTS SECTION ========================== */

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="projects-heading"
          eyebrow="03 · Projects"
          title="Things I've built"
          subtitle="A selection of projects showcasing my full-stack and frontend development work."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}