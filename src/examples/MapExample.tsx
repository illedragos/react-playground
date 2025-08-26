import {
  Container,
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const SAMPLE_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  desc: `This is a short description for item ${i + 1}.`,
}));

export default function MapExample() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant={isSm ? "h5" : "h4"} component="h2" gutterBottom>
        Map Example
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Responsive grid that maps over sample items. Resize the window to see
        the layout adapt.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {SAMPLE_ITEMS.map((item) => (
          <Paper
            key={item.id}
            elevation={1}
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              gutterBottom
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
