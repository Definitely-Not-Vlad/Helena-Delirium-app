import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,

  SET_ADDED_TO_CART,
  SET_ALL_REMOVED_FROM_CART,
  SET_REMOVED_FROM_CART,

  CLEAR_ORDER_ERROR,
  CLEAR_SAVED_ORDER_INFO,
  SAVE_ORDER_INFO,
  SEND_ORDER_ERROR,
  SEND_ORDER_PENDING,
  SEND_ORDER_SUCCESS,
} from './actionTypes';

const initialCatalogue = { products: require('../jsonData/products.json')};
const initialShoppingCartState = { cartContents: [] };
const initialOrder = { error: null, orderInfo: null, pending: false }

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
      });
    case CHANGE_PRODUCT_QUANTITY:
      return Object.assign({}, state, {
        cartContents: state.cartContents.map((product) => {
          const { name } = product;

          if (name === action.name) {
            return Object.assign({}, product, { quantity: action.number });
          }

          return product;
        })
      });
    case REMOVE_ALL_FROM_CART: {
      return initialShoppingCartState;
    }
    case REMOVE_FROM_CART:
      return Object.assign({}, state, {
        cartContents:
          state.cartContents.filter(product => product.name !== action.name)
      });
    default:
      return state;
  }
}

function catalogue(state = initialCatalogue, action) {
  switch (action.type) {
    case SET_ADDED_TO_CART:
      return Object.assign({}, state, {
        products: state.products.map((product) => {
          if (product.name === action.name) {
            return Object.assign({}, product, { canAddToCart: false });
          }

          return product;
        })
      });
    case SET_ALL_REMOVED_FROM_CART:
      return Object.assign({}, state, {
        products: state.products.map((product) => {
          return Object.assign({}, product, { canAddToCart: true });
        })
      });
    case SET_REMOVED_FROM_CART:
      return Object.assign({}, state, {
        products: state.products.map((product) => {
          const { name } = product;

          if (name === action.name) {
            return Object.assign({}, product, { canAddToCart: true });
          }

          return product;
        })
      });
    default:
      return state;
  }
}

function order(state = initialOrder, action) {
  switch (action.type) {
    case CLEAR_ORDER_ERROR:
      return Object.assign({}, state, {
        error: null
      });
    case CLEAR_SAVED_ORDER_INFO:
      return Object.assign({}, state, {
        orderInfo: null
      });
    case SAVE_ORDER_INFO:
      return Object.assign({}, state, {
        orderInfo: action.orderInfo,
      });
    case SEND_ORDER_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        pending: false,
      });
    case SEND_ORDER_PENDING:
      return Object.assign({}, state, {
        error: null,
        pending: true,
      });
    case SEND_ORDER_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        pending: false,
      });
    default:
      return state;
  }
}

const helenaDelirium = combineReducers({
  shoppingCart,
  catalogue,
  order
});

export default helenaDelirium;
