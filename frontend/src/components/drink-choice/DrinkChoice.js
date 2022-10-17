// import {
//   Box,
//   FormControl,
//   InputLabel,
//   ListItemButton,
//   ListItemText,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import axios from "axios";
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Store } from "../../Store";

// export default function DrinkChoice() {
//   const [drink, setDrink] = React.useState("");

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { cartItems },
//   } = state;

//   const handleChange = (event) => {
//     setDrink(event.target.value);
//     console.log("drink", drink);
//   };


//   const addToCartHandler = async (item) => {
//     const existItem = cartItems.find((item) => item._id === product._id);
//     const quantity = existItem ? existItem.quantity + 1 : 1;
//     const { data } = await axios.get(`/api/products/${item._id}`);
//     if (data.countInStock < quantity) {
//       window.alert("Sorry. Product is out of stock.");
//       return;
//     }

//     ctxDispatch({
//       type: "CART_ADD_ITEM",
//       payload: { ...item, quantity },
//     });
//   };


//   return (
//     <Box>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Variant</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           // value={drink}
//           label="Age"
//           onChange={handleChange}
//         >
//           {cartItems.map((item) => (
//             <MenuItem value={item.name}>
//               <ListItemButton component="a" href="#simple-list">
//                 <ListItemText primary={item.name} />

//                 <figure className="product-image">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="img-thumbnail"
//                   />{" "}
//                 </figure>

//                 <Link to={`/product/${item.slug}`}></Link>
//                 <ListItemText secondary={item.quantity} />
//                 <ListItemText secondary={`${item.price} ${item.currency}`} />
//               </ListItemButton>
//             </MenuItem>
//           ))}
//         </Select>
//         {/* <Button size="small" variant="contained" onClick={()=>addToCartHandler(product)}>Buy me</Button> */}
//       </FormControl>
//     </Box>
//   );
// }
