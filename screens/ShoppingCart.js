import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Screen, ListView, View, Title } from '@shoutem/ui';

import ShoppingCartProductView from '../components/ShoppingCartProductView';

import { removeFromCart } from '../redux';

class ShoppingCart extends PureComponent {
  render() {
    const { data } = this.props;

    const renderRow = (product) => <ShoppingCartProductView product={product} />

    if (!data.length) {
      return (
        <Screen style={{ backgroundColor: '#F2F1EF' }}>
          <View styleName="fill-parent vertical v-center xl-gutter-horizontal">
            <Title>You haven't added anything to your shopping cart yet.</Title>
          </View>
        </Screen>
      )
    }

    return (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={renderRow}
        />
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.shoppingCart.cartContents,
  }
}

export default connect(mapStateToProps)(ShoppingCart)
