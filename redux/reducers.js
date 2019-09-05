import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART,
} from './actionTypes';

const initialShoppingCartState = {
  cartContents: [],
}

function shoppingCart(state = initialShoppingCartState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cartContents: [
          ...state.cartContents,
          {
            ...action.product,
            quantity: 1,
          }
        ]
      })
    case CHANGE_PRODUCT_QUANTITY: {
      return Object.assign({}, state, {
        cartContents: state.cartContents.map((product) => {
          const { name } = product;

          if (name === action.name) {
            return Object.assign({}, product, {
              quantity: action.number
            })
          }

          return product;
        })
      })
    }
    case REMOVE_FROM_CART:
      const { name } = product;

      return Object.assign({}, state, {
        cartContents: state.cartContents.filter(product => name !== action.name)
      })
    default:
      return state
  }
}

const helenaDelirium = combineReducers({
  shoppingCart
});

export default helenaDelirium;
