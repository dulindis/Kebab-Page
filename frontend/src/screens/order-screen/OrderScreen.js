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
import OrderScreenStripe from "../../components/stripe-pay/OrderScreenStripe";
import PayPalScreen from "../../components/paypal-pay/PayPalScreen";

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

export default function OrderScreen() {
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

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();//payaplowe



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
        dispatch({ type: "PAY_RESET" });
      }
    }
  }, [order, userInfo, navigate, orderId, paypalDispatch, successPay]);

  return (
    <React.Fragment>
      {order.paymentMethod === "PayPal" ? (
        <PayPalScreen />
      ) : (
        <OrderScreenStripe />
      )}
    </React.Fragment>
  );
}
