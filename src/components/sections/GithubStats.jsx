import { motion } from "framer-motion";
import {
  FiStar,
  FiGitBranch,
  FiUsers,
  FiFolder,
  FiGithub,
} from "react-icons/fi";

import { useGithubProfile } from "../../hooks/useGithubProfile";

const USERNAME = "MuhammadAsad86";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 8,
    scale: 0.96,
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

function MetricTile({ icon: Icon, label, value }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -8,
        scale: 1.03,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/20 backdrop-blur-xl hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top Gradient */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <Icon size={24} />
      </div>

      {/* Number */}
      <h3 className="relative z-10 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text font-display text-4xl font-bold text-transparent">
        {value ?? "—"}
      </h3>

      {/* Label */}
      <p className="relative z-10 mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </motion.div>
  );
}

export default function GithubStats() {
  const { profile, repos, status } = useGithubProfile(USERNAME);

  const totalStars =
    repos?.length > 0
      ? repos.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        )
      : undefined;

  return (
    <div
      className="mt-16"
      style={{
        perspective: 1200,
      }}
    >
      {/* GitHub Heading */}
      <motion.div
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
          amount: 0.5,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <FiGithub size={19} />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold text-text">
              Live from GitHub
            </span>

            <span className="mt-0.5 font-mono text-xs font-medium text-primary">
              @{USERNAME}
            </span>
          </div>
        </div>
      </motion.div>

      {status === "error" && (
        <p className="mb-10 text-center font-mono text-xs text-muted">
          Couldn't reach the GitHub API right now, showing available stats below.
        </p>
      )}

      {/* GitHub Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.3,
        }}
        className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        <MetricTile
          icon={FiFolder}
          label="Public Repos"
          value={profile?.public_repos}
        />

        <MetricTile
          icon={FiUsers}
          label="Followers"
          value={profile?.followers}
        />

        <MetricTile
          icon={FiGitBranch}
          label="Following"
          value={profile?.following}
        />

        <MetricTile
          icon={FiStar}
          label="Total Stars"
          value={totalStars}
        />
      </motion.div>

      {/* Repository Cards */}
      {repos?.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="mb-6 grid gap-6 sm:grid-cols-2"
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                y: -6,
                rotateX: 2,
                rotateY: -1,
              }}
              className="surface-card flex flex-col gap-2 rounded-2xl p-5 transition-colors hover:border-primary/40"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-sm font-medium">
                  {repo.name}
                </span>

                {repo.stargazers_count > 0 && (
                  <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-accent">
                    <FiStar size={12} />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                  {repo.description}
                </p>
              )}

              {repo.language && (
                <span className="mt-1 font-mono text-[10.5px] text-secondary">
                  {repo.language}
                </span>
              )}
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
}