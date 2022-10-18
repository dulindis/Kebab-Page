import React, { useContext } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import Link from "@mui/material/Link";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import { FaPepperHot } from "react-icons/fa";

import { Link as RouterLink } from "react-router-dom";
import RatingComponent from "../rating/Rating";

import axios from "axios";
import { Store } from "../../Store";

export default function CardComponent({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock.");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Stack flexDirection="column">
        <Link component={RouterLink} to={`/product/${product.slug}`}>
          <CardMedia
            component="img"
            height="140"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <CardContent>
          <Link component={RouterLink} to={`/product/${product.slug}`}>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
          </Link>
          <Typography>
            {product.category === "food" ? (
              <RatingComponent
                rating={product.rating}
                numReviews={product.numReviews}
              />
            ) : (
              ""
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography>
            {product.flavour === "spicy" ? (
              <WhatshotIcon style={{ color: "#A80000" }} />
            ) : (
              ""
            )}
            {/* <FaPepperHot style={{ color: "#A80000" }} /> */}
          </Typography>
          <Typography>
            <strong>
              {product.currency} {product.price}
            </strong>
          </Typography>
        </CardContent>
        <CardActions>
          {product.category === "food" ? (
            <Button size="small">Learn More...</Button>
          ) : (
            ""
          )}
          {product.countInStock === 0 ? (
            <Button disabled>Out of stock</Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              onClick={() => addToCartHandler(product)}
            >
              Buy me
            </Button>
          )}
        </CardActions>
      </Stack>
    </Card>
  );
}
