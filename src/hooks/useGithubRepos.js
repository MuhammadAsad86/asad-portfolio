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
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      const headers = {
        Accept: "application/vnd.github+json",
      };

      if (token && token.trim()) {
        headers.Authorization = `Bearer ${token.trim()}`;
      }

      const res = await fetch(GITHUB_API_URL, {
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("GitHub API error:", data);

        if (res.status === 401) {
          throw new Error("GitHub token is invalid or expired.");
        }

        if (res.status === 403) {
          throw new Error(
            data?.message ||
              "GitHub API rate limit exceeded or access was denied."
          );
        }

        throw new Error(
          data?.message ||
            `GitHub API responded with status ${res.status}.`
        );
      }

      if (!Array.isArray(data)) {
        throw new Error(
          data?.message || "Unexpected response from GitHub API."
        );
      }

      setRepos(data);
    } catch (err) {
      console.error("Failed to fetch GitHub repositories:", err);

      setError(
        err.message || "Failed to load repositories from GitHub."
      );

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