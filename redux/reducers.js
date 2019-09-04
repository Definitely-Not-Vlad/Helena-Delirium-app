import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './actionTypes';

const initialState = {
  products: [],
}

function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        products: [
          ...state.products,
          action.product,
        ]
      })
    case REMOVE_FROM_CART:
      return Object.assign({}, state, {
        products: state.products.filter(product => product.name !== action.name)
      })
    default:
      return state
  }
}

const helenaDelirium = combineReducers({
  shoppingCart
});

export default helenaDelirium;
