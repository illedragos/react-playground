import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { keyframes } from "@mui/system";

// Animation for the gradient progress bar
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Local storage key for persisting the progress value
const PROGRESS_STORAGE_KEY = "react-playground-progress";

const ProgressBar: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved percentage from localStorage on component mount
  useEffect(() => {
    const savedPercentage = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedPercentage !== null) {
      const parsedValue = parseInt(savedPercentage, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setPercentage(parsedValue);
        setIsLoaded(true);
      }
    }
  }, []);

  const handlePercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(0, Math.min(100, Number(event.target.value) || 0));
    setPercentage(value);

    // Save to localStorage whenever the value changes
    localStorage.setItem(PROGRESS_STORAGE_KEY, value.toString());
  };

  const clearProgress = () => {
    setPercentage(0);
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    setIsLoaded(false);
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          background: "linear-gradient(45deg, #1976d2, #42a5f5)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
        }}
      >
        Progress Bar
      </Typography>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          {/* Storage indicator */}
          {isLoaded && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Chip
                label="Value restored from previous session"
                color="success"
                variant="outlined"
                size="small"
              />
            </Box>
          )}

          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter percentage (0-100)"
              type="number"
              value={percentage}
              onChange={handlePercentageChange}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              variant="outlined"
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      percentage < 25
                        ? "#f44336"
                        : percentage < 50
                        ? "#ff9800"
                        : percentage < 75
                        ? "#2196f3"
                        : "#4caf50",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      percentage < 25
                        ? "#f44336"
                        : percentage < 50
                        ? "#ff9800"
                        : percentage < 75
                        ? "#2196f3"
                        : "#4caf50",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      percentage < 25
                        ? "#f44336"
                        : percentage < 50
                        ? "#ff9800"
                        : percentage < 75
                        ? "#2196f3"
                        : "#4caf50",
                  },
                },
              }}
            />

            <Button
              variant="outlined"
              color="error"
              onClick={clearProgress}
              size="small"
              sx={{ height: "fit-content" }}
            >
              Clear
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6" color="text.primary" fontWeight={600}>
                Progress
              </Typography>
              <Typography variant="h6" color="text.primary" fontWeight={600}>
                {`${percentage}%`}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 20,
                borderRadius: 10,
                bgcolor: "rgba(0,0,0,0.1)",
                width: "100%",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                  background:
                    percentage < 25
                      ? "linear-gradient(90deg, #f44336, #ff7043, #ffab91)"
                      : percentage < 50
                      ? "linear-gradient(90deg, #ff9800, #ffb74d, #ffcc02)"
                      : percentage < 75
                      ? "linear-gradient(90deg, #2196f3, #42a5f5, #90caf9)"
                      : "linear-gradient(90deg, #4caf50, #66bb6a, #81c784)",
                  backgroundSize: "200% 200%",
                  animation:
                    percentage > 0
                      ? `${gradientShift} 3s ease infinite`
                      : "none",
                  boxShadow:
                    percentage > 0
                      ? percentage < 25
                        ? "0 4px 16px rgba(244, 67, 54, 0.4)"
                        : percentage < 50
                        ? "0 4px 16px rgba(255, 152, 0, 0.4)"
                        : percentage < 75
                        ? "0 4px 16px rgba(33, 150, 243, 0.4)"
                        : "0 4px 16px rgba(76, 175, 80, 0.4)"
                      : "none",
                  transition: "box-shadow 0.3s ease, background 0.3s ease",
                },
              }}
            />
          </Box>

          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              mt: 3,
              fontWeight: 600,
              color:
                percentage === 0
                  ? "text.secondary"
                  : percentage < 25
                  ? "#f44336"
                  : percentage < 50
                  ? "#ff9800"
                  : percentage < 75
                  ? "#2196f3"
                  : "#4caf50",
              transition: "color 0.3s ease",
            }}
          >
            {percentage === 0 && "Enter a value to see the progress"}
            {percentage > 0 && percentage < 25 && "🚀 Getting started..."}
            {percentage >= 25 && percentage < 50 && "⚡ Making progress..."}
            {percentage >= 50 && percentage < 75 && "🔥 Halfway there!"}
            {percentage >= 75 && percentage < 100 && "✨ Almost complete!"}
            {percentage === 100 && "🎉 Complete!"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressBar;
