import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function PaymentForm({ activeStep, steps, handleNext }) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  //   shippingAddress: localStorage.getItem("shippingAddress")
  //       ? JSON.parse(localStorage.getItem("shippingAddress"))
  //       : {},

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Stripe"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  console.log(paymentMethodName);

  const handleChange = (event) => {
    setPaymentMethodName(event.target.value);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMehod", paymentMethodName);
    // navigate("/placeorder");
    handleNext();
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <Typography variant="h6" gutterBottom>
        <h2>Payment method</h2>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={submitHandle}>
            <FormControl margin="normal" required fullWidth>
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

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" color="primary">
                  {" "}
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </FormControl>
          </form>
        </Grid>
      </Grid>

      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}
