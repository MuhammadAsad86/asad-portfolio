import { motion } from "framer-motion";
import { FiBriefcase, FiBookOpen, FiAward } from "react-icons/fi";
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
    <section id="experience" className="py-28" aria-labelledby="experience-heading">
      <div className="section-container">
        <SectionHeading
          headingId="experience-heading"
          eyebrow="04 · Experience"
          title="Where I've grown"
          subtitle="Internship, training and education — the path that shaped how I build."
        />

        <ol className="relative pl-8 border-l-2 border-white/10 flex flex-col gap-14 list-none">
          {timeline.map((item, i) => {
            const Icon = icons[item.type];
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-0 w-9 h-9 rounded-full grid place-items-center ring-4 ring-bg"
                  style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
                >
                  <Icon size={15} className="text-white" />
                </span>
                <div className="surface-card rounded-2xl p-6">
                  <span className="font-mono text-xs text-secondary">{item.date}</span>
                  <h3 className="font-display font-semibold text-lg mt-1.5">{item.title}</h3>
                  <span className="font-mono text-xs text-muted block mt-1">{item.org}</span>
                  <p className="text-muted text-sm leading-relaxed mt-3">{item.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <GithubStats />
      </div>
    </section>
  );
}
