import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CartScreen from "./screens/cart-screen/CartScreen";
import CheckoutScreen from "./screens/checkout-screen/CheckoutScreen";
import HomeScreen from "./screens/home-screen/HomeScreen";
import OrderHistoryScreen from "./screens/order-history-screen/OrderHistoryScreen";
import OrderScreen from "./screens/order-screen/OrderScreen";
import PaymentMethodScreen from "./screens/payment-method-screen/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/place-order-screen/PlaceOrderScreen";
import ProductScreen from "./screens/product-screen/ProductScreen";
import ProfileScreen from "./screens/profile-screen/ProfileScreen";
import ShippingAddressScreen from "./screens/shipping-address-screen/ShippingAddressScreen";
import SinginScreen from "./screens/sign-in-screen/SigninScreen";
import SingupScreen from "./screens/sign-up-screen/SignupScreen";
import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import theme from "./mui-theme/MuiTheme";
import AboutScreen from "./screens/about-screen/AboutScreen";
import React from "react";
import { Container, Paper } from "@mui/material";
import PageNotFoundScreen from "./screens/page-not-found-screen/PageNotFoundScreen";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
    // cursor: `url(./baseline_restaurant_menu_black_24dp_hover.png),auto`,
    // backgroundColor: 'grey'
  },
  // card: {
  //   backgroundColor: 'blue'
  // }
  main:{
    
  }
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper
          // classes={
          //   classes.paper

          //   //       {
          //   //   root: "App", // class name, e.g. `classes-nesting-root-x`
          //   //   // label: classes.label, // class name, e.g. `classes-nesting-label-x`
          //   // }
          // }
          className="App"
          xs={{height:"100vh"}}
        >
          <Header />
          <Container component="main">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SinginScreen />} />
              <Route path="/signup" element={<SingupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="*" element={<PageNotFoundScreen/>} />

            </Routes>
          </Container>

          <Footer />
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
