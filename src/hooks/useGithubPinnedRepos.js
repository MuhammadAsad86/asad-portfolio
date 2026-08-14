import { useCallback, useEffect, useState } from "react";

export default function useGithubPinnedRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPinnedRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/github-pinned");

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        throw new Error(
          data?.message ||
            `Failed to fetch pinned repositories. Status: ${res.status}`
        );
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response while loading pinned repositories.");
      }

      setRepos(data);
    } catch (err) {
      console.error("Failed to fetch GitHub pinned repositories:", err);

      setError(
        err.message || "Failed to load pinned repositories from GitHub."
      );

      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPinnedRepos();
  }, [fetchPinnedRepos]);

  return {
    repos,
    loading,
    error,
    refetch: fetchPinnedRepos,
  };
}