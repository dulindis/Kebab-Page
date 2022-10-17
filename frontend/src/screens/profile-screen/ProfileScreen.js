import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // dispatch({ type: "UPDATE_REQUEST" });

    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ ype: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Profile - KebaBomb</title>
      </Helmet>
      <h1>User Profile</h1>

      <form onSubmit={submitHandler}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
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
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl margin="normal"  fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl margin="normal"  fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default ProfileScreen;
