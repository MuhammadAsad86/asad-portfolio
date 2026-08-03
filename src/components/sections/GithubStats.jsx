import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiUsers, FiFolder, FiGithub } from "react-icons/fi";
import { useGithubProfile } from "../../hooks/useGithubProfile";

const USERNAME = "MuhammadAsad86";

function MetricTile({ icon: Icon, label, value }) {
  return (
    <div className="surface-card rounded-2xl p-5 text-center">
      <Icon className="mx-auto text-primary mb-2" size={18} />
      <div className="font-display font-bold text-2xl">{value ?? "—"}</div>
      <div className="text-muted text-xs font-mono mt-1">{label}</div>
    </div>
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
        <p className="text-center text-muted text-xs font-mono mb-6">
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
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
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
