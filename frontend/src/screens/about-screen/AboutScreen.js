import { Container, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";

const AboutScreen = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <title>About us - KebaBomb</title>
      </Helmet>

      <Container sx={{ mt: 5, maxWidth: "lg" }}>
        <Stack flexDirection="column" alignItems="center" alignContent="center">
          {" "}
          <Typography variant="h4" gutterBottom>
            About us
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            alignContent="center"
            sx={{ mt: 3 }}
          >
            <Typography
              variant="body1"
              gutterBottom
            //   align={{ xs: "center", sm: "left" }}
            align="center"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Typography>
            <Box
              component="img"
              sx={{
                position: "relative",
                maxWidth: { xs: 350, md: 500 },
                m:5
              }}
              alt="KebaBomb Crew"
              src="https://via.placeholder.com/150"
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
