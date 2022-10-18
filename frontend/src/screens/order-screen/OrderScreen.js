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
  

  
  export default function OrderScreen() {
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo, cart } = state;
    const { cartItems } = cart;
  
    const params = useParams();
    const { id: orderId } = params;
  
 return (
    <React.Fragment>
        { cart.paymentMethod==="PayPal" ? ( <PayPalScreen/>)  : (<OrderScreenStripe/>)
        }
    </React.Fragment>
 )
   
  }
  
  