import { Box, Typography, Card, CardContent, Link, List } from "@mui/material";

interface Website {
  website: string;
  description: string;
}

const utilityWebsites: Website[] = [
  {
    website: "https://roadmap.sh/",
    description:
      "Interactive learning roadmaps and guides for software developers.",
  },
  {
    website: "https://github.com/public-apis/public-apis",
    description: "A curated list of free public APIs for developers.",
  },
  {
    website: "https://skills.sh/",
    description: "Skill-based learning tracks to improve developer abilities.",
  },
];

export default function UtilityWebsites() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Utility Websites
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A curated collection of useful developer resources and tools.
      </Typography>

      <List sx={{ width: "100%" }}>
        {utilityWebsites.map((item, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Link
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  display: "block",
                  mb: 1,
                }}
              >
                {item.website}
              </Link>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
}
