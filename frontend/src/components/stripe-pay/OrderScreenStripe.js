import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  List,
  Link,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Store } from "../../Store";
import axios from "axios";
import { getError } from "../../utils/utils";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/system";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import PayPalPay from "../paypal-pay/PayPalScreen";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
}

export default function OrderScreenStripe() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems } = cart;

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });

  const onApprove = async () => {
    console.log("token", userInfo.token);
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        {orderId:orderId},
        // details,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      // const { data } = await axios({
      //   method: "put",
      //   url: `/api/orders/${order._id}/pay`,
      //   data: {
      //     orderId: orderId,
      //   },
      //   headers: { Authorization: `Bearer ${userInfo.token}` },
      // });

      dispatch({ type: "PAY_SUCCESS", payload: data });
      toast.success("Order is paid");
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  //   useEffect(() => {
  //     const fetchOrder = async () => {
  //       try {
  //         dispatch({ type: "FETCH_REQUEST" });
  //         const { data } = await axios.get(`/api/orders/${orderId}`, {
  //           headers: { authorization: `Bearer ${userInfo.token}` },
  //         });
  //         dispatch({ type: "FETCH_SUCCESS", payload: data });
  //       } catch (err) {
  //         dispatch({ type: "FETCH_FAIL", payload: getError(err) });
  //       }
  //     };
  // ;
  //     if (!userInfo) {
  //       return navigate("/login");
  //     }

  //     if (!order._id || successPay || (order._id && order._id !== orderId)) {
  //       fetchOrder();
  //       if (successPay) {
  //         dispatch({ type: "PAY_RESET" });
  //       }
  //     } else {

  //       handleCheckout();
  //     }
  //   }, [
  //     order,
  //     userInfo,
  //     navigate,
  //     orderId,
  //     handleCheckout,
  //     successPay,
  //   ]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      // if (successPay) {
      //   dispatch({ type: "PAY_RESET" });
      // }
    }
  }, [order, userInfo, navigate, orderId, successPay]);

  //stripe
  const handleCheckout = async () => {
    console.log(order.orderItems);

    try {
      const { data } = await axios.post(
        `/api/create-checkout-session`,
        {
          orderItems: order.orderItems,
          userId: userInfo._id,
          orderID: order._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("data", data);

      if (data.url) {
         
        window.location = data.url
        onApprove();
        // toast.success("Order is paid");

        // navigate(data.url);
      }
      // if (data.url)
      console.log("data", data);
    } catch (err) {
      console.log("error:", err);
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      // toast.error(getError(err));
    }
  };

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 10 }}>
      <Helmet>
        <title>Order no: {orderId} - KebaBomb</title>
      </Helmet>
      <Stack flexDirection="column" alignContent="center">
        <Typography
          variant="h5"
          component="div"
          alignSelf="center"
          guttetBottom
        >
          Order no. {orderId}
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Shipping
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address:</strong>
              {order.shippingAddress.address},{order.shippingAddress.city},
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </Typography>
            <Typography>
              {order.isDelivered ? (
                <div>Delivered at {order.deliveredAt}</div>
              ) : (
                <div>Not Delivered</div>
              )}
            </Typography>
          </CardContent>
        </Card>
        <Divider />
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Payment
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Method:</strong> {order.paymentMethod} <br />
            </Typography>
            <Typography>
              {order.isPaid ? (
                <div>Paid at {order.paidAt}</div>
              ) : (
                <div>Not Paid</div>
              )}
            </Typography>
          </CardContent>
        </Card>
        <Divider />
        <Card sx={{ flexGrow: 0 }}>
          <List>
            {order.orderItems.map((item) => (
              <ListItem>
                <Link
                  sx={{ mr: 2 }}
                  component={RouterLink}
                  to={`/product/${item.slug}`}
                >
                  {item.name}
                </Link>

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
                />

                <ListItemText
                  secondary={`Q: ${item.quantity}`}
                  sx={{ ml: 2 }}
                />
                <ListItemText secondary={`${item.price} ${item.currency}`} />
              </ListItem>
            ))}
          </List>
          <Link component={RouterLink} to="/cart" sx={{ ml: 2, mb: 3 }}>
            Edit
          </Link>
        </Card>
        <Divider />
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Order Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Items:</strong>
              {order.itemsPrice.toFixed(2)}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Shipping Price:</strong>
              {order.shippingPrice.toFixed(2)}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Tax Price:</strong>
              {order.taxPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Order Total:</strong>
              {order.totalPrice.toFixed(2)}
            </Typography>
          </CardContent>
          <CardActions>
            {!order.isPaid && (
              <Card>
                <Button
                  onClick={() => handleCheckout()}
                  orderItems={order.orderItems}
                >
                  stripe
                </Button>
              </Card>
            )}
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}
