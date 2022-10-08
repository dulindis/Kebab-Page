import { Button, FormControl, Input, InputLabel, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
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
  }, [userInfo,navigate]);

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
    <div>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>
      <h1>Shipping Address</h1>
      <Paper>
        <form onSubmit={submitHandler}>
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
        </form>
      </Paper>
    </div>
  );
}
