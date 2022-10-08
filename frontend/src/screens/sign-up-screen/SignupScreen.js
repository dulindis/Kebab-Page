

import React,{ useEffect }  from "react";
// import { useEffect } from 'react-polyfill-hooks';
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import withStyles from "@mui/material/styles/withStyles";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../../Store.js";
// import { userInfo } from "os";
import {toast} from 'react-toastify';
import { getError } from "../../utils/utils.js";
// const styles = (theme) => ({
//   main: {
//     width: "auto",
//     display: "block", // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto",
//     },
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
//       theme.spacing.unit * 3
//     }px`,
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing.unit,
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3,
//   },
// });

function SignupScreen(props) {
  const navigate = useNavigate();

  const { classes } = props;
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  
    useEffect(() => {
    if(state.userInfo){
      navigate(redirect)
    } 
  }, [navigate,redirect,state.userInfo])
  

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !==confirmPassword){
      toast.error(
        'Passwords do not match'
      );
      return
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
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
      toast.error(getError(err))

    }
  };


  return (
    <main
    // className={classes.main}
    >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1>Sign Up</h1>
      <CssBaseline />
      <Paper
      //   className={classes.paper}
      >
        <Avatar
        // className={classes.avatar}
        >
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={submitHandler}
          // className={classes.form}
        >

<FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              name="confirmPassword"
              type="confirmPassword"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
          >
            Sign Up
          </Button>
        </form>

        <div>
          Already have an account?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Paper>
    </main>
  );
}
SignupScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SignupScreen;

// export default withStyles(styles)(SigninScreen);
