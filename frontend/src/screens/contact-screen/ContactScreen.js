import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { ContactForm } from "../../components/contact-form/ContactForm";

export default function ContactScreen() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stack flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <ContactForm/>
      </Stack>
    </Container>
  );
}
