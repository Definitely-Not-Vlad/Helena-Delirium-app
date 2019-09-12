import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ListView, Screen, Title, View  } from '@shoutem/ui';

import ContinueToCheckoutButton from '../components/ContinueToCheckoutButton';
import ShoppingCartProductView from '../components/ShoppingCartProductView';

import { getShoppingCart } from '../redux';

// https://github.com/facebook/react-native/issues/17944#issuecomment-448557639
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height) - 40;

class ShoppingCart extends PureComponent {
  constructor(props) {
    super(props);

    this.openCheckoutScreen = this.openCheckoutScreen.bind(this);
  }

  openCheckoutScreen() {
    const { navigation } = this.props;

    navigation.navigate('CheckoutScreen');
  }

  render() {
    const { data } = this.props;

    const renderRow = (product) => <ShoppingCartProductView product={product} />

    return data.length ? (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={renderRow}
          ListEmptyComponent={this.renderEmptyList}
        />
        <ContinueToCheckoutButton onPress={() => this.openCheckoutScreen()} />
      </Screen>
    ) : (
      <View styleName="fill-parent vertical v-center h-center">
        <Title>Your cart is empty.</Title>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: getShoppingCart(state),
  }
}

export default connect(mapStateToProps)(ShoppingCart)
