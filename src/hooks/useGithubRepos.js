import { useCallback, useEffect, useState } from "react";

const GITHUB_USERNAME = "MuhammadAsad86";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;


export const PINNED_REPOS = [
  "ecommerce-web-application-",
  "mern-blog",
  "asad-portfolio",
  "responsive-corporate-website",
  "binary-converter-calculator",
  "MEEZAN-BANK-PAGE",
];

const PINNED_ORDER = PINNED_REPOS.map((name) => name.toLowerCase());

function sortRepos(data) {
  return [...data].sort((a, b) => {
    const aPinned = PINNED_ORDER.indexOf(a.name.toLowerCase());
    const bPinned = PINNED_ORDER.indexOf(b.name.toLowerCase());

    // Both pinned -> keep the order defined in PINNED_REPOS
    if (aPinned !== -1 && bPinned !== -1) return aPinned - bPinned;
    // Only one pinned -> it goes first
    if (aPinned !== -1) return -1;
    if (bPinned !== -1) return 1;
    // Neither pinned -> most recently updated first
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

export default function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(GITHUB_API_URL, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          res.status === 403
            ? "GitHub API rate limit exceeded. Please try again later."
            : `GitHub API responded with status ${res.status}.`
        );
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error(data?.message || "Unexpected response from GitHub API.");
      }

      setRepos(sortRepos(data));
    } catch (err) {
      console.error("Failed to fetch GitHub repositories:", err);
      setError(err.message || "Failed to load repositories from GitHub.");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
}