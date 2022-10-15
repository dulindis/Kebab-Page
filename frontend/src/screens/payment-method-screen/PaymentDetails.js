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
  Container,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Stack } from "@mui/system";

export default function PaymentForm({
  activeStep,
  steps,
  handleBack,
  handleNext,
}) {
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
      // navigate("/shipping");
      navigate("/checkout");
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

      <Container sx={{ mt: 3 }}>

        <Stack alignItems="center">

          <Typography variant="h5" gutterBottom>
            Payment method
          </Typography>

          <Box sx={{ mt: 3, maxWidth: "sm" }}>
            {/* <Grid container spacing={3}> */}
              {/* <Grid item xs={12} md={16}> */}
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
                  </FormControl>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </form>
              {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
