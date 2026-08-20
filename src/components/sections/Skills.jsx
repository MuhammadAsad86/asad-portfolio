import { memo, useId } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { skillGroups, softSkills, languages } from "../../data/skills";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SkillCard = memo(function SkillCard({
  name,
  level,
  icon: Icon,
  index,
}) {
  const gradientId = useId();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
        rotateX: -8,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        rotateX: 4,
        rotateY: -4,
        scale: 1.02,
      }}
      style={{
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="surface-card group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-colors duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
        }}
        className="relative h-14 w-14 shrink-0"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        <svg
          viewBox="0 0 48 48"
          className="h-14 w-14 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />

          <motion.circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{
              strokeDashoffset: CIRCUMFERENCE,
            }}
            whileInView={{
              strokeDashoffset:
                CIRCUMFERENCE -
                (level / 100) * CIRCUMFERENCE,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 1.2,
              delay: index * 0.06,
              ease: "easeOut",
            }}
          />

          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#4F8CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>

        <span className="absolute inset-0 grid place-items-center text-text">
          <Icon size={18} aria-hidden="true" />
        </span>
      </motion.div>

      <div
        className="min-w-0"
        style={{
          transform: "translateZ(18px)",
        }}
      >
        <div className="truncate text-sm font-medium">
          {name}
        </div>

        <div
          className="mt-0.5 font-mono text-xs text-muted"
          aria-label={`Proficiency ${level} percent`}
        >
          {level}%
        </div>
      </div>
    </motion.div>
  );
});

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28"
      aria-labelledby="skills-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="skills-heading"
          eyebrow="02 · Skills"
          title="Tools I build with"
          subtitle="A snapshot of the technologies I use across the stack, from database design to interface polish."
        />

        <div className="flex flex-col gap-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.55,
                delay: gi * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.h3
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
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.1,
                }}
                className="mb-5 font-display text-base font-semibold text-primary"
              >
                {group.category}
              </motion.h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <SkillCard
                    key={item.name}
                    {...item}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              rotateX: -5,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
              rotateY: 2,
            }}
            style={{
              transformPerspective: 1000,
            }}
            className="surface-card rounded-2xl border border-white/10 p-7 transition-all duration-300 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5"
          >
            <h3 className="mb-5 font-display text-lg font-semibold text-secondary">
              Soft Skills
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -3,
                    scale: 1.05,
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs transition-colors hover:border-secondary/30 hover:bg-secondary/5"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              rotateX: -5,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
              rotateY: -2,
            }}
            style={{
              transformPerspective: 1000,
            }}
            className="surface-card rounded-2xl border border-white/10 p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            <h3 className="mb-5 font-display text-lg font-semibold text-accent">
              Languages
            </h3>

            <div className="flex flex-col gap-3">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{
                    opacity: 0,
                    x: 20,
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
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    x: 5,
                  }}
                  className="flex justify-between rounded-lg px-2 py-1 font-mono text-sm transition-colors hover:bg-primary/5"
                >
                  <span>{lang.name}</span>

                  <span className="text-muted">
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}