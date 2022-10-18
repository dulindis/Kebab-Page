import { Container, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
const ourCrew = require(`./../../assets/kekabomb-crew.jpg`);

const AboutScreen = () => {
  return (
    <Container component="main" maxWidth="md" >
      <Helmet>
        <title>About us - KebaBomb</title>
      </Helmet>

      <Container sx={{ mt: 5, maxWidth: "lg" }}>
        <Stack flexDirection="column" 
        alignItems="center" 
        >
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
              <Typography
                variant="body1"
                gutterBottom
              >
                We are here because we would like to share with you our love for
                kebab and he variety of the kebab world. We offer a wide range
                of kebab types from all over the world. The meaty basis of
                Kebabomb's number one fast food is made of veal, lamb or chicken
                on a kebab skewer. The mixture of spices that gives the meat its
                special irresistible flavour is top secret, of course. When it
                comes to veggies, fresh cucumbers, onions, juicy tomatoes, white
                and red cabbage and crisp iceberg lettuce are the standard
                options in Berlin. The delicious treat is traditionally finished
                with three sauces: a strong garlic sauce, an herb sauce, and a
                fiery hot sauce. The classic döner kebab is served in a warm and
                slightly crispy pita bread. The same ingredients wrapped in a
                flatbread is called "dürüm".
              </Typography>
              <Typography variant="h7" color="primary" gutterBottom >
              
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
                m: 2
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
      {/* 
    <Container sx={{ mt: 3,minWidth:"md"}}>
    
      <Stack 
      flexDirection="column"
      alignItems="center"
      alignContent="center"
      >
        <Typography variant="h5" gutterBottom>
          Payment method
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          // sx={{ mt: 3, maxWidth: "sm" }}
          alignSelf="stretch"
        >
          <Stack flexDirection="column" alignContent="center" alignItems="center">
            <FormControl
              margin="normal"
              required
              fullWidth
              // sx={{ ml: 15}}
            >
              <FormLabel id="payment-methods-group-label">
                Payment method
              </FormLabel>
              <RadioGroup
                name="payment-methods-group"
                aria-labelledby="payment-methods-group-label"
                defaultValue={paymentMethodName}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="PayPal"
                  value="PayPal"
                  checked={paymentMethodName === "PayPal"}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Stripe"
                  value="Stripe"
                  checked={paymentMethodName === "Stripe"}
                />
              </RadioGroup>
            </FormControl>
            <Stack alignItems="baseline"  flexDirection="row" alignSelf="flex-end"  
            
            // sx={{ display: "flex", alignItems:"center",justifyContent: "flex-end" }}
            >
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container> */}
    </Container>
  );
};

export default AboutScreen;
