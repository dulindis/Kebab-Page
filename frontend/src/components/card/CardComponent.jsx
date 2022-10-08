import { Button, CardActions, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import React, { useContext } from "react";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { FaPepperHot } from "react-icons/fa";
import { Link } from "react-router-dom";
import RatingComponent from "../rating/Rating";
import axios from "axios";
import { Store } from "../../Store";

export default function CardComponent({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;


  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
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
    <Card>
      <Link to={`/product/${product.slug}`}>
        <CardMedia
          component="img"
          height="140"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Link to={`/product/${product.slug}`}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>
        <Typography>
          <RatingComponent rating={product.rating} numReviews={product.numReviews}/>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography>
        {product.flavour === "spicy" ? (
          <WhatshotIcon style={{ color: "#A80000" }}/>
                        ) : ''}
          {/* <FaPepperHot style={{ color: "#A80000" }} /> */}
        </Typography>
        <Typography>
          <strong>
            {product.currency}
            {product.price}
          </strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More...</Button>
        {product.countInStock ===0 ? <Button disabled>Out of stock</Button> :
        <Button size="small" variant="contained" onClick={()=>addToCartHandler(product)}>Buy me</Button>

        
        }
      </CardActions>

      {/* 
      <div className="product" key={product.slug}>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="product-info">
          <Link to={`/product/${product.slug}`}>
            <p>{product.name}</p>
          </Link>
          <p>
            <strong>
              {product.currency}
              {product.price}
            </strong>
          </p>
          <p>
            {product.flavour === "spicy" ? (
              <FaPepperHot style={{ color: "#A80000" }} />
            ) : null}
          </p>

          <button>Add to cart</button>
        </div>
      </div> */}
    </Card>
  );
}
