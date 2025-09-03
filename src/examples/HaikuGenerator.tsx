import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

// Example fixed haiku poems
const haikus = [
  ["An old silent pond", "A frog jumps into the pond", "Splash! Silence again"],
  ["Autumn moonlight—", "a worm digs silently", "into the chestnut"],
  ["In the twilight rain", "these brilliant-hued hibiscus", "A lovely sunset"],
];

// Simple syllable counting function
const countSyllables = (line: string) => {
  line = line.toLowerCase().replace(/[^a-z\s]/g, "");
  if (!line) return 0;
  const words = line.split(/\s+/);
  let count = 0;

  words.forEach((word) => {
    // Basic vowel group counting
    const matches = word.match(/[aeiouy]+/g);
    count += matches ? matches.length : 1;

    // Common adjustments
    if (word.endsWith("e")) count = Math.max(count - 1, 1);
  });

  return count;
};

const HaikuGenerator: React.FC = () => {
  const [haiku, setHaiku] = useState<string[] | null>(null);

  const generateHaiku = () => {
    const randomIndex = Math.floor(Math.random() * haikus.length);
    setHaiku(haikus[randomIndex]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
      gap={3}
    >
      <Button variant="contained" color="primary" onClick={generateHaiku}>
        Generate Haiku
      </Button>

      {haiku && (
        <Card sx={{ minWidth: 300, maxWidth: 500, bgcolor: "#f5f5f5" }}>
          <CardContent>
            {haiku.map((line, index) => (
              <Typography key={index} variant="body1" gutterBottom>
                {line}{" "}
                <Typography component="span" color="textSecondary">
                  ({countSyllables(line)} syllables)
                </Typography>
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default HaikuGenerator;
