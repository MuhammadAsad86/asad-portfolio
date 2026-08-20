import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiUser,
  FiAward,
  FiBriefcase,
  FiCode,
} from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { stats } from "../../data/experience";
import { useCountUp } from "../../hooks/useCountUp";

function Stat({ label, value, index }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.35,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="surface-card rounded-2xl border border-white/10 p-5 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="font-display text-3xl font-bold text-gradient">
        {count}+
      </div>

      <div className="mt-1 font-mono text-xs text-muted">
        {label}
      </div>
    </motion.div>
  );
}

const journey = [
  {
    icon: FiUser,
    label: "BS Information Technology",
    sub: "Currently studying at MNS University of Agriculture, Multan and building a strong foundation in software development and modern technologies.",
  },
  {
    icon: FiAward,
    label: "MERN Stack Development",
    sub: "Completed 3 months of hands-on NAVTTC training focused on React, Node.js, Express, MongoDB, REST APIs and modern development practices.",
  },
  {
    icon: FiBriefcase,
    label: "Full Stack Web Internship",
    sub: "Completed a remote internship at Zenvyro Labs, gaining practical experience through development tasks and full-stack projects.",
  },
  {
    icon: FiCode,
    label: "Building Full-Stack Projects",
    sub: "Continuously designing, developing and deploying responsive web applications while improving my skills through practical projects.",
  },
];

function JourneyCard({ step, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-4, 4]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const Icon = step.icon;

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.3,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -7,
      }}
      className="surface-card group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-5">
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary"
        >
          <Icon size={20} />
        </motion.div>

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
    </motion.article>
  );
}

function JourneyCards() {
  return (
    <div className="mt-14">
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: false,
          amount: 0.5,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-3 flex items-center gap-4"
      >
        <span className="h-px w-8 bg-primary/60" />

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
          My Journey So Far
        </span>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.5,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-6 max-w-2xl text-sm leading-relaxed text-muted"
      >
        My journey into web development has been shaped through education,
        hands-on training, internship experience and continuous project
        development. Each step has helped me grow as a developer and build
        stronger full-stack development skills.
      </motion.p>

      <div className="grid gap-5 md:grid-cols-2">
        {journey.map((step, index) => (
          <JourneyCard
            key={step.label}
            step={step}
            index={index}
          />
        ))}
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
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[15.5px] leading-relaxed text-muted"
            >
              I'm a MERN Stack Developer and BS Information Technology student
              in my 6th semester at MNS University of Agriculture, Multan. My
              focus is building complete web applications from end to end, from
              MongoDB databases and Express APIs to polished React interfaces.
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-[15.5px] leading-relaxed text-muted"
            >
              Through NAVTTC's MERN Stack Development program, I gained
              hands-on experience with REST APIs, JWT authentication, protected
              routes, Redux Toolkit and MVC architecture. I also completed a
              Full Stack Web Internship at Zenvyro Labs, where I continued
              building practical development experience.
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-[15.5px] leading-relaxed text-muted"
            >
              My goal is to keep building responsive, user-friendly and
              scalable products while growing into a full-stack developer who
              can take features from database design to deployment.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Stat
                key={stat.label}
                {...stat}
                index={index}
              />
            ))}
          </div>

          <JourneyCards />
        </div>
      </div>
    </section>
  );
}