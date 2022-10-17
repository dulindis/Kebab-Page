import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import Copyright from "../copyright/Copyright";

export default function Footer() {
  return (
    <BottomNavigation sx={{ mt: 5 }}>
      <Container>
        <Copyright />
      </Container>
    </BottomNavigation>
  );
}
