import { useCallback, useEffect, useState } from "react";

const GITHUB_USERNAME = "MuhammadAsad86";

const GITHUB_API_URL =
  `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

export default function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Accept: "application/vnd.github+json",
      };

      const token = import.meta.env.VITE_GITHUB_TOKEN;

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(GITHUB_API_URL, {
        headers,
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
        throw new Error(
          data?.message || "Unexpected response from GitHub API."
        );
      }

      setRepos(data);
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

  return {
    repos,
    loading,
    error,
    refetch: fetchRepos,
  };
}