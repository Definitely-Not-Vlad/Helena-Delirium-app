import { Platform } from 'react-native';

import {
  removeAllFromCart,

  sendOrderError,
  sendOrderPending,
  sendOrderSuccess,

  setAllRemovedFromCart,
} from './actions';

const ANDROID_LOCALHOST = 'http://10.0.2.2';
const IOS_LOCALHOST = 'http://10.0.2.3';
const ORDER_SERVICE_PORT = ':8080';
const isIos = Platform.OS === 'ios';
const resolvedLocalhost = isIos ?
  `${IOS_LOCALHOST}${ORDER_SERVICE_PORT}` :
  `${ANDROID_LOCALHOST}${ORDER_SERVICE_PORT}`;

export function sendOrder(order) {
  return dispatch => {
    dispatch(sendOrderPending());

    fetch(resolvedLocalhost, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    .then(response => {
      if (response.error) {
        throw(response.error);
      }

      dispatch(removeAllFromCart());
      dispatch(setAllRemovedFromCart());
      dispatch(sendOrderSuccess());

      return;
    })
    .catch(error => {
      dispatch(sendOrderError(error));
    });
  }
}
