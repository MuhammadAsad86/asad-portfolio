import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiSearch,
  FiAlertTriangle,
  FiRefreshCw,
} from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import useGithubRepos from "../../hooks/useGithubRepos";
import useGithubPinnedRepos from "../../hooks/useGithubPinnedRepos";
import {
  projects as manualProjects,
  projectCategories,
} from "../../data/projects";

/* ---------------------------- helpers ---------------------------- */

function formatTitle(name) {
  const cleaned = name.replace(/[-_]+/g, " ").trim();

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function buildManualLookup(list) {
  const map = new Map();

  list.forEach((project) => {
    const name = project.github.split("/").filter(Boolean).pop();

    if (name) {
      map.set(name.toLowerCase(), project);
    }
  });

  return map;
}

function classifyRepoCategory(repo) {
  const text = [
    repo.name,
    repo.description,
    repo.language,
    ...(repo.topics || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("mern") ||
    text.includes("mongo") ||
    text.includes("mongodb") ||
    text.includes("node") ||
    text.includes("express") ||
    text.includes("full stack") ||
    text.includes("jwt") ||
    text.includes("redux")
  ) {
    return "Full Stack";
  }

  return "Frontend";
}

function timeAgo(dateString) {
  if (!dateString) return null;

  const diffMs = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 1) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days}d ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `Updated ${months}mo ago`;

  return `Updated ${Math.floor(months / 12)}y ago`;
}

function mergeRepoWithManual(repo, manualLookup) {
  const manual = manualLookup.get(repo.name.toLowerCase());
  const topics = repo.topics || [];

  const category =
    manual?.category || classifyRepoCategory(repo) || "Frontend";

  const tech =
    topics.length > 0
      ? topics.map(capitalize)
      : manual?.tech?.length
        ? manual.tech
        : repo.language
          ? [repo.language]
          : [];

  const features =
    manual?.features?.length > 0
      ? manual.features
      : topics.length > 0
        ? topics.slice(0, 3).map((topic) => `Tagged: ${capitalize(topic)}`)
        : [
            `Built primarily with ${
              repo.language || "multiple technologies"
            }`,
          ];

  return {
    id: repo.id,
    title: manual?.title || formatTitle(repo.name),
    category,
    description:
      repo.description?.trim() ||
      manual?.description ||
      "No description provided for this repository yet.",
    features,
    tech,
    github: repo.html_url,
    live: repo.homepage?.trim() || manual?.live || "",
    repoPath: repo.full_name || `MuhammadAsad86/${repo.name}`,
    language: repo.language || "",
    topics,
    updatedLabel: timeAgo(repo.updated_at),
  };
}

/* ---------------------------- ProjectCard ---------------------------- */

