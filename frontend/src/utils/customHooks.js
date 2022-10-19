import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
// import reducer from "./reducer";
import { getError } from "./utils";


const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading:true};
    case 'FETCH_SUCCESS': 
    return {...state, data:action.payload, loading:false};
    case 'FETCH_FAILURE': 
    return {...state, error: action.payload, loading:false};
     default:return state
};
}

function useApi(url, slug,_id) {
  const [{ loading, error, data }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    data: [],
  });

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(`${url}`);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      console.log('result.data:', result.data )
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: getError(error) });
    }
  };

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    fetchData();
    // console.log("i fire once");

    // return function cleanup() {
    //   cancelRequest = true;
    //   console.log("i clean up");
    // };

  }, [slug,_id]);

  return { loading, error, data };
}

export default useApi;
