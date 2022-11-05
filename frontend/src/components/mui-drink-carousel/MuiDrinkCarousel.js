import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DrinkCard from "../drink-card/DrinkCard";

export default function MuiDrinkCarousel({ drinksList }) {
  const [currItem, setCurrItem] = useState(0);

  return (
    // <Box  sx={{mb:8}} >

    <Stack
      flexDirection="column"
      justifyContent="center"
      // justifyItems="center"
      maxWidth="sm"
      sx={{
        mb: 8,
        // height: "400px",
        // backgroundColor: "blue",
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
        {/* {drinksList.map((drink, i) => (
            <DrinkCard product={drink} />
          ))} */}
        {/* DrinkCard */}
      </Container>
    </Stack>
    //  </Box>
  );
}
