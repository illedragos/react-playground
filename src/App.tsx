import "./App.css";
import { useState } from "react";

// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useTheme, useMediaQuery } from "@mui/material";

// Router
import { NavLink, Routes, Route } from "react-router-dom";

// Examples
import ReduceExample from "./examples/ReduceExample";
import UseEffectExample from "./examples/UseEffectExample";
import MapExample from "./examples/MapExample";
import HaikuGenerator from "./examples/HaikuGenerator";
import Modals from "./examples/Modals";
import SeltzerFlavorGenerator from "./examples/SeltzerFlavorGenerator";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/reduce", label: "Reduce Example" },
  { to: "/use-effect", label: "Use Effect Example" },
  { to: "/map", label: "Map Example" },
  { to: "/haiku-generator", label: "Haiku Generator" },
  { to: "/seltzer-flavor-generator", label: "Seltzer Flavor Generator" },
  { to: "/modals", label: "Modals" },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (next: boolean) => () => setOpen(next);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, color: "text.primary", mr: 2 }}
          >
            React Playground
          </Typography>

          {/* Desktop / tablet centered nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, mx: "auto" }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.to}
                  component={NavLink}
                  to={link.to}
                  end={link.end}
                  color="inherit"
                  disableRipple
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    px: 2,
                    py: 0.6,
                    borderRadius: 999,
                    fontWeight: 500,
                    fontSize: 14,
                    transition: "all 150ms ease",
                    border: "1px solid transparent",
                    "&:hover": {
                      bgcolor: "action.hover",
                      color: "text.primary",
                    },
                    "&.active": {
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0,0,0,0.08)"
                          : "rgba(255,255,255,0.08)",
                      color: "text.primary",
                      boxShadow: (theme) => theme.shadows[1],
                      border: (theme) =>
                        `1px solid ${theme.palette.action.selected}`,
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile: menu button and drawer */}
          {isMobile && (
            <Box sx={{ ml: "auto" }}>
              <IconButton onClick={toggleDrawer(true)} aria-label="menu">
                <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                  ☰
                </Box>
              </IconButton>

              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{ width: 260 }}
                  role="presentation"
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {NAV_LINKS.map((link) => (
                      <ListItemButton
                        key={link.to}
                        component={NavLink}
                        to={link.to}
                        end={link.end}
                        onClick={toggleDrawer(false)}
                        sx={{
                          "&.active": { bgcolor: "action.selected" },
                        }}
                      >
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    ))}
                  </List>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth>
                      New
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          )}

          {/* Desktop auxiliary actions */}
          {!isMobile && (
            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                New
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Typography variant="h4">Welcome — select an example</Typography>
        }
      />

      <Route path="/reduce" element={<ReduceExample />} />
      <Route path="/use-effect" element={<UseEffectExample />} />
      <Route path="/map" element={<MapExample />} />
      <Route path="/haiku-generator" element={<HaikuGenerator />} />
      <Route
        path="/seltzer-flavor-generator"
        element={<SeltzerFlavorGenerator />}
      />
      <Route path="/modals" element={<Modals />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <NavBar />

      <Container sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </Box>
  );
}
