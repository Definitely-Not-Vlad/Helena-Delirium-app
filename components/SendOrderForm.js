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

import { getShoppingCart, sendOrder } from '../redux';

class SendOrderForm extends PureComponent {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.isShippingInfoComplete = this.isShippingInfoComplete.bind(this);

    this.state = {
      customerName: '',
      customerAddress: '',
      customerProvince: '',
      customerCountry: '',
      customerEmail: '',
    }
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
    const {
      customerName,
      customerAddress,
      customerProvince,
      customerCountry,
      customerEmail,
    } = this.state;

    const formData = [
      customerName,
      customerAddress,
      customerProvince,
      customerCountry,
      customerEmail,
    ];

    const hasEmptyField = formData.some(field => field === '');

    return !hasEmptyField;
  }

  submitOrder() {
    const { products, sendOrder } = this.props;
    const {
      customerName,
      customerAddress,
      customerProvince,
      customerCountry,
      customerEmail,
    } = this.state;

    const order = {
      products: products,
      total: this.calculateTotal(),
      customerName,
      customerAddress,
      customerProvince,
      customerCountry,
      customerEmail,
    };

    sendOrder(order);
  }

  render() {
    const { submitOrder } = this.props;
    const { customerEmail } = this.state;

    const shouldDisableSend = !this.isShippingInfoComplete() && !customerEmail;

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
        />
        <TouchableOpacity
          onPress={this.submitOrder}
          disabled={shouldDisableSend && !customerEmail}
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
  }
};

export default connect(mapStateToProps, { sendOrder })(SendOrderForm);
