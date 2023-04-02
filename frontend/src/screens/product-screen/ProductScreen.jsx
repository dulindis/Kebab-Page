import React, { useContext } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";
import useApi from "../../utils/customHooks";

import RatingComponent from "../../components/rating/Rating";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import MessegeBox from "../../components/messege-box/MessegeBox";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

export default function ProductScreen() {
  const navigate = useNavigate();

  const { slug } = useParams();
  const { loading, error, data } = useApi(`/api/products/slug/${slug}`, slug);
  const product = data;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock.");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <MessegeBox>{error}</MessegeBox>
  ) : (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        alignContent={"center"}
      >
        <Box>
          <figure className="product-image">
            <img src={product.image} alt={product.name} />{" "}
          </figure>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <KebabDiningIcon />
              </ListItemIcon>
              <Helmet>
                <title>{product.name} - KebaBomb</title>
              </Helmet>
              <ListItemText primary={product.name} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Price:${product.currency} ${product.price}`}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <RatingComponent
                rating={product.rating}
                numReviews={product.numReviews}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={product.description} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              {product.countInStock > 0 ? (
                <Button
                  onClick={addToCartHandler}
                  variant="contained"
                  color="success"
                >
                  Order now
                </Button>
              ) : (
                <Button variant="contained" color="error">
                  Unavailable
                </Button>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Container>
  );
}
