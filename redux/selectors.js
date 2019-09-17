import _ from 'lodash';

// catalogue selectors

const catalogueSelector = state => state.catalogue.products;

export function getCatalogue(state) {
  return catalogueSelector(state);
}

export function getProductFromCatalogue(state, productName) {
  return _.find(catalogueSelector(state), { name: productName });
}

// shopping cart selectors

const shoppingCartSelector = state => state.shoppingCart.cartContents;

export function getShoppingCart(state) {
  return shoppingCartSelector(state);
}

// order selectors

const orderSelector = state => state.order;

export function getOrder(state) {
  return orderSelector(state);
}
