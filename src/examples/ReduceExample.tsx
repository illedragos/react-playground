import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
} from "@mui/material";

export default function ReduceExample() {
  // Shopping cart example
  interface CartItem {
    name: string;
    price: number;
    quantity: number;
  }

  const cart: CartItem[] = [
    { name: "T-shirt", price: 20, quantity: 2 },
    { name: "Jeans", price: 40, quantity: 1 },
    { name: "Hat", price: 10, quantity: 3 },
  ];

  // Step-by-step accumulation
  const steps: { item: string; accumulator: number }[] = [];
  cart.reduce((acc, item) => {
    const newAcc = acc + item.price * item.quantity;
    steps.push({ item: item.name, accumulator: newAcc });
    return newAcc;
  }, 0);

  // Animation state
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    if (visibleSteps < steps.length) {
      const timer = setTimeout(() => setVisibleSteps(visibleSteps + 1), 3000); // show each step every 1s
      return () => clearTimeout(timer);
    }
  }, [visibleSteps, steps.length]);

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Reduce Example: Shopping Cart
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Cart Items:
      </Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${item.name} - $${item.price} x ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Total Price: $
        {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Step-by-Step Reduce Animation:
      </Typography>
      <Stack spacing={2}>
        {steps.slice(0, visibleSteps).map((step, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              border: "2px solid #1976d2",
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Typography>
              After adding <strong>{step.item}</strong>, accumulator ={" "}
              <strong>${step.accumulator}</strong>
            </Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
