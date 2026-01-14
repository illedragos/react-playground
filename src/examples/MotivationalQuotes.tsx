import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Fade,
} from "@mui/material";
import { motivationalQuotes } from "../data/quotes";

const MotivationalQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
      setFadeIn(true);
    }, 300);
  };

  const handlePrevious = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? motivationalQuotes.length - 1 : prev - 1
      );
      setFadeIn(true);
    }, 300);
  };

  const handleRandom = () => {
    setFadeIn(false);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * motivationalQuotes.length);
      } while (newIndex === currentIndex && motivationalQuotes.length > 1);
      setCurrentIndex(newIndex);
      setFadeIn(true);
    }, 300);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          background: "linear-gradient(45deg, #9c27b0, #ba68c8)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
          fontWeight: 700,
        }}
      >
        Motivational Quotes
      </Typography>

      <Card
        elevation={6}
        sx={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent
          sx={{ flex: 1, display: "flex", flexDirection: "column", p: 4 }}
        >
          <Fade in={fadeIn} timeout={500}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                  fontWeight: 400,
                }}
              >
                "{motivationalQuotes[currentIndex]}"
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ mt: 4 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={handlePrevious}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  },
                  minWidth: 100,
                }}
              >
                Previous
              </Button>

              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {currentIndex + 1} / {motivationalQuotes.length}
              </Typography>

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  },
                  minWidth: 100,
                }}
              >
                Next
              </Button>
            </Stack>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={handleRandom}
                sx={{
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                  minWidth: 150,
                }}
              >
                Random Quote
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          All Quotes ({motivationalQuotes.length})
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {motivationalQuotes.map((quote, index) => (
            <Card
              key={index}
              elevation={1}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                bgcolor:
                  index === currentIndex
                    ? "rgba(156, 39, 176, 0.1)"
                    : "background.paper",
                borderLeft:
                  index === currentIndex
                    ? "4px solid #9c27b0"
                    : "4px solid transparent",
                "&:hover": {
                  elevation: 3,
                  transform: "translateX(8px)",
                  bgcolor: "rgba(156, 39, 176, 0.05)",
                },
              }}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setFadeIn(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 300);
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-line",
                    color: "text.secondary",
                  }}
                >
                  {quote}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MotivationalQuotes;
