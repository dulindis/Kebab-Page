import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MessegeBox from "../../components/messege-box/MessegeBox.jsx";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Store } from "../../Store";
import useApi from "../../utils/customHooks";
import { FaStackExchange } from "react-icons/fa";
import { Stack } from "@mui/system";

export default function DrinkCard({
  product,
  setCurrItem,
  currItem,
  amountDrinks,
}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleBack = () => {
    if (currItem === 0) {
      setCurrItem(amountDrinks - 1);
    } else {
      setCurrItem(currItem - 1);
    }
  };

  const handleForward = () => {
    if (currItem === amountDrinks - 1) {
      setCurrItem(0);
    } else {
      setCurrItem(currItem + 1);
    }
  };

  const addToCartHandler = async (item) => {
    console.log("drink add?");
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock.");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <React.Fragment>
      <Paper
        sx={{
          position: "relative",
          backgroundImage: `url(${product.image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          minHeight: "300px",
          padding: "1 rem",
          display: "flex",
          // alignItems:"space-between"
        }}

      >
      

        <Stack direction="column" alignContent="center" justifyContent="center">
          <ArrowBackIosIcon sx={{ cursor: "pointer", padding:"2rem",fontSize:25 }} onClick={handleBack} />
        </Stack>
        <Box className="center" sx={{ flex: "90%", height: "100%" }}>

          
        </Box>
        <Stack direction="column" alignContent="center" justifyContent="center">
          <ArrowForwardIosIcon
            sx={{ cursor: "pointer" ,  padding:"2rem",fontSize:25 }}
            onClick={handleForward}
          />
        </Stack>

        {/* <Box
        component="img"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          // position: "relative",
          maxWidth: { xs: 350, md: 500 },
         maxHeight:{ xs: 350, md: 500 }
        }}
        
        alt={product.name}
        src={product.image}
       
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.54)",
          color: "white",
          padding: "10px",
        }}
      >
        <Link
          component={RouterLink}
          to={`/product/${product.slug}`}
          color="secondary"
        >
          <Typography             sx={{ml:4}}
 gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>

        <Typography             sx={{ml:4}}
>
          <strong>
            {product.currency} {product.price}
          </strong>
        </Typography>
        {product.countInStock === 0 ? (
          <Button disabled>Out of stock</Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => addToCartHandler(product)}
            sx={{ml:4, mt:1}}
          >
            Buy me
          </Button>
        )}
      </Box> */}
      </Paper>
      <Box sx={{backgroundColor:'rgba(0,0,0,0.7)'}}>
      <Link
          component={RouterLink}
          to={`/product/${product.slug}`}
          color="secondary"
        >
          <Typography             sx={{ml:4, color:"white"}}
 gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>
        <Typography             sx={{ml:4}}
>
          <strong>
            {product.currency} {product.price}
          </strong>
        </Typography>
        {product.countInStock === 0 ? (
          <Button disabled>Out of stock</Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => addToCartHandler(product)}
            sx={{ml:4, mt:1}}
          >
            Buy me
          </Button>
        )}
      </Box>
    </React.Fragment>
  );
}
