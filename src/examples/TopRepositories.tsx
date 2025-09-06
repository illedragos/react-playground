import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  Link,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepository[];
}

export default function TopRepositories() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRepositories = async () => {
      try {
        setLoading(true);
        // Search for repositories sorted by stars (top 10)
        const response = await fetch(
          "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=10"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GitHubSearchResponse = await response.json();
        setRepositories(data.items);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopRepositories();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      C: "#555555",
      "C#": "#239120",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#fa7343",
      Kotlin: "#A97BFF",
      Shell: "#89e051",
      HTML: "#e34c26",
      CSS: "#1572B6",
    };
    return colors[language] || "#858585";
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error fetching top repositories: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Top GitHub Repositories
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Top 10 most starred repositories on GitHub
      </Typography>

      <Grid container spacing={3}>
        {repositories.map((repo, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={repo.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                  <Box
                    sx={{
                      minWidth: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Avatar
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box flex={1}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="h6"
                      color="text.primary"
                      underline="hover"
                      sx={{ fontWeight: 600, display: "block" }}
                    >
                      {repo.name}
                    </Link>
                    <Typography variant="caption" color="text.secondary">
                      by{" "}
                      <Link
                        href={repo.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        {repo.owner.login}
                      </Link>
                    </Typography>
                  </Box>
                </Box>

                {repo.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.5 }}
                  >
                    {repo.description}
                  </Typography>
                )}

                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {repo.language && (
                    <Chip
                      label={repo.language}
                      size="small"
                      sx={{
                        bgcolor: getLanguageColor(repo.language),
                        color: "#fff",
                        fontSize: "0.75rem",
                      }}
                    />
                  )}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  ))}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" gap={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography variant="caption" sx={{ fontSize: "1rem" }}>
                        ⭐
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatNumber(repo.stargazers_count)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography variant="caption" sx={{ fontSize: "1rem" }}>
                        🍴
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatNumber(repo.forks_count)}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Updated: {formatDate(repo.updated_at)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {repositories.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No repositories found.
        </Typography>
      )}
    </Box>
  );
}
