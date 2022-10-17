import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../utils/customHooks";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { MdError } from "react-icons/md";
import { Box, Container } from "@mui/system";
import RatingComponent from "../../components/rating/Rating";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import { Helmet } from "react-helmet-async";
import MessegeBox from "../../components/messege-box/MessegeBox";
import { Store } from "../../Store";
import axios from "axios";

export default function ProductScreen() {
const navigate=useNavigate();

  const { slug } = useParams();
  const { loading, error, data} = useApi(`/api/products/slug/${slug}`, slug);
  const product=data;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock<quantity) {
      window.alert('Sorry. Product is out of stock.');
      return
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product,  quantity },
    });
    navigate('/cart')
  };
  
  return loading ? (
    <CircularProgress />
  ) : error ? (
    <MessegeBox>{error}</MessegeBox>
  ) : (
    <Container>
      <Box
        display="flex"
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
              <ListItemText primary={`Price:${product.currency} ${product.price}`} />
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
              {/* <ListItemText primary={`Status: ${data.countInStock>0 ? data.countInStock : "unavailable"}`} /> */}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

{
  /* <ListItemText vriant="text" color="success" primary={`Status:`} /> */
}
