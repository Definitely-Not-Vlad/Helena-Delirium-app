import React, { PureComponent } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import {
  Heading,
  ListView,
  Screen,
  ScrollView,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui';

import CheckoutItemView from '../components/CheckoutItemView';
import SendOrderForm from '../components/SendOrderForm';
import { getShoppingCart } from '../redux';

class CheckoutScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    this.navigateToNews = this.navigateToNews.bind(this);
    this.navigateToProducts = this.navigateToProducts.bind(this);
  }

  calculateTotal() {
    const { products } = this.props;

    let total = 0;
    products.forEach(product => { total += (product.quantity*product.price) });

    return total;
  }

  navigateToNews() {
    const { navigation } = this.props;

    navigation.goBack();
    navigation.navigate('News');
  }

  navigateToProducts() {
    const { navigation } = this.props;

    navigation.goBack();
    navigation.navigate('Products');
  }

  render() {
    const { products } = this.props;

    const renderRow = (product) => <CheckoutItemView product={product} />
    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return products.length ? (
      <ScrollView persistentScrollbar>
        <KeyboardAvoidingView
          style={{ backgroundColor: '#F2F1EF' }}
          behavior="padding"
        >
          <View
            styleName="vertical v-center h-center md-gutter"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Title>
              Once sent, your order will be processed and shipped. Payment is currently exclusively via cash on delivery.
            </Title>
            <Title styleName="lg-gutter-top md-gutter-bottom">
              Your total is: {this.calculateTotal()}kn
            </Title>
          </View>
          <SendOrderForm />
        </KeyboardAvoidingView>
      </ScrollView>
    ) : (
      <View
        style={{ backgroundColor: '#F2F1EF' }}
        styleName="fill-parent vertical v-center h-center xl-gutter-bottom"
      >
        <Title>Your order has been sent.</Title>
        <View styleName="horizontal h-center stretch xl-gutter-top">
          <TouchableOpacity onPress={() => this.navigateToNews()}>
            <Title
              style={buttonStyling}
            >
              Check News
            </Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigateToProducts()}>
            <Title
              styleName="lg-gutter-left"
              style={buttonStyling}
            >
              Browse Products
            </Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: getShoppingCart(state),
  }
};

export default connect(mapStateToProps)(CheckoutScreen);
