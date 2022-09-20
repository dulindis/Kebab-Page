import React from "react";
import { useParams } from "react-router-dom";
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
import {Helmet} from 'react-helmet-async';
import MessegeBox from "../../components/messege-box/MessegeBox";

export default function ProductScreen() {
  const { slug } = useParams();
  const { loading, error, data } = useApi(`/api/products/slug/${slug}`, slug);

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
            <img src={data.image} alt={data.name} />{" "}
          </figure>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <KebabDiningIcon />
              </ListItemIcon>
              <Helmet>
                <title>{data.name}</title>
              </Helmet>
              <ListItemText primary={data.name} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={`Price:${data.currency} ${data.price}`} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <RatingComponent
                rating={data.rating}
                numReviews={data.numReviews}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={data.description} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              {data.countInStock > 0 ? (
                <Button variant="contained" color="success">
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
