import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Carousel from "react-material-ui-carousel";
import DrinkCard from "../drink-card/DrinkCard";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

export default function DrinkChoiceCarousel({ drinksList }) {
  return (
    <Container maxWidth="sm" sx={{mb:3, mt:3}}>
      <Stack flexDirection="column">
        <Typography variant="h5" alignSelf="center">
        Maybe some drinks?
        </Typography>
        <Carousel
          next={(next, active) => {
            // console.log(`we left ${active}, and are now at ${next}`);
          }}
          prev={(prev, active) => {
            // console.log(`we left ${active}, and are now at ${prev}`);
          }}
          navButtonsProps={{
            style: {
              backgroundColor: "green",
              borderRadius: 3,
            },
          }}
          navButtonsWrapperProps={{
            style: {
              bottom: "0",
              top: "unset",
              // position:"static"
            },
          }}

          //     NextIcon={<RandomIcon/>}
          // PrevIcon={<RandomIcon/>}
        >
          {drinksList.map((drink, i) => (
            <DrinkCard product={drink} />
          ))}
        </Carousel>
      </Stack>
    </Container>
  );
}
