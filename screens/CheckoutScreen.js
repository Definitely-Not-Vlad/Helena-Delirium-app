import React, { PureComponent } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Heading,
  ListView,
  Screen,
  ScrollView,
  Spinner,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui';

import CheckoutItemView from '../components/CheckoutItemView';
import SendOrderForm from '../components/SendOrderForm';
import { SUPPORT_EMAIL } from '../const';
import {
  clearOrderError,
  getOrder,
  getShoppingCart,
} from '../redux';

class CheckoutScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    this.errorPopup = this.errorPopup.bind(this);
    this.navigateToNews = this.navigateToNews.bind(this);
    this.navigateToProducts = this.navigateToProducts.bind(this);
    this.renderCheckoutForm = this.renderCheckoutForm.bind(this);
    this.renderOrderSent = this.renderOrderSent.bind(this);
    this.shouldRenderForm = this.shouldRenderForm.bind(this);
    this.shouldRenderSpinner = this.shouldRenderSpinner.bind(this);
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

  shouldRenderForm() {
    const { products } = this.props;

    // products will have a length until the customer empties
    // the shopping cart on his own or the order is successfully
    // sent and processed
    return products.length;
  }

  shouldRenderSpinner() {
    const { order } = this.props;

    // if the order has been sent, render a spinner until server
    // returns either error or OK (status code 200)
    return order.pending;
  }

  renderSpinner() {
    return (
      <View styleName="fill-parent vertical v-center h-center">
        <Spinner />
      </View>
    );
  }

  errorPopup() {
    const { clearOrderError } = this.props;

    Alert.alert(
      'Error while processing order',
      'An error occured while processing your order. Please try again.'
        + '\nIf the error persists, please reach out to ' + SUPPORT_EMAIL,
      [{ text: 'OK', onPress: () => clearOrderError() }],
      { cancelable: false },
    );
  }

  renderCheckoutForm() {
    if (_.get(this.props, 'order.error')) this.errorPopup();

    const DISCLAIMER = 'Once sent, your order will be processed and shipped. '
      + 'Payment is currently exclusively via cash on delivery.';

    return this.shouldRenderSpinner() ? this.renderSpinner() : (
      <ScrollView persistentScrollbar>
        <KeyboardAvoidingView
          style={{ backgroundColor: '#F2F1EF' }}
          behavior="padding"
        >
          <View
            styleName="vertical v-center h-center md-gutter"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Title>{DISCLAIMER}</Title>
            <Title styleName="lg-gutter-top md-gutter-bottom">
              Your total is: {this.calculateTotal()}kn
            </Title>
          </View>
          <SendOrderForm />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  renderOrderSent() {
    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return (
      <View
        style={{ backgroundColor: '#F2F1EF' }}
        styleName="fill-parent vertical v-center h-center xl-gutter-bottom"
      >
        <Title>Your order has been sent.</Title>
        <View styleName="horizontal h-center stretch xl-gutter-top">
          <TouchableOpacity onPress={() => this.navigateToNews()}>
            <Title style={buttonStyling}>
              Check News
            </Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigateToProducts()}>
            <Title styleName="lg-gutter-left" style={buttonStyling}>
              Browse Products
            </Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return this.shouldRenderForm() ?
      this.renderCheckoutForm() :
      this.renderOrderSent();
  }
}

const mapStateToProps = state => {
  return {
    order: getOrder(state),
    products: getShoppingCart(state),
  }
};

export default connect(mapStateToProps, { clearOrderError })(CheckoutScreen);
