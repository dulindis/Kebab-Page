import React, { useReducer } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Store } from "../../Store";

import axios from "axios";
// import {axiosInstance as axios} from "../../configAxios";



import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import {
  Box,
  Button,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import Link from "@mui/material/Link";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        // payload:action.payload
      };
    case "CREATE_FAIL":
      return {
        ...state,
        loading: false,
        // error:action.payload
      };
    default:
      return state;
  }
};

export default function PlaceOrder({
  activeStep,
  steps,
  handleBack,
  handleNext,
}) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const bulkUpdate = [];
      for (let item of cart.cartItems) {
        bulkUpdate.push(axios.post(`/api/orders/${item._id}`));
      }
      console.log("bulkUpdate", bulkUpdate);
      const res = await axios.all(bulkUpdate);
      console.log("res", res);

      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
      // handleNext()
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Preview Order - KebaBomb</title>
      </Helmet>

      <Container sx={{ mt: 3, minWidth: "md" }}>
        <Stack flexDirection="column" alignItems="center" alignContent="center">
          <Typography variant="h5" gutterBottom>
            Preview Order
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="div">
                Shipping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Name:</strong>
                {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="div">
                Payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Method:</strong>
                {cart.paymentMethod}
              </Typography>
            </Grid>
            <Divider />

            <Grid item xs={12} sm={16}>
              <Typography variant="h6" component="div">
                Items:
              </Typography>
              <List
              // justifyContent="space-between"
              >
                {cart.cartItems.map((item) => (
                  <ListItem
                    divider={true}
                    sx={{ display: "flex", justifyItems: "space-between" }}
                  >
                    <ListItemText primary={item.name} />

                    <Box
                      component="img"
                      src={item.image}
                      maxWidth="130px"
                      alt={item.name}
                      sx={{
                        maxWidth: {
                          xs: "50px",
                          sm: "80px",
                        },
                      }}
                      flexGrow="1"
                    />

                    <ListItemText secondary={`Q: ${item.quantity}`} />
                    <ListItemText
                      secondary={`${item.price} ${item.currency}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Link component={RouterLink} to="/cart">
                Edit
              </Link>
            </Grid>
            <Divider />

            <Grid item xs={12} sm={16}>
              <Typography variant="h5" component="div">
                Order Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Items:</strong>
                {cart.itemsPrice.toFixed(2)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Shipping Price:</strong>
                {cart.shippingPrice.toFixed(2)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Tax Price:</strong>
                {cart.taxPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Order Total:</strong>
                {cart.totalPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
            alignSelf="flex-end"
          >
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
            <Button
              type="submit"
              onClick={placeOrderHandler}
              variant="contained"
              color="primary"
            >
              Place order
            </Button>
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
