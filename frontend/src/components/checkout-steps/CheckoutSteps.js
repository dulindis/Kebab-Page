import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React from "react";

export default function CheckoutSteps({ steps, activeStep }) {
  return (
    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
