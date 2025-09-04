import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";

export default function UseEffectExample() {
  const [isVisible, setIsVisible] = useState<boolean>(!document.hidden);
  const [isFocused, setIsFocused] = useState<boolean>(document.hasFocus());
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      console.log(visible ? "Tab is visible ✅" : "Tab is hidden ⏸️");
    };

    const handleWindowBlur = () => {
      setIsFocused(false);
      console.log("Window lost focus ⏸️");
    };

    const handleWindowFocus = () => {
      setIsFocused(true);
      console.log("Window gained focus ✅");
      setWelcomeMessage("👋 Welcome back!");
      const timer = setTimeout(() => setWelcomeMessage(null), 3000);
      return () => clearTimeout(timer);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  return (
    <Container sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        UseEffect Example
      </Typography>

      <Typography variant="h6" gutterBottom>
        {isVisible ? "✅ Tab is visible" : "⏸️ Tab is hidden"}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {isFocused ? "✅ Window has focus" : "⏸️ Window lost focus"}
      </Typography>

      {welcomeMessage && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            bgcolor: "success.light",
            color: "success.contrastText",
            borderRadius: 2,
            display: "inline-block",
            transition: "opacity 0.7s",
          }}
        >
          <Typography variant="h6">{welcomeMessage}</Typography>
        </Box>
      )}
    </Container>
  );
}
