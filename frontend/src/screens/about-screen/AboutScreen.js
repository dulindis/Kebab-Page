import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
const ourCrew = require(`./../../assets/kekabomb-crew.jpg`);

const AboutScreen = () => {
  return (
    <Stack flexDirection="row" justifyItems="center" justifyContent="center">
      <Paper sx={{ padding: 4, mt: 4, maxWidth: "md" }}>
        <Helmet>
          <title>About us - KebaBomb</title>
        </Helmet>

        <Container sx={{ mt: 5, maxWidth: "lg" }}>
          <Stack flexDirection="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              About us
            </Typography>
            <Stack
              direction={{ sm: "column", md: "row" }}
              alignItems="center"
              // alignContent="center"
              sx={{ mt: 3 }}
            >
              <Box>
                <Typography variant="body1" gutterBottom>
                  We are here because we would like to share with you our love
                  for kebab and he variety of the kebab world. We offer a wide
                  range of kebab types from all over the world. The meaty basis
                  of Kebabomb's number one fast food is made of veal, lamb or
                  chicken on a kebab skewer. The mixture of spices that gives
                  the meat its special irresistible flavour is top secret, of
                  course. When it comes to veggies, fresh cucumbers, onions,
                  juicy tomatoes, white and red cabbage and crisp iceberg
                  lettuce are the standard options in Berlin. The delicious
                  treat is traditionally finished with three sauces: a strong
                  garlic sauce, an herb sauce, and a fiery hot sauce. The
                  classic döner kebab is served in a warm and slightly crispy
                  pita bread. The same ingredients wrapped in a flatbread is
                  called "dürüm".
                </Typography>
                <Typography variant="h7" color="primary" gutterBottom>
                  <strong>
                    We hope you join us for the world cuisine journey.
                  </strong>
                </Typography>
              </Box>

              <Box
                component="img"
                sx={{
                  position: "relative",
                  maxWidth: { xs: 300, md: 350 },
                  maxHeight: { xs: 400 },
                  m: 2,
                }}
                alt="KebaBomb Crew"
                src={ourCrew}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              />
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </Stack>
  );
};

export default AboutScreen;
