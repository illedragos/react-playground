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
  Stack,
} from "@mui/material";

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
}

export default function ReactIssues() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactIssues = async () => {
      try {
        setLoading(true);
        // Fetch issues from Facebook's React repository
        const response = await fetch(
          "https://api.github.com/repos/facebook/react/issues?state=open&per_page=10&sort=updated"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIssues(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchReactIssues();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
        Error fetching React issues: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        React Issues
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Latest open issues from React repository on GitHub
      </Typography>

      <Stack spacing={2}>
        {issues.map((issue) => (
          <Card key={issue.id} variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <Avatar
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  sx={{ width: 40, height: 40 }}
                />

                <Box flex={1}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Link
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="h6"
                      color="text.primary"
                      underline="hover"
                      sx={{ fontWeight: 600 }}
                    >
                      {issue.title}
                    </Link>
                    <Chip
                      label={`#${issue.number}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {issue.body && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {truncateText(issue.body, 200)}
                    </Typography>
                  )}

                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {issue.labels.map((label) => (
                      <Chip
                        key={label.name}
                        label={label.name}
                        size="small"
                        sx={{
                          bgcolor: `#${label.color}`,
                          color: "#fff",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>

                  <Divider sx={{ mb: 1 }} />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption" color="text.secondary">
                      Created by{" "}
                      <Link
                        href={issue.user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        {issue.user.login}
                      </Link>
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Updated: {formatDate(issue.updated_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {issues.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No issues found.
        </Typography>
      )}
    </Box>
  );
}
