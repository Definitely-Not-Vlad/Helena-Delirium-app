import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Screen, ListView } from '@shoutem/ui';

import ShoppingCartProductView from '../components/ShoppingCartProductView';

import { removeFromCart } from '../redux';

class ShoppingCart extends PureComponent {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.openProductDetails = this.openProductDetails.bind(this);
  }

  openProductDetails(product) {
    const { navigation } = this.props;

    navigation.navigate('ProductDetails', { product: product });
  }

  renderRow(item) {
    return (
      <ShoppingCartProductView
        item={item}
        onPress={() => this.openProductDetails(item)}
      />
    );
  }

  render() {
    const { data } = this.props;

    return (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    data: state.shoppingCart.products,
  }
}

export default connect(mapStateToProps)(ShoppingCart)
