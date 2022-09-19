import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function useApi(url) {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    products: [],
  });

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(`${url}`);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: error.message });
    }
  };

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    fetchData();
    console.log("i fire once");
    return function cleanup() {
      cancelRequest = true;
    };
  }, []);

  return { loading, error, products };
}

export default useApi;
