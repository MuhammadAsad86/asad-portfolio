import { motion } from "framer-motion";
import { FiUser, FiAward, FiBriefcase } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { stats } from "../../data/experience";
import { useCountUp } from "../../hooks/useCountUp";


function Stat({ label, value }) {
  const { ref, value: count } = useCountUp(value);
  return (
    <div ref={ref} className="surface-card rounded-2xl p-5 text-center">
      <div className="font-display font-bold text-3xl text-gradient">{count}+</div>
      <div className="text-muted text-xs font-mono mt-1">{label}</div>
    </div>
  );
}

const journey = [
  { icon: FiUser, label: "BS Information Technology", sub: "MNS University, Multan" },
  { icon: FiAward, label: "NAVTTC MERN Training", sub: "3 months, hands-on" },
  { icon: FiBriefcase, label: "Operations Intern", sub: "Software house" },
  { icon: FiUser, label: "Building & Shipping", sub: "Full-stack projects" },
];

function JourneyTimeline() {
  return (
    <div className="mt-12">
      <span className="font-mono text-xs text-muted block mb-5">My path so far</span>
      <div className="grid sm:grid-cols-4 gap-4">
        {journey.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative flex sm:flex-col gap-3 sm:gap-4 items-start"
          >
            {i < journey.length - 1 && (
              <span className="hidden sm:block absolute top-5 left-[calc(50%+22px)] right-[calc(-50%+22px)] h-px bg-white/10" />
            )}
            <span className="w-10 h-10 shrink-0 rounded-full grid place-items-center surface-card text-primary z-10">
              <step.icon size={16} />
            </span>
            <div>
              <div className="font-medium text-sm leading-snug">{step.label}</div>
              <div className="font-mono text-[11px] text-muted mt-1">{step.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeading eyebrow="01 · About" title="A little about my journey" headingId="about-heading" />

        <div className="max-w-2xl mx-auto text-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted text-[15.5px] leading-relaxed"
            >
              I'm a MERN Stack Developer and BS Information Technology student (6th
              semester) at MNS University of Agriculture, Multan. My focus is building
              complete web applications end to end — from a MongoDB schema, through an
              Express API, to a polished React interface.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-[15.5px] leading-relaxed mt-4"
            >
              Three months in NAVTTC's MERN Stack Development program gave me real,
              hands-on practice with JWT authentication, protected routing, Redux
              Toolkit state management and MVC architecture. I also spent time as a
              Digital Content &amp; Operations Intern at a professional software house,
              supporting cross-functional operational workflows.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted text-[15.5px] leading-relaxed mt-4"
            >
              My goal is simple: keep shipping responsive, user-friendly, scalable
              products, and grow into a full-stack role where I can own features from
              database to deployment.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>

            <JourneyTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}