import {
  Container,
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useState } from "react";

const getRandomItem = (arr: string[]): string =>
  arr[Math.floor(Math.random() * arr.length)];

const generateSeltzerFlavor = (
  adjectives: string[],
  flavors: string[]
): string => {
  const adjective = getRandomItem(adjectives);
  const firstFlavor = getRandomItem(flavors);
  let secondFlavor = getRandomItem(flavors);
  while (secondFlavor === firstFlavor) {
    secondFlavor = getRandomItem(flavors);
  }
  return `${adjective} ${firstFlavor} ${secondFlavor}`;
};

const ADJECTIVES = [
  "Funky",
  "Wacky",
  "Zesty",
  "Tangy",
  "Juicy",
  "Spicy",
  "Sweet",
  "Savory",
  "Bold",
  "Fresh",
  "Tropical",
  "Wild",
  "Creamy",
  "Crisp",
  "Rich",
];

const FLAVORS = [
  "Raspberry",
  "Pineapple",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Watermelon",
  "Peach",
  "Lemon",
  "Coconut",
  "Passionfruit",
  "Grapefruit",
  "Blackberry",
  "Cherry",
  "Apple",
  "Banana",
  "Kiwi",
  "Guava",
  "Papaya",
  "Lychee",
  "Dragonfruit",
  "Pomegranate",
];

export default function SeltzerTree() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [flavorsList, setFlavorsList] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: generateSeltzerFlavor(ADJECTIVES, FLAVORS),
    }))
  );

  const regenerateFlavors = () => {
    setFlavorsList(
      Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: generateSeltzerFlavor(ADJECTIVES, FLAVORS),
      }))
    );
  };

  // Split elements into pyramid rows
  const row1 = [flavorsList[0]];
  const row2 = flavorsList.slice(1, 3);
  const row3 = flavorsList.slice(3, 6);

  const renderRow = (row: typeof flavorsList) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mb: 2,
      }}
    >
      {row.map((item) => (
        <Paper
          key={item.id}
          elevation={4}
          sx={{
            p: 3,
            minWidth: "120px",
            textAlign: "center",
            borderRadius: "1.5rem",
            background: "linear-gradient(135deg, #FFE082, #FFCC80)",
            color: "#6A1B9A",
            fontWeight: 700,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          {item.name}
        </Paper>
      ))}
    </Box>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant={isSm ? "h5" : "h4"}
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: 700 }}
      >
        Random Seltzer Flavors Tree
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
        Fun & quirky flavor combinations in a pyramid layout. Click the button
        to generate new ones!
      </Typography>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          onClick={regenerateFlavors}
          sx={{
            background: "linear-gradient(45deg, #FF8A65, #FFB74D)",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            "&:hover": {
              background: "linear-gradient(45deg, #FF7043, #FFA726)",
            },
          }}
        >
          Generate New Flavors
        </Button>
      </Box>

      {/* Pyramid rows */}
      {renderRow(row1)}
      {renderRow(row2)}
      {renderRow(row3)}
    </Container>
  );
}
