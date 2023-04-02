import React from "react";
import { ContactForm } from "../../components/contact-form/ContactForm";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ContactScreen() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stack flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <ContactForm />
      </Stack>
    </Container>
  );
}
