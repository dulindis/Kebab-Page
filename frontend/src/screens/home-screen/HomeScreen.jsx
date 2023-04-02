import React from "react";
import { Helmet } from "react-helmet-async";

import useApi from "../../utils/customHooks.js";
import ResponsiveGrid from "../../components/responsie-grid/ResponsiveGrid.js";
import MessegeBox from "../../components/messege-box/MessegeBox.jsx";

import Box from "@mui/material/Box";
import CardComponent from "../../components/card/CardComponent.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DrinkChoiceCarousel from "../../components/drink-choice-carousel/DrinkChoiceCarousel.js";
import MuiDrinkCarousel from "../../components/mui-drink-carousel/MuiDrinkCarousel.js";
import CarouselComponent from "../../components/mui-carousel/CarouselComponent.jsx";

function HomeScreen() {
  const { loading, error, data } = useApi("/api/products");
  const foodList = data.filter((product) => product.category === "food");
  const drinksList = data.filter((product) => product.category === "drinks");
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
      <Helmet>
        <title>KebaBomb - Kebab Shop</title>
      </Helmet>
      <Stack flexDirection="column" alignItems="center">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Our dishes
        </Typography>
        <Box>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <MessegeBox>{error}</MessegeBox>
          ) : (
            <ResponsiveGrid>
              {foodList.map((product) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={product.slug}>
                    <CardComponent product={product} />
                  </Grid>
                );
              })}
              <Grid item xs={12} sm={6}>
                {/* <MuiDrinkCarousel drinksList={drinksList} /> */}{" "}
                <CarouselComponent drinksList={drinksList} />
              </Grid>

              {/* <DrinkChoiceCarousel drinksList={drinksList} /> */}
            </ResponsiveGrid>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomeScreen;
