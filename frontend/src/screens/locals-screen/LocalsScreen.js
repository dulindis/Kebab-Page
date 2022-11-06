import { Container, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
const ourLocal = require(`./../../assets/our-local.jpg`);

const LocalsScreen = () => {
  return (
    <Stack flexDirection="row" justifyItems="center" justifyContent="center">
    <Paper sx={{padding:4, mt:4, maxWidth:"sm"}}>
      <Stack alignItems="center" sx={{maxWidth:"sm"}}>
        <Helmet>
          <title>Out locals - KebaBomb</title>
        </Helmet>

        <Typography variant="h4" gutterBottom>
          Our location
        </Typography>
        <Typography variant="body1" gutterBottom color="primary">
          You can find us at Vasagatan 13, Isafjordur. We are waiting for you
          between 10am and 23pm. Come and try our delicious food :)!
        </Typography>
        <Box
          component="img"
          src={ourLocal}
          alt="Kebabomb Local"
          sx={{ m: 3 }}
        ></Box>
      </Stack>
      </Paper>
   </Stack>
  );
};

export default LocalsScreen;
