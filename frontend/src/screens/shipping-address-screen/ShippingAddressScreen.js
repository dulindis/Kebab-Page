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
    <React.Fragment>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>
      {/* <Box> */}
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}

      {/* </Box> */}
      <Typography variant="h6" gutterBottom>
        Shipping address
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
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Continue
            </Button>
          {/* <Grid item xs={12}>
          <FormControlLabel>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Continue
            </Button>
          </FormControlLabel>
           
          </Grid> */}
        </Grid>
      </Box>

      {/* <form onSubmit={submitHandler}>
         <FormControl margin="normal" required fullWidth>
        
          <InputLabel htmlFor="fullName">Full Name</InputLabel>
          <Input
            id="fullName"
            name="fullName"
            value={fullName}
            autoComplete="fullName"
            autoFocus
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormControl> 
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            id="address"
            name="address"
            value={address}
            autoComplete="address"
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl> 

       <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            name="city"
            value={city}
            autoComplete="city"
            autoFocus
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>  
     <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
          <Input
            id="postalCode"
            name="postalCode"
            value={postalCode}
            autoComplete="postalCode"
            autoFocus
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormControl> 
       <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="country">Country</InputLabel>
          <Input
            id="country"
            name="country"
            value={country}
            autoComplete="country"
            autoFocus
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormControl> 
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
        >
          Continue
        </Button>
      </form> */}
    </React.Fragment>
  );
}
