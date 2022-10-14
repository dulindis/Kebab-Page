import React, { useReducer } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";

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

export default function PlaceOrder({ activeStep, steps, handleNext }) {
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
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
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
        <title>Preview Order</title>
      </Helmet>
      <Typography variant="h6" gutterBottom>
        <h2>Preview Order</h2>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="div">
            Shipping
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Name:</strong>
            {cart.shippingAddress.fullName} <br />
            <strong>Address:</strong>
            {cart.shippingAddress.address},{cart.shippingAddress.city},
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </Typography>

          <Link to="/shipping">Edit</Link>
        </Grid>
        <Divider />
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="div">
            Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Method:</strong>
            {cart.paymentMethod}
          </Typography>
          <Link to="/payment">Edit</Link>
          {/* <Divider /> */}
        </Grid>
        <Divider />

        <Grid item xs={12} sm={16}>
        <Typography variant="h5" component="div">
            Items:
          </Typography>
          <List>
            <li>
              {cart.cartItems.map((item) => (
                <ListItem divider={true} component="a" href="#simple-list">
                  <ListItemText primary={item.name} />

                  <figure className="product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-thumbnail"
                    />{" "}
                  </figure>

                  {/* <img src={item.image} alt={item.name}></img> */}
                  <Link to={`/product/${item.slug}`}></Link>
                  <ListItemText secondary={item.quantity} />
                  <ListItemText secondary={`${item.price} ${item.currency}`} />
                </ListItem>
              ))}
            </li>
          </List>
          <Link to="/cart">Edit</Link>
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
          <Button
            type="button"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0 || loading}
          >
            {" "}
            Place Order
          </Button>
          {loading && <CircularProgress />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
