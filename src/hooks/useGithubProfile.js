import { useEffect, useState } from "react";

/**
 * Fetches live public profile stats and top repositories from the GitHub
 * REST API (no auth required, rate-limited to 60 req/hr per IP).
 * Repos are sorted by stars as a stand-in for "pinned" projects, since
 * true pinned-repo data requires GitHub's authenticated GraphQL API.
 */
export function useGithubProfile(username) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        const topRepos = [...reposData]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4);

        if (!cancelled) {
          setProfile(profileData);
          setRepos(topRepos);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profile, repos, status };
}
