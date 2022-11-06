import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DrinkCard from "../drink-card/DrinkCard";

export default function MuiDrinkCarousel({ drinksList }) {
  const [currItem, setCurrItem] = useState(0);

  return (
    <Box sx={{ mb: 8 }}>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        maxWidth="sm"
        sx={{
          mb: 8,
        }}
      >
        <Typography variant="h5" alignSelf="center">
          Maybe some drinks?
        </Typography>
        <Container sx={{ width: "100%" }}>
          <DrinkCard
            product={drinksList[currItem]}
            setCurrItem={setCurrItem}
            currItem={currItem}
            amountDrinks={drinksList.length}
          />
        </Container>
      </Stack>
    </Box>
  );
}
