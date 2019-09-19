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
      'Greška pri obradi narudžbe',
      'Došlo je do greške tokom obrade Vaše narudžbe. Molimo Vas pokušajte '
      + ' ponovno.'
      + '\nUkoliko i dalje dolazi do greške, molimo Vas javite se putem emaila '
      + 'na' + SUPPORT_EMAIL,
      [{ text: 'OK', onPress: () => clearOrderError() }],
      { cancelable: false },
    );
  }

  renderCheckoutForm() {
    if (_.get(this.props, 'order.error')) this.errorPopup();

    const DISCLAIMER = 'Nakon što se pošalje narudžba, biti će obrađena te '
      + 'poslana poštom. Trenutačno je jedino moguće plaćati pouzećem.';

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
              Ukupna cijena narudžbe je {this.calculateTotal()}kn
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
        <Title>Vaša narudžba je poslana.</Title>
        <View styleName="horizontal h-center stretch xl-gutter-top">
          <TouchableOpacity onPress={() => this.navigateToNews()}>
            <Title style={buttonStyling}>
              Novosti
            </Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigateToProducts()}>
            <Title styleName="lg-gutter-left" style={buttonStyling}>
              Katalog
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
