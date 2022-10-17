import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import { Store } from "../../Store";

export default function ShippingAddressScreen() {
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

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

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
    navigate("/payment");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Shipping Details - KebaBomb</title>
      </Helmet>
      {/* <Box> */}
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}

      {/* </Box> */}

      <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              autoComplete="shipping full-name"
              variant="standard"
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
              autoComplete="shipping address"
              variant="standard"
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
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Container maxWidth="xs">
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

            >
              Continue
            </Button>
          </Container>

        </Grid>
      </Box>
    </Container>
  );
}
