import React, { useContext, useEffect, useReducer } from "react";
// import Axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CardComponent from "../../components/card/CardComponent";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import { Store } from "../../Store";
import { getError } from "../../utils/utils";
import { toast } from "react-toastify";

import axios from "axios";
import { Grid, ListItem } from "@mui/material";
// import {axiosInstance as axios} from "../../configAxios";

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

const PlaceOrderScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const navigate = useNavigate();

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
      console.log("data", data);
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
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> */}
      <Helmet>
        <title>Preview Order - KebaBomb</title>
      </Helmet>
      <h1>Preview Order</h1>
      <Box>
        <Card>
          <CardContent>
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
          </CardContent>
          <CardActions>
            <Link to="/shipping">Edit Address</Link>
          </CardActions>
        </Card>
        <Divider />

        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Payment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Method:</strong>
              {cart.paymentMethod}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/payment">Edit Payment</Link>
          </CardActions>
        </Card>
        <Divider />

        <Card>
          <CardContent>
            <List>
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
                  <Link to={`/product/${item.slug}`}></Link>
                  <ListItemText secondary={item.quantity} />
                  <ListItemText secondary={`${item.price} ${item.currency}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Link to="/cart">Edit Cart</Link>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
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
          </CardContent>
          <CardActions>
            <Button
              type="button"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0 || loading}
            >
              Place Order
            </Button>
            {loading && <CircularProgress />}
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default PlaceOrderScreen;
