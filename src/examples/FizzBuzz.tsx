import { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function FizzBuzz() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);

  const fizzBuzz = (num: number): string => {
    if (num % 3 === 0 && num % 5 == 0) {
      return "FizzBuzz";
    } else if (num % 3 === 0) {
      return "Fizz";
    } else if (num % 5 == 0) {
      return "Buzz";
    }
    return num.toString();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);

    // Reset previous state
    setError("");
    setNumbers([]);

    // Validate input
    if (value === "") {
      return;
    }

    const num = parseInt(value, 10);

    // Check if it's a valid number
    if (isNaN(num)) {
      setError("Please enter a valid number");
      return;
    }

    // Check if it's between 1 and 1000
    if (num < 1 || num > 1000) {
      setError("Number must be between 1 and 1000");
      return;
    }

    // Generate array of numbers from 1 to the entered number
    const numberArray = Array.from({ length: num }, (_, i) => i + 1);
    setNumbers(numberArray);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Fizz Buzz
      </Typography>

      <TextField
        label="Enter a number (1-1000)"
        type="number"
        value={input}
        onChange={handleInputChange}
        error={!!error}
        helperText={error}
        sx={{ mb: 2, minWidth: 250 }}
        inputProps={{ min: 1, max: 1000 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {numbers.length > 0 && (
        <List sx={{ maxHeight: 400, overflow: "auto" }}>
          {numbers.map((num) => (
            <ListItem key={num} dense sx={{ justifyContent: "center" }}>
              <ListItemText
                primary={fizzBuzz(num)}
                sx={{
                  textAlign: "center",
                  "& .MuiListItemText-primary": {
                    fontSize: "1.25rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
