import {
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART,

  SET_ADDED_TO_CART,
  SET_REMOVED_FROM_CART,
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

export function setRemovedFromCart(name) {
  return {
    type: SET_REMOVED_FROM_CART,
    name
  }
}
