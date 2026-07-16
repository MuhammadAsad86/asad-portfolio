import { memo, useId } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { skillGroups, softSkills, languages } from "../../data/skills";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SkillCard = memo(function SkillCard({ name, level, icon: Icon }) {
  const gradientId = useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="surface-card rounded-2xl p-5 flex items-center gap-4 transition-colors hover:border-primary/40"
    >
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 48 48" className="w-14 h-14 -rotate-90" aria-hidden="true">
          <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <motion.circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            whileInView={{ strokeDashoffset: CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F8CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-text">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0">
        <div className="font-medium text-sm truncate">{name}</div>
        <div className="font-mono text-xs text-muted mt-0.5" aria-label={`Proficiency ${level} percent`}>
          {level}%
        </div>
      </div>
    </motion.div>
  );
});

export default function Skills() {
  return (
    <section id="skills" className="py-28" aria-labelledby="skills-heading">
      <div className="section-container">
        <SectionHeading
          headingId="skills-heading"
          eyebrow="02 · Skills"
          title="Tools I build with"
          subtitle="A snapshot of the technologies I use across the stack — from database design to interface polish."
        />

        <div className="flex flex-col gap-12">
          {skillGroups.map((group, gi) => (
            <div key={group.category}>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.05 }}
                className="font-display font-semibold text-base mb-5 text-primary"
              >
                {group.category}
              </motion.h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item) => (
                  <SkillCard key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card rounded-2xl p-7"
          >
            <h3 className="font-display font-semibold text-lg mb-5 text-secondary">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3.5 py-2 rounded-full border border-white/10 bg-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card rounded-2xl p-7"
          >
            <h3 className="font-display font-semibold text-lg mb-5 text-accent">
              Languages
            </h3>
            <div className="flex flex-col gap-3">
              {languages.map((lang) => (
                <div key={lang.name} className="flex justify-between font-mono text-sm">
                  <span>{lang.name}</span>
                  <span className="text-muted">{lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
