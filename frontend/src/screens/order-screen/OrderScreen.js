import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../../Store";
import axios from "axios";
import { getError } from "../../utils/utils";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/system";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
      case 'PAY_REQUEST':
        return { ...state, loadingPay: true };
      case 'PAY_SUCCESS':
        return { ...state, loadingPay: false, successPay: true };
      case 'PAY_FAIL':
        return { ...state, loadingPay: false };
      case 'PAY_RESET':
        return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order, successPay,loadingPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay:false,
    loadingPay:false
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

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
      if (successPay) {
        dispatch({type:'PAY_RESET'})
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            // currency: "ISK",
            currency:"USD",

          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, navigate, orderId, paypalDispatch,successPay]);

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <Box>
        <Typography variant="h5" component="div">
          Order {orderId}
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h3" component="div">
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
            <Typography variant="h3" component="div">
              Payment{" "}
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

        <Card sx={{ flexGrow: 0, width: "500px" }}>
          <List>
            <li>
              {order.orderItems.map((item) => (
                <ListItemButton component="a" href="#simple-list">
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
                </ListItemButton>
              ))}
            </li>
          </List>
          <Link to="/cart">Edit</Link>
        </Card>

        <Divider />

        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
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
                {isPending ? (
                  <CircularProgress />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
                {loadingPay && <CircularProgress></CircularProgress>}
              </Card>
            )}
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
