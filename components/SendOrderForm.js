import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Heading,
  TextInput,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui';

import {
  getSavedOrderInfo,
  getShoppingCart,
  saveOrderInfo,
  sendOrder,
} from '../redux';

class SendOrderForm extends PureComponent {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.isShippingInfoComplete = this.isShippingInfoComplete.bind(this);

    this.state = {
      orderInfo: {
        customerName: '',
        customerAddress: '',
        customerCity: '',
        customerPostalCode: '',
        customerProvince: '',
        customerCountry: '',
        customerEmail: '',
      }
    }
  }

  componentDidMount() {
    const { savedOrderInfo } = this.props;

    this.setState({ orderInfo: savedOrderInfo });
  }

  calculateTotal() {
    const { products } = this.props;

    let total = 0;
    products.forEach(product => { total += (product.quantity*product.price) });

    return total;
  }

  validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if (!emailRegex.test(email)) {
      Alert.alert(
        'Invalid email',
        'Please use "example@domain.com" format.',
        [{ text: 'OK' }],
        { cancelable: false },
      );

      return;
    }

    this.setState({ customerEmail: email });
  }

  isShippingInfoComplete() {
    const { orderInfo } = this.state;

    const formData = [
      orderInfo.customerName,
      orderInfo.customerAddress,
      orderInfo.customerCity,
      orderInfo.customerPostalCode,
      orderInfo.customerProvince,
      orderInfo.customerCountry,
      orderInfo.customerEmail,
    ];
    const hasEmptyField = formData.some(field => field === '');

    return !hasEmptyField;
  }

  submitOrder() {
    const { products, sendOrder } = this.props;
    const { orderInfo } = this.state;

    const order = {
      products: products,
      total: this.calculateTotal(),
      customerAddress: orderInfo.customerAddress,
      customerCity: orderInfo.customerCity,
      customerCountry: orderInfo.customerCountry,
      customerEmail: orderInfo.customerEmail,
      customerPostalCode: orderInfo.customerPostalCode,
      customerProvince: orderInfo.customerProvince,
    };

    sendOrder(order);
  }

  render() {
    const { orderInfo } = this.state;

    const shouldDisableSend = !this.isShippingInfoComplete();
    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      opacity: shouldDisableSend ? 0.2 : 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return (
      <View styleName="vertical" style={{ backgroundColor: '#FFFFFF' }}>
        <Title styleName="sm-gutter-left">
          Name and surname:
        </Title>
        <TextInput
          placeholder="Ivana Ivić"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerName: e.nativeEvent.text })
          }
          value={orderInfo.customerName || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          Address:
        </Title>
        <TextInput
          placeholder="Ivan Gundulić Street 14"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerAddress: e.nativeEvent.text })
          }
          value={orderInfo.customerAddress || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          City:
        </Title>
        <TextInput
          placeholder="Kutina"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerCity: e.nativeEvent.text })
          }
          value={orderInfo.customerCity || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          Postal code:
        </Title>
        <TextInput
          placeholder="44320"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerPostalCode: e.nativeEvent.text })
          }
          value={orderInfo.customerPostalCode || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          Province / County (if applicable):
        </Title>
        <TextInput
          placeholder="Sisak-Moslavina province"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerProvince: e.nativeEvent.text })
          }
          value={orderInfo.customerProvince || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          Country:
        </Title>
        <TextInput
          placeholder="Croatia"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.setState({ customerCountry: e.nativeEvent.text })
          }
          value={orderInfo.customerCountry || null}
        />

        <Title styleName="sm-gutter-left sm-gutter-top">
          Email:
        </Title>
        <TextInput
          placeholder="example@domain.com"
          style={{ backgroundColor: '#EFEFEF' }}
          onEndEditing={
            (e) => this.validateEmail(e.nativeEvent.text)
          }
          value={orderInfo.customerEmail || null}
        />
        <TouchableOpacity
          onPress={this.submitOrder}
          disabled={shouldDisableSend}
        >
          <View styleName="vertical v-center h-center md-gutter-vertical">
            <Heading style={buttonStyling}>Send Order</Heading>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: getShoppingCart(state),
    savedOrderInfo: getSavedOrderInfo(state),
  }
};

const mapDispatchToProps = {
  saveOrderInfo,
  sendOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendOrderForm);
