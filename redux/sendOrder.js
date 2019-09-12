import {
  removeAllFromCart,

  sendOrderError,
  sendOrderPending,
  sendOrderSuccess,

  setAllRemovedFromCart,
} from './actions';

export function sendOrder(order) {
  console.log("Sending order:", order);
  
  return dispatch => {
    dispatch(removeAllFromCart());
    dispatch(setAllRemovedFromCart());
  }
}

// export function sendOrder(order) {
//   return dispatch => {
//     dispatch(sendOrderPending());
//     fetch('http://localhost:8080/sendOrder', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(order),
//     })
//     .then(response => response.json())
//     .then(response => {
//       if (response.error) {
//         throw(response.error);
//       }
//
//       dispatch(removeAllFromCart());
//       dispatch(sendOrderSuccess());
//       dispatch(setAllRemovedFromCart());
//       return;
//     })
//     .catch(error => {
//       dispatch(sendOrderError(error));
//     })
//   }
// }
