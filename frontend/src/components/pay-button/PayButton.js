// import React from 'react'
// import { toast } from 'react-toastify';
// import { getError } from '../../utils/utils';

// const PayButton = ({paymentMethod, orderId}) => {

//     function createOrder(data, actions) {
//         return actions.order
//           .create({
//             purchase_units: [
//               {
//                 amount: { value: order.totalPrice },
//               },
//             ],
//           })
//           .then((orderID) => {
//             return orderID;
//           });
//       }
    
//       function onApprove(data, actions) {
//         return actions.order.capture().then(async function (details) {
//           try {
//             dispatch({ type: "PAY_REQUEST" });
//             const { data } = await axios.put(
//               `/api/orders/${order._id}/pay`,
//               details,
//               {
//                 headers: { authorization: `Bearer ${userInfo.token}` },
//               }
//             );
//             dispatch({ type: "PAY_SUCCESS", payload: data });
//             toast.success("Order is paid");
//           } catch (err) {
//             dispatch({ type: "PAY_FAIL", payload: getError(err) });
//             toast.error(getError(err));
//           }
//         });
//       }
//       function onError(err) {
//         toast.error(getError(err));
//       }


//   return (
//     <React.Fragment>
//       { paymentMethod==="paypal" ? ( <PayPalButtons
//                       createOrder={createOrder}
//                       onApprove={onApprove}
//                       onError={onError}
//         ></PayPalButtons>): (<h1>stripe</h1>)
    
      
      
      
//       }
//     </React.Fragment>
//   )
// }

// export default PayButton
