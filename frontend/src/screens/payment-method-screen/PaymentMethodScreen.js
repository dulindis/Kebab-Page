import React, { useContext, useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
// import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import { Store } from "../../Store";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

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
  }, [shippingAddress, navigate]);

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
      {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
      <Box>
        <Helmet>
          <title>Payment Method - KebaBomb</title>
        </Helmet>
        <Typography variant="h5">Payment Method</Typography>
        <form onSubmit={submitHandle}>
          {/* <Checkbox></Checkbox> */}
          <FormControl margin="normal" required fullWidth>
            {/* <FormLabel id="payment-methods-group-label">
              Payment method
            </FormLabel> */}
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
