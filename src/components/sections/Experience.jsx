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

        <ol className="relative flex list-none flex-col gap-14 border-l-2 border-white/10 pl-8">
          {timeline.map((item, i) => {
            const Icon = icons[item.type] || FiBriefcase;

            return (
              <motion.li
                key={item.title}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="relative"
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
                    y: -4,
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
        </ol>

        <GithubStats />
      </div>
    </section>
  );
}