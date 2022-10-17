import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../../utils/utils";



const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderHistoryScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Order History - KebaBomb</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">DATE</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PAID</TableCell>
                <TableCell align="right">DELIVERED</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell component="th" scope="row">{order._id}</TableCell>
                  <TableCell align="right">{order.createdAt.substring(0,10)}</TableCell>
                  <TableCell align="right">{order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell align="right">{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</TableCell>
                  <TableCell align="right">{order.isDelivered ? order.isDelivered.substring(0,10) : 'No'}</TableCell>
                  <TableCell align="right">
                    <Button onClick={()=>{navigate(`/order/${order._id}`)}}>Details</Button>
                  </TableCell>


                </TableRow>
              ))}
             
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
