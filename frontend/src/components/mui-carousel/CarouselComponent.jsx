import React, { useState } from "react";
import Box from "@mui/material/Box";

import "./style.css";
import DrinkCard from "../drink-card/DrinkCard";

function CarouselComponent({ drinksList }) {
  const [currItem, setCurrItem] = useState(0);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <Box sx={{ mb: 8 }} id="carouser-1">
          <DrinkCard
            product={drinksList[currItem]}
            setCurrItem={setCurrItem}
            currItem={currItem}
            amountDrinks={drinksList.length}
          />
          <Box className="circle-container">
            {drinksList.map((drink, i) => {
              return (
                <div
                  className={`circle 
              ${
                drinksList.indexOf(drinksList[currItem]) === i
                  ? " circle-full"
                  : ""
              }`}
                ></div>
              );
            })}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default CarouselComponent;
