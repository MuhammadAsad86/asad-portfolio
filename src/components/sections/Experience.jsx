import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiBookOpen,
  FiAward,
} from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { timeline } from "../../data/experience";
import GithubStats from "./GithubStats";

const icons = {
  experience: FiBriefcase,
  training: FiAward,
  education: FiBookOpen,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    rotateX: 8,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28"
      aria-labelledby="experience-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="experience-heading"
          eyebrow="04 · Experience"
          title="Where I've grown"
          subtitle="Internship, training and education, the path that shaped how I build."
        />

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.25,
          }}
          className="relative flex list-none flex-col gap-14 border-l-2 border-white/10 pl-8"
          style={{
            perspective: 1200,
          }}
        >
          {timeline.map((item) => {
            const Icon = icons[item.type] || FiBriefcase;

            return (
              <motion.li
                key={item.title}
                variants={itemVariants}
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-0 grid h-9 w-9 place-items-center rounded-full ring-4 ring-bg"
                  style={{
                    background:
                      "linear-gradient(135deg, #4F8CFF, #22D3EE)",
                  }}
                >
                  <Icon
                    size={15}
                    className="text-white"
                  />
                </span>

                <motion.div
                  whileHover={{
                    y: -5,
                    rotateX: 2,
                    rotateY: -1,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  className="surface-card rounded-2xl p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="font-mono text-xs text-secondary">
                    {item.date}
                  </span>

                  <h3 className="mt-1.5 font-display text-lg font-semibold">
                    {item.title}
                  </h3>

                  <span className="mt-1 block font-mono text-xs text-muted">
                    {item.org}
                  </span>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>

        <GithubStats />
      </div>
    </section>
  );
}