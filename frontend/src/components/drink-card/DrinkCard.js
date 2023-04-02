import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MessegeBox from "../../components/messege-box/MessegeBox.jsx";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Store } from "../../Store";
import useApi from "../../utils/customHooks";
import { FaStackExchange } from "react-icons/fa";
import { Stack } from "@mui/system";

export default function DrinkCard({
  product,
  setCurrItem,
  currItem,
  amountDrinks,
}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleBack = () => {
    if (currItem === 0) {
      setCurrItem(amountDrinks - 1);
    } else {
      setCurrItem(currItem - 1);
    }
  };

  const handleForward = () => {
    if (currItem === amountDrinks - 1) {
      setCurrItem(0);
    } else {
      setCurrItem(currItem + 1);
    }
  };

  const addToCartHandler = async (item) => {
    console.log("drink add?");
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
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
    <React.Fragment>
      <Paper
        sx={{
          position: "relative",
          backgroundImage: `url(${product.image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          minHeight: "300px",
          padding: "1 rem",
          display: "flex",
        }}
      >
        <Stack direction="column" alignContent="center" justifyContent="center">
          <ArrowBackIosIcon
            className="controls"
            sx={{ padding: "2rem", fontSize: 25 }}
            onClick={handleBack}
          />
        </Stack>
        <Box className="center" sx={{ flex: "90%", height: "100%" }}></Box>
        <Stack direction="column" alignContent="center" justifyContent="center">
          <ArrowForwardIosIcon
            className="controls"
            sx={{ padding: "2rem", fontSize: 25 }}
            onClick={handleForward}
          />
        </Stack>
      </Paper>
      <Stack
        sx={{ backgroundColor: "rgba(0,0,0,0.7)", }}
        direction="column"
        alignItems="center"
      >
        <Link
          component={RouterLink}
          to={`/product/${product.slug}`}
          color="secondary"
        >
          <Typography
            sx={{ ml: 4, color: "white" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {product.name}
          </Typography>
        </Link>
        <Typography sx={{ mb: 1, color: "#eee" }}>
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
            sx={{ mb: 3 }}
          >
            Buy me
          </Button>
        )}
      </Stack>
    </React.Fragment>
  );
}
