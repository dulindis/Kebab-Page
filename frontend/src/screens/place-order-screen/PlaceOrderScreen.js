import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CardComponent from "../../components/card/CardComponent";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import { Store } from "../../Store";

const PlaceOrderScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
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
            <Link to="/shipping">Edit</Link>
            {/* <Button size="small">Place Order</Button> */}
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
            <Link to="/payment">Edit</Link>
          </CardActions>
        </Card>

        <Card>
        <Divider />

         <List sx={{ flexGrow: 0, width:'500px' }}>
         <li>
            {cart.cartItems.map((item) => (
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
        </Card>
      </Box>
    </div>
  );
};

export default PlaceOrderScreen;
