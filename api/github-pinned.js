export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = "MuhammadAsad86";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({
      message: "GitHub token is not configured.",
    });
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(
          first: 6
          types: [REPOSITORY]
        ) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              homepageUrl
              primaryLanguage {
                name
              }
              repositoryTopics(first: 20) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              stargazerCount
              forkCount
              updatedAt
              createdAt
              isPrivate
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("GitHub GraphQL error:", data);

      return res.status(response.status || 500).json({
        message:
          data?.errors?.[0]?.message ||
          "Failed to fetch pinned repositories from GitHub.",
      });
    }

    const pinnedRepos = data?.data?.user?.pinnedItems?.nodes || [];

    const formattedRepos = pinnedRepos
      .filter((repo) => repo && !repo.isPrivate)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "",
        html_url: repo.url,
        homepage: repo.homepageUrl || "",
        language: repo.primaryLanguage?.name || null,
        topics:
          repo.repositoryTopics?.nodes
            ?.map((item) => item.topic?.name)
            .filter(Boolean) || [],
        stargazers_count: repo.stargazerCount || 0,
        forks_count: repo.forkCount || 0,
        updated_at: repo.updatedAt,
        created_at: repo.createdAt,
      }));

    return res.status(200).json(formattedRepos);
  } catch (error) {
    console.error("Failed to fetch GitHub pinned repositories:", error);

    return res.status(500).json({
      message: "Failed to fetch pinned repositories from GitHub.",
    });
  }
}