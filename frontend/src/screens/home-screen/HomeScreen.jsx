import React from "react";
import useApi from "../../utils/customHooks.js";
import { CircularProgress, Grid } from "@mui/material";
import CardComponent from "../../components/card/CardComponent.jsx";
import ResponsiveGrid from "../../components/responsie-grid/ResponsiveGrid.js";
import { Helmet } from "react-helmet-async";
import MessegeBox from "../../components/messege-box/MessegeBox.jsx";

function HomeScreen() {
  const { loading, error, data } = useApi("/api/products");
  return (
    <div>
      <Helmet>
        <title>Kebab shop</title>
      </Helmet>
      <h2>Our dishes</h2>
      <h1>Popular dishes</h1>

      <div className="products">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <MessegeBox>{error}</MessegeBox>
        ) : (
          <ResponsiveGrid>
            {data.map((product) => {
              if (product.category === "food") {
                return (
                  <Grid item xs={12} sm={6} md={2} key={product.slug}>
                    <CardComponent product={product} />
                  </Grid>
                );
              }
            })}
          </ResponsiveGrid>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
// export default HomeScreen

//{
/* <div className="product" key={product.slug}>
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
                  </div> }*/
