import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// MUI theme
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f6f7fb",
      paper: "#ffffff",
    },
    primary: {
      main: "#646cff",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/react-playground">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
