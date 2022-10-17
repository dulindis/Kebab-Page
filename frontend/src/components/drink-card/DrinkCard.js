import { Box, Button, CardActions, CardContent, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Store } from "../../Store";
import Link from "@mui/material/Link";

export default function DrinkCard({ product }) {
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
    <Paper
      sx={{
        height: "500px",
        width: "500px",
      }}
    >
      <Box
        component="img"
        sx={{
          position: "relative",
          maxWidth: { xs: 350, md: 500 },
        }}
        alt={product.name}
        src={product.image}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      />

      {/* <Box sx={{ position: "relative" }}>
        <figure>
          <img src={product.image} alt={product.name} />
        </figure>
      </Box>
 */}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.54)",
          color: "white",
          padding: "10px",
        }}
      >
        <Link component={RouterLink} to={`/product/${product.slug}`} color="secondary">
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>
        <Typography variant="body2">Subtitle</Typography>

        <Typography>
          <strong>
            {product.currency} {product.price}
          </strong>
        </Typography>
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
      </Box>
    </Paper>
  );
}