const ProjectCard = memo(function ProjectCard({ project }) {
  const ref = useRef(null);

  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    {
      damping: 20,
      stiffness: 200,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    {
      damping: 20,
      stiffness: 200,
    }
  );

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reduced) {
      setTiltEnabled(false);
    }
  }, []);

  const handleMouseMove = (event) => {
    if (!hovered) {
      setHovered(true);
    }

    if (!tiltEnabled || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tiltEnabled
          ? {
              rotateX,
              rotateY,
              transformPerspective: 800,
            }
          : undefined
      }
      whileHover={{ y: -8 }}
      className="surface-card rounded-2xl overflow-hidden flex flex-col group will-change-transform shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
    >
      <div className="relative h-44 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3 bg-black/20 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />

          <span className="ml-3 font-mono text-[9.5px] text-white/40 truncate">
            {`github.com/${project.repoPath}`}
          </span>
        </div>

        <motion.div
          className="w-full h-full pt-8 flex items-center justify-center relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(6,182,212,0.18))",
          }}
          animate={{
            scale: hovered ? 1.04 : 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <span className="font-display font-bold text-2xl text-white/90 tracking-tight z-10 px-4 text-center">
            {project.title}
          </span>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="absolute inset-0 top-8 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
        >
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-4 py-2 rounded-full bg-white/95 text-[#0B1120] font-semibold flex items-center gap-1.5"
          >
            {project.live ? (
              <FiExternalLink size={13} />
            ) : (
              <FiGithub size={13} />
            )}

            {project.live ? "View Live" : "View Code"}
          </a>
        </motion.div>
      </div>

      <div className="p-7 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">
            {project.title}
          </h3>

          <span className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-muted">
            {project.category}
          </span>
        </div>

        <p className="text-muted text-sm leading-relaxed">
          {project.description}
        </p>

        <ul className="text-xs text-muted flex flex-col gap-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-secondary">▹</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              className="font-mono text-[10.5px] px-2.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-mono px-3 py-2.5 rounded-lg border border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
          >
            <FiGithub size={15} aria-hidden="true" />
            Code
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-mono px-3 py-2.5 rounded-lg text-white"
              style={{
                background:
                  "linear-gradient(135deg,#4F8CFF,#22D3EE)",
              }}
            >
              <FiExternalLink size={15} aria-hidden="true" />
              Live Demo
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center gap-1.5 text-sm font-mono px-3 py-2.5 rounded-lg border border-white/5 text-muted/60">
              <FiExternalLink size={15} aria-hidden="true" />
              Repo only
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

/* ---------------------------- skeleton card ---------------------------- */

function SkeletonCard() {
  return (
    <div className="surface-card rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-44 bg-white/5" />

      <div className="p-7 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="h-5 w-2/3 rounded bg-white/10" />
          <div className="h-5 w-14 rounded-full bg-white/5" />
        </div>

        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="h-2.5 w-4/5 rounded bg-white/5" />
          <div className="h-2.5 w-3/5 rounded bg-white/5" />
        </div>

        <div className="flex gap-2 mt-auto pt-2">
          <div className="h-6 w-16 rounded-full bg-white/5" />
          <div className="h-6 w-16 rounded-full bg-white/5" />
          <div className="h-6 w-16 rounded-full bg-white/5" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10 mt-2">
          <div className="h-9 flex-1 rounded-lg bg-white/5" />
          <div className="h-9 flex-1 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Projects section ---------------------------- */

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const {
    repos,
    loading: reposLoading,
    error: reposError,
    refetch: refetchRepos,
  } = useGithubRepos();

  const {
    repos: pinnedRepos,
    loading: pinnedLoading,
    error: pinnedError,
    refetch: refetchPinnedRepos,
  } = useGithubPinnedRepos();

  const manualLookup = useMemo(
    () => buildManualLookup(manualProjects),
    []
  );

  const mergedProjects = useMemo(
    () =>
      repos.map((repo) =>
        mergeRepoWithManual(repo, manualLookup)
      ),
    [repos, manualLookup]
  );

  const mergedPinnedProjects = useMemo(
    () =>
      pinnedRepos.map((repo) =>
        mergeRepoWithManual(repo, manualLookup)
      ),
    [pinnedRepos, manualLookup]
  );

  const filtered = useMemo(() => {
    const searchQuery = query.trim().toLowerCase();

    let data;

    if (category === "All") {
      data = mergedPinnedProjects;
    } else {
      data = mergedProjects.filter(
        (project) => project.category === category
      );
    }

    if (searchQuery) {
      data = data.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery) ||
          project.description
            .toLowerCase()
            .includes(searchQuery) ||
          project.language
            .toLowerCase()
            .includes(searchQuery) ||
          project.tech.some((technology) =>
            technology.toLowerCase().includes(searchQuery)
          ) ||
          project.topics.some((topic) =>
            topic.toLowerCase().includes(searchQuery)
          )
      );
    }

    return data;
  }, [
    category,
    query,
    mergedProjects,
    mergedPinnedProjects,
  ]);

  const loading =
    category === "All"
      ? pinnedLoading
      : reposLoading;

  const error =
    category === "All"
      ? pinnedError
      : reposError;

  const handleRetry = () => {
    if (category === "All") {
      refetchPinnedRepos();
    } else {
      refetchRepos();
    }
  };

  const totalProjects =
    category === "All"
      ? mergedPinnedProjects.length
      : mergedProjects.length;

  return (
    <section
      id="projects"
      className="py-28"
      aria-labelledby="projects-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="projects-heading"
          eyebrow="03 · Projects"
          title="Things I've built"
          subtitle="A selection of projects from my GitHub, including pinned repositories and categorized work."
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10">
          <div className="flex gap-2 flex-wrap">
            {projectCategories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors ${
                  category === item
                    ? "border-primary text-primary bg-primary/10"
                    : "border-white/10 text-muted hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              size={15}
            />

            <input
              type="text"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search projects or tech..."
              className="w-full surface-card rounded-full pl-10 pr-4 py-2.5 text-sm font-mono outline-none focus:border-primary/60"
              aria-label="Search projects"
            />
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-20 surface-card rounded-2xl">
            <FiAlertTriangle
              size={28}
              className="text-secondary"
            />

            <p className="text-muted text-sm font-mono max-w-md">
              Couldn't load repositories from GitHub: {error}
            </p>

            <button
              onClick={handleRetry}
              className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
            >
              <FiRefreshCw size={13} />
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <p className="text-center text-muted font-mono text-sm mt-14">
                {totalProjects === 0
                  ? "No repositories found."
                  : `No projects match "${query}". Try a different search.`}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}