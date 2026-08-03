import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiUsers, FiFolder, FiGithub } from "react-icons/fi";
import { useGithubProfile } from "../../hooks/useGithubProfile";

const USERNAME = "MuhammadAsad86";
function MetricTile({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-lg shadow-black/20 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.18),transparent_60%)]" />

      {/* Icon */}
      <div className="relative z-10 w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 text-primary">
        <Icon size={24} />
      </div>

      {/* Number */}
      <h3 className="relative z-10 font-display font-bold text-4xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        {value ?? "—"}
      </h3>

      {/* Label */}
      <p className="relative z-10 mt-3 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
        {label}
      </p>
    </motion.div>
  );
}

export default function GithubStats() {
  const { profile, repos, status } = useGithubProfile(USERNAME);

  return (
    <div className="mt-16">
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-muted mb-6 text-center flex items-center justify-center gap-2"
      >
        <FiGithub /> Live from GitHub — @{USERNAME}
      </motion.h3>

      {status === "error" && (
        <p className="text-center text-muted text-xs font-mono mb-10">
          Couldn't reach the GitHub API right now — showing cached stat cards below instead.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <MetricTile icon={FiFolder} label="Public Repos" value={profile?.public_repos} />
        <MetricTile icon={FiUsers} label="Followers" value={profile?.followers} />
        <MetricTile icon={FiGitBranch} label="Following" value={profile?.following} />
        <MetricTile
          icon={FiStar}
          label="Total Stars"
          value={repos?.length ? repos.reduce((sum, r) => sum + r.stargazers_count, 0) : undefined}
        />
      </div>

      {repos.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="surface-card rounded-2xl p-5 flex flex-col gap-2 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium truncate">{repo.name}</span>
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1 text-xs text-accent font-mono shrink-0">
                    <FiStar size={12} /> {repo.stargazers_count}
                  </span>
                )}
              </div>
              {repo.description && (
                <p className="text-muted text-xs leading-relaxed line-clamp-2">{repo.description}</p>
              )}
              {repo.language && (
                <span className="font-mono text-[10.5px] text-secondary mt-1">{repo.language}</span>
              )}
            </motion.a>
          ))}
        </div>
      )}



    </div>
  );
}
