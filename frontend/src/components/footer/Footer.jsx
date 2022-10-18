import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import Copyright from "../copyright/Copyright";

export default function Footer() {
  return (
    <BottomNavigation sx={{ mt: 5, position:"fixed", bottom:0, left:0, width:"100%", 
    
    
    // zIndex:1
    
    }
 
  }>
      <Container sx={{mt:2}}>
        <Copyright />
      </Container>
    </BottomNavigation>
  );
}
