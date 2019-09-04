import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './actionTypes';

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export function removeFromCart(name) {
  return {
    type: REMOVE_FROM_CART,
    name
  }
}
