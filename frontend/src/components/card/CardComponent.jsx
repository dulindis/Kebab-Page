import { Button, CardActions, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import React from "react";
import { FaPepperHot } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardComponent({ product }) {
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
          </Typography>{" "}
        </Link>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography>
          {" "}
          <FaPepperHot style={{ color: "#A80000" }} />
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
        <Button size="small">Add To Cart</Button>
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
