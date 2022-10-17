import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import MenuList from '@mui/material/MenuList';

const pages = [
  // { name: "Dishes", path: "/dishes" },
  { name: "About us", path: "/about" },
  // { name: "Menu", path: "/menu" },
  // { name: "Order", path: "/order" },
  { name: "Contact us", path: "/contact" },
  { name: "Visit us", path: "/locals" },

  // { name: "Cart", path: "/cart" },
];
// const settings = ["Cart"];
// const anonymousSettings = [{ page: "Cart", path: "/cart" }];
const settings = [
  { page: "Cart", path: "/cart", public: true },
  { page: "Order History", path: "/orderhistory", public: false },
  { page: "User Profile", path: "/profile", public: false },
  { page: "Sign Out", path: "/signout", public: false },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);

useEffect(()=>{},[userInfo])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenCartMenu = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href="/signin"

  };

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <ToastContainer position="bottom-center" limit={1} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <KebabDiningIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">KebaBomb</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`${page.path}`}>{page.name} {page.path}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <KebabDiningIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">KebaBomb</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
              href={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name} 
              </Button>
            ))}
          </Box>


          {/* woking one */}
          <Typography>
            {userInfo ? (
              <div>
                <h1>{userInfo.name}</h1>
                <Link to="#signout" onClick={signOutHandler}>
                  Sign out
                </Link>
              </div>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenCartMenu} sx={{ p: 0 }}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0) > 0 && (
                  <Badge
                    badgeContent={`${cart.cartItems.reduce(
                      (a, c) => a + c.quantity,
                      0
                    )}`}
                    color="error"
                  >
                    <ShoppingCartIcon alt="Cart" />
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElCart}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
              {settings.map((setting) => {
                if (userInfo) {
                  return (
                    <MenuItem key={setting} onClick={handleCloseCartMenu}>
                      <Typography textAlign="center">
                        <Link to={setting.path}>{setting.page}</Link>
                      </Typography>
                    </MenuItem>
                  );
                } else {
                  if (setting.public) {
                    return (
                      <MenuItem key={setting} onClick={handleCloseCartMenu}>
                        <Typography textAlign="center">
                          <Link to={setting.path}>{setting.page}</Link>
                        </Typography>
                      </MenuItem>
                    );
                  }
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

{
  /* 
if (userInfo) {return(
                  <MenuItem key={setting.name} onClick={handleCloseCartMenu}>
                    <Typography textAlign="center">
                    
                      <Link to={setting.path}>{setting.name}</Link>
                    </Typography>
                  </MenuItem>)
                } */
}
