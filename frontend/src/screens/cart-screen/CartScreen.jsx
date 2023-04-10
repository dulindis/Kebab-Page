import React, { useContext } from "react";
import axios from "axios";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// import DrinkChoice from "../../components/drink-choice/DrinkChoice";

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const updateCartHandler = async (item, quantity) => {
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

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const checkoutHandler = () => {
    // navigate('/signin?redirect=/shipping');
    navigate("/signin?redirect=/checkout");
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>

        {cartItems.length === 0 ? (
          <Stack alignItems="center">
            <Typography variant="h6" gutterBottom>
              Cart is empty
            </Typography>
            <Link component={RouterLink} to="/">
              Go shopping
            </Link>
          </Stack>
        ) : (
          <Stack alignItems="center">
            <Typography variant="h4" component="div">
              Shopping Cart
            </Typography>
            <List>
              {cartItems.map((item) => (
                <Stack
                // alignItems="center"
                >
                  <ListItem
                    divider={true}
                    key={item._id}
                    sx={{ width: "100%" }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      maxWidth="130px"
                      alt={item.name}
                    ></Box>
                    <ListItemText primary={item.name} sx={{ ml: 3 }} />
                    <Button
                      disabled={item.quantity === 1}
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                    {item.quantity}
                    <Button
                      disabled={item.quantity === item.countInStock}
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                    >
                      <AddCircleOutlineIcon />
                    </Button>
                    Per item: {item.price} {item.currency}
                    <Button onClick={() => removeItemHandler(item)}>
                      <DeleteForeverIcon />
                    </Button>
                  </ListItem>
                </Stack>
              ))}
            </List>
            <Box sx={{ alignSelf: "flex-end", mr: 2, mb: 1 }}>
              Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : USD{" "}
              <strong>
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </strong>
            </Box>

            <Box sx={{ alignSelf: "flex-end", mr: 1 }}>
              <Button
                disabled={cartItems.length === 0}
                onClick={() => checkoutHandler()}
              >
                Proceed to checkout
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    </React.Fragment>
  );
}
