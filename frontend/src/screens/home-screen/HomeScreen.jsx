import React from "react";
import useApi from "../../utils/customHooks.js";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import CardComponent from "../../components/card/CardComponent.jsx";
import ResponsiveGrid from "../../components/responsie-grid/ResponsiveGrid.js";
import { Helmet } from "react-helmet-async";
import MessegeBox from "../../components/messege-box/MessegeBox.jsx";
import { Box, Stack } from "@mui/system";
import DrinkChoiceCarousel from "../../components/drink-choice/DrinkChoiceCarousel.js";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
// const hoveredStyle = {
//   cursor:<LocalDiningIcon/>
// }


function HomeScreen() {
  const { loading, error, data } = useApi("/api/products");
const foodList = data.filter(product=>product.category==="food");
 const drinksList = data.filter(product=>product.category==="drinks")
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 3 }}
    
    
    
    // sx={{cursor: 'pointer'}}
    
    
    >
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
              <DrinkChoiceCarousel drinksList={drinksList}/>

            </ResponsiveGrid>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomeScreen;
