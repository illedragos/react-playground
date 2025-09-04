import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

// Define rocket blast animation
const blastAnimation = keyframes`
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(50vw) translateY(-150vh); }
`;

const RocketBlast: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [blast, setBlast] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  // Trigger blast when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      setBlast(true);
    }
  }, [countdown]);

  const handleStart = () => {
    setCountdown(3);
    setBlast(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      overflow="hidden"
    >
      <Button variant="contained" color="primary" onClick={handleStart}>
        Start
      </Button>

      <Typography variant="h3">
        {countdown !== null && countdown >= 0 ? countdown : ""}
      </Typography>

      <Box
        component="img"
        src="https://www.freeiconspng.com/uploads/rocket-png-1.png" // Free rocket PNG image
        alt="Rocket"
        sx={{
          width: "100px",
          display: countdown === null ? "none" : "block",
          animation: blast ? `${blastAnimation} 2s forwards` : "none",
        }}
      />
    </Box>
  );
};

export default RocketBlast;
