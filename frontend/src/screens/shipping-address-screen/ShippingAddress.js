import { Button, FormControl, Input, InputLabel, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";

export default function ShippingAddress({activeStep,steps,handleNext}) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  // useEffect(() => {
  //   // if (!userInfo) {
  //   //   navigate("/signin?redirect=/shipping");
  //   // }
  // }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    // navigate("/payment");
    handleNext()
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>

      <Typography variant="h6" gutterBottom>
        <h2>Shipping address</h2>
      </Typography>
      <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              autoComplete="shipping full-name"
              variant="standard"
              defaultValue={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete={address || ""}
              // "shipping address"
              variant="standard"
              defaultValue={address}

              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping city"
              variant="standard"
              defaultValue={city}

              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="postalCode"
              name="postalCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              defaultValue={postalCode}

              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              defaultValue={country}

              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
         <Grid item xs={12}>
          {/* <FormControlLabel> */}
          <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
              
            >
              {/* Continue */}
              {activeStep === steps.length - 1 ? "Place order" : "Next"}

            </Button>
          {/* </FormControlLabel> */}
           
          </Grid> 
        </Grid>
      </Box>

  
    </React.Fragment>
  );
}
