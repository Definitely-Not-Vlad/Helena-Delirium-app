import {
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART,
} from './actionTypes';

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
