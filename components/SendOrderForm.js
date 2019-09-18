import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Heading,
  Switch,
  TextInput,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui';

import {
  clearSavedOrderInfo,
  getSavedOrderInfo,
  getShoppingCart,
  saveOrderInfo,
  sendOrder,
} from '../redux';
import SavedOrderForm from './SavedOrderForm';
import FormInput from './SendOrderFormInput';

const EMPTY_INFO = {
  customerName: '',
  customerAddress: '',
  customerCity: '',
  customerPostalCode: '',
  customerProvince: '',
  customerCountry: '',
  customerEmail: '',
};

class SendOrderForm extends PureComponent {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    this.clearOrderInfo = this.clearOrderInfo.bind(this);
    this.isShippingInfoComplete = this.isShippingInfoComplete.bind(this);
    this.renderSaveInfoSwitch = this.renderSaveInfoSwitch.bind(this);
    this.renderSavedForm = this.renderSavedForm.bind(this);
    this.shouldRenderSavedForm = this.shouldRenderSavedForm.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.toggleSaveInfo = this.toggleSaveInfo.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      isEmailValid: false,
      orderInfo: EMPTY_INFO,
      shouldRenderSavedForm: false,
      shouldSaveInfo: false,
    }
  }

  componentDidMount() {
    const { savedOrderInfo } = this.props;

    if (savedOrderInfo) {
      this.setState({
        orderInfo: savedOrderInfo,
        shouldSaveInfo: true,
        shouldRenderSavedForm: true,
      });
    }
  }

  calculateTotal() {
    const { products } = this.props;

    let total = 0;
    products.forEach(product => { total += (product.quantity*product.price) });

    return total;
  }

  validateEmail(email) {
    const { orderInfo } = this.state;

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

    this.setState({
      orderInfo: {
        ...orderInfo,
        customerEmail: email
      },
      isEmailValid: true,
    });
  }

  isShippingInfoComplete() {
    const { isEmailValid, orderInfo } = this.state;

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

    return (!hasEmptyField && isEmailValid);
  }

  shouldRenderSavedForm() {
    const { savedOrderInfo } = this.props;

    return !!savedOrderInfo;
  }

  clearOrderInfo() {
    const { clearSavedOrderInfo } = this.props;

    clearSavedOrderInfo();
    this.setState({
      isEmailValid: true,
      shouldRenderSavedForm: false,
      shouldSaveInfo: false,
    });
  }

  toggleSaveInfo() {
    const { clearSavedOrderInfo, saveOrderInfo } = this.props;
    const { orderInfo, shouldSaveInfo } = this.state;

    if (!shouldSaveInfo) {
      saveOrderInfo(orderInfo);
    } else {
      clearSavedOrderInfo();
    }

    this.setState({ shouldSaveInfo: !shouldSaveInfo });
  }

  renderSaveInfoSwitch() {
    const { shouldSaveInfo } = this.state;

    return (
      <View
        styleName="md-gutter-left sm-gutter-top horizontal stretch v-center"
      >
        <Title styleName="sm-gutter-right">Spremi za buduće narudžbe: </Title>
        <Switch
          value={shouldSaveInfo}
          onValueChange={() => this.toggleSaveInfo()}
        />
      </View>
    );
  }

  submitOrder() {
    const { products, sendOrder } = this.props;
    const { orderInfo } = this.state;

    const order = {
      products: products,
      total: this.calculateTotal(),
      ...orderInfo,
    };

    sendOrder(order);
  }

  renderSavedForm() {
    const { savedOrderInfo } = this.props;

    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return (
      <View styleName="vertical" style={{ backgroundColor: '#FFFFFF' }}>
        <SavedOrderForm onEdit={() => this.clearOrderInfo()} />
        <View styleName="horizontal h-center stretch md-gutter-vertical">
          <TouchableOpacity onPress={this.submitOrder}>
            <Title style={buttonStyling}>Pošalji Narudžbu</Title>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { savedOrderInfo } = this.props;
    const { orderInfo, shouldRenderSavedForm, shouldSaveInfo } = this.state;

    const orderInfoIsIncomplete = !this.isShippingInfoComplete();
    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      opacity: orderInfoIsIncomplete ? 0.2 : 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return shouldRenderSavedForm ? this.renderSavedForm() : (
      <View styleName="vertical" style={{ backgroundColor: '#FFFFFF' }}>
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerName: text,
            }
          })}}
          placeholder="Ivana Ivić"
          title="Ime i prezime:"
          value={orderInfo.customerName}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerAddress: text,
            }
          })}}
          placeholder="Vukovarska ulica 33"
          title="Adresa:"
          value={orderInfo.customerAddress}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerCity: text,
            }
          })}}
          placeholder="Osijek"
          title="Grad:"
          value={orderInfo.customerCity}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerPostalCode: text,
            }
          })}}
          placeholder="31000"
          title="Poštanski broj:"
          value={orderInfo.customerPostalCode}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerProvince: text,
            }
          })}}
          placeholder="Osječko-Baranjska Županija"
          title="Županija:"
          value={orderInfo.customerProvince}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerCountry: text,
            }
          })}}
          placeholder="Hrvatska"
          title="Država:"
          value={orderInfo.customerCountry}
        />
        <FormInput
          onChangeText={text => {this.setState({
            orderInfo: {
              ...orderInfo,
              customerEmail: text,
            }
          })}}
          placeholder="primjer@domena.hr"
          title="Email:"
          validation={this.validateEmail}
          value={orderInfo.customerEmail}
        />
        {!orderInfoIsIncomplete && this.renderSaveInfoSwitch()}
        <View styleName="vertical v-center h-center md-gutter-vertical">
          <TouchableOpacity
            onPress={this.submitOrder}
            disabled={orderInfoIsIncomplete}
          >
            <Heading style={buttonStyling}>Pošalji Narudžbu</Heading>
          </TouchableOpacity>
        </View>
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
  clearSavedOrderInfo,
  saveOrderInfo,
  sendOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendOrderForm);
