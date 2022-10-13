import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import { Store } from "../../Store";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Stripe"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress.navigate]);

  console.log(paymentMethodName);
  //event:React.ChangeEvent<HTMLInputElement>
  const handleChange = (event) => {
    setPaymentMethodName(event.target.value);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMehod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Box>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1>Payment Method</h1>
        <form onSubmit={submitHandle}>
          {/* <Checkbox></Checkbox> */}
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
            <Button type="submit"> Continue</Button>
          </FormControl>
        </form>
      </Box>
    </div>
  );
}
