import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import Stack from "@mui/system/Stack";

const PageNotFoundScreen = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Stack flexDirection="column" alignItems="center">
        <Typography variant="h3" gutterBottom>
          404 Not Found
        </Typography>
        <Typography variant="h7" gutterBottom color="primary">
          Someone ate your page choice :(. Try another page.
        </Typography>
        <Box
          component="img"
          src="https://i.imgur.com/lKJiT77.png"
          alt="Image by storyset"
        ></Box>
      </Stack>
    </Container>
  );
};

export default PageNotFoundScreen;
