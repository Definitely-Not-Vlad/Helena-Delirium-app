import {
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,

  SET_ADDED_TO_CART,
  SET_ALL_REMOVED_FROM_CART,
  SET_REMOVED_FROM_CART,

  CLEAR_ORDER_ERROR,
  SEND_ORDER_ERROR,
  SEND_ORDER_PENDING,
  SEND_ORDER_SUCCESS,
} from './actionTypes';

// shopping cart actions

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export function changeProductQuantity(name, number) {
  return {
    type: CHANGE_PRODUCT_QUANTITY,
    name,
    number
  }
}

export function removeAllFromCart() {
  return {
    type: REMOVE_ALL_FROM_CART
  }
}

export function removeFromCart(name) {
  return {
    type: REMOVE_FROM_CART,
    name
  }
}

// catalogue actions

export function setAddedToCart(name) {
  return {
    type: SET_ADDED_TO_CART,
    name
  }
}

export function setAllRemovedFromCart() {
  return {
    type: SET_ALL_REMOVED_FROM_CART
  }
}

export function setRemovedFromCart(name) {
  return {
    type: SET_REMOVED_FROM_CART,
    name
  }
}

// order actions

export function clearOrderError() {
  return {
    type: CLEAR_ORDER_ERROR
  }
}

export function sendOrderError(error) {
  return {
    type: SEND_ORDER_ERROR,
    error
  }
}

export function sendOrderPending() {
  return {
    type: SEND_ORDER_PENDING
  }
}

export function sendOrderSuccess() {
  return {
    type: SEND_ORDER_SUCCESS
  }
}
