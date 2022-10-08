import { Container, Box, ListItem, List, Button } from "@mui/material";
import { Store } from "../../Store";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate=useNavigate()

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

  const removeItemHandler =  (item)=>{
    ctxDispatch({
        type:  "CART_REMOVE_ITEM",
        payload:item
      });

  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignContent={"center"}
      >
        <Box display="flex" flexDirection={{ xs: "column" }}>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link to="/">Go shopping</Link>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <Box key={item._id}>
                  <List>
                    <ListItem>
                      <figure className="product-image">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-thumbnail"
                        />{" "}
                      </figure>
                    </ListItem>

                    <ListItem>{item.name}</ListItem>

                    <ListItem>
                      <Button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <RemoveCircleOutlineIcon />
                      </Button>
                      {item.quantity}
                      <Button
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <AddCircleOutlineIcon />
                      </Button>
                    </ListItem>
                    <ListItem>{item.price}</ListItem>
                    <ListItem>
                      <Button onClick={() => removeItemHandler(item)}>
                        <DeleteForeverIcon />
                      </Button>
                    </ListItem>
                  </List>
                  <Box>
                    Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                    : ISK{" "}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </Box>

                </Box>
              ))}
              <Button disabled={cartItems.length === 0}
                  onClick={()=>checkoutHandler()}>
                    Proceed to checkout
                  </Button>
            </div>
          )}
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
}
