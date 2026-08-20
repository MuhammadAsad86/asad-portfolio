import { motion } from "framer-motion";
import { FiUser, FiAward, FiBriefcase, FiCode } from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { stats } from "../../data/experience";
import { useCountUp } from "../../hooks/useCountUp";

function Stat({ label, value }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="surface-card rounded-2xl border border-white/10 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
    >
      <div className="font-display text-3xl font-bold text-gradient">
        {count}+
      </div>

      <div className="mt-1 font-mono text-xs text-muted">
        {label}
      </div>
    </div>
  );
}

const journey = [
  {
    icon: FiUser,
    label: "BS Information Technology",
    sub: "MNS University of Agriculture, Multan",
  },
  {
    icon: FiAward,
    label: "MERN Stack Development",
    sub: "NAVTTC, 3 months hands-on training",
  },
  {
    icon: FiBriefcase,
    label: "Full Stack Web Internship",
    sub: "Zenvyro Labs, remote internship",
  },
  {
    icon: FiCode,
    label: "Building Full-Stack Projects",
    sub: "Designing, developing and shipping web applications",
  },
];

function JourneyCards() {
  return (
    <div className="mt-14">
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px w-8 bg-primary/50" />

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
          My Journey So Far
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {journey.map((step, i) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="surface-card group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-semibold leading-snug">
                    {step.label}
                  </h3>

                  <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                    {step.sub}
                  </p>
                </div>
              </div>

              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="01 · About"
          title="A little about my journey"
          headingId="about-heading"
        />

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[15.5px] leading-relaxed text-muted"
            >
              I'm a MERN Stack Developer and BS Information Technology student
              in my 6th semester at MNS University of Agriculture, Multan. My
              focus is building complete web applications from end to end, from
              MongoDB databases and Express APIs to polished React interfaces.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-[15.5px] leading-relaxed text-muted"
            >
              Through NAVTTC's MERN Stack Development program, I gained
              hands-on experience with REST APIs, JWT authentication, protected
              routes, Redux Toolkit and MVC architecture. I also completed a
              Full Stack Web Internship at Zenvyro Labs, where I continued
              building practical development experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[15.5px] leading-relaxed text-muted"
            >
              My goal is to keep building responsive, user-friendly and
              scalable products while growing into a full-stack developer who
              can take features from database design to deployment.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>

          <JourneyCards />
        </div>
      </div>
    </section>
  );
}