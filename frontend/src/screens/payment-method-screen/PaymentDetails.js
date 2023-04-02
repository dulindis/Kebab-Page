import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMehod", paymentMethodName);
    // navigate("/placeorder");
    handleNext();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Payment Method - KebaBomb</title>
      </Helmet>

      <Container sx={{ mt: 3, minWidth: "md" }}>
        <Stack flexDirection="column" alignItems="center" alignContent="center">
          <Typography variant="h5" gutterBottom>
            Payment method
          </Typography>

          <Box
            component="form"
            onSubmit={submitHandler}
            // sx={{ mt: 3, maxWidth: "sm" }}
            alignSelf="stretch"
          >
            <Stack
              flexDirection="column"
              alignContent="center"
              alignItems="center"
            >
              <FormControl
                margin="normal"
                required
                fullWidth
                // sx={{ ml: 15}}
              >
                <FormLabel id="payment-methods-group-label">
                  Available options
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
              <Stack
                alignItems="baseline"
                flexDirection="row"
                alignSelf="flex-end"

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
      </Container>
    </Container>
  );
}
