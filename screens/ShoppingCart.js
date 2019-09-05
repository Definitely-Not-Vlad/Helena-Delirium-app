import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Screen, ListView, View, Title } from '@shoutem/ui';

import CheckoutButton from '../components/CheckoutButton';
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

    console.log("Navigating to CheckoutScreen");

    navigation.navigate('CheckoutScreen');
  }

  renderEmptyList() {
    return (
      <View
        styleName="vertical v-center xl-gutter-horizontal"
        style={{ height: SCREEN_HEIGHT }}
      >
        <Title>You haven't added anything to your shopping cart yet.</Title>
      </View>
    );
  }

  render() {
    const { data } = this.props;

    const renderRow = (product) => <ShoppingCartProductView product={product} />
    const renderHeader = () => <CheckoutButton onPress={() => this.openCheckoutScreen()} />

    return (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={renderRow}
          ListHeaderComponent={data.length && renderHeader}
          ListEmptyComponent={this.renderEmptyList}
        />
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: getShoppingCart(state),
  }
}

export default connect(mapStateToProps)(ShoppingCart)
