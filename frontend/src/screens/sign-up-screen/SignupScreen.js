import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Typography from "@mui/material/Typography";

import { Helmet } from "react-helmet-async";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../../Store.js";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils.js";
import Link from "@mui/material/Link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
      KebaBomb
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// const theme = createTheme();

const SignupScreen = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
        // confirmPassword
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      // alert('Invalid email or password')
      toast.error(getError(err));
    }
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Sign Up - KebaBomb</title>
      </Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="firstName"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid> */}

            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account? {""}
              {/* <Link to={`/signup?redirect=${redirect}`}>Sign in</Link> */}
              {/* <Link component={RouterLink} to={`/signup?redirect=${redirect}`}>
                Sign in
              </Link> */}
              {!userInfo ? (
                <Link component={RouterLink} to={`/signin`}>
                  Sign Up 1
                </Link>
              ) : (
                <Link
                  component={RouterLink}
                  to={`/signin?redirect=${redirect}`}
                >
                  {" "}
                  Sign Up 2
                </Link>
              )}{" "}
              
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    // </ThemeProvider>
  );
};
// SignupScreen.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default SignupScreen;

// export default withStyles(styles)(SigninScreen);
