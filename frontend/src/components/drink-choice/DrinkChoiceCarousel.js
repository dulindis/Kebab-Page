import { Container } from "@mui/material";
import React, { useState } from "react";

import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import DrinkCard from "../drink-card/DrinkCard";
import { Box } from "@mui/system";

export default function DrinkChoiceCarousel({ drinksList }) {
  const [drink, setDrink] = useState("");

  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Container maxWidth="sm"   
//     display="flex"
//     flexDirection="column"
// justifyContent="center"
// alignItems="center"
>
      <Box  
    
  >
        {" "}
        <h2>Maybe some drinks?</h2>
        <Carousel
          next={(next, active) => {
            console.log(`we left ${active}, and are now at ${next}`);
          }}
          prev={(prev, active) => {
            console.log(`we left ${active}, and are now at ${prev}`);
          }}

          navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: 'green',
            borderRadius: 3
        }
    }} 
          navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
            bottom: '0',
            top: 'unset'
        }
    }} 
          //     NextIcon={<RandomIcon/>}
          // PrevIcon={<RandomIcon/>}
        >
          {drinksList.map((drink, i) => (
            <DrinkCard product={drink} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}

// function Item({item}) {
//   return (
//     <Paper>
//       {/* <h2>{item.name}</h2>
//       <p>{item.price}</p> */}

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }
