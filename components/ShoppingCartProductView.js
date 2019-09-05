import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  TouchableOpacity,
  Image,
  Subtitle,
  View,
  Divider,
  TextInput,
} from '@shoutem/ui';

import {
  changeProductQuantity,
  removeFromCart,
  setRemovedFromCart,
} from '../redux';

class ShoppingCartProductView extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
  }

  removeFromShoppingCart(name) {
    const { removeFromCart, setRemovedFromCart } = this.props;

    removeFromCart(name);
    setRemovedFromCart(name);
  }

  render() {
    const { changeProductQuantity, product } = this.props;

    const { image, name } = product;
    const textInputProps = {
      style: { borderWidth: 1, borderRadius: 6 },
      textAlign: "center",
      keyboardType: "numeric",
      maxLength: 2,
      placeholder: "1",
      onEndEditing: (e) =>
        changeProductQuantity(name, parseInt(e.nativeEvent.text))
    }

    return (
      <Row>
        <Image
          styleName="small rounded-corners placeholder"
          source={{ uri: image.url }}
        />
        <View styleName="horizontal stretch space-between">
          <View styleName="vertical stretch space-between">
            <Subtitle numberOfLines={1}>{name}</Subtitle>
            <TouchableOpacity
              onPress={() => this.removeFromShoppingCart(name)}
            >
              <Subtitle>Remove</Subtitle>
            </TouchableOpacity>
          </View>
          <TextInput {...textInputProps} />
        </View>
        <Divider styleName="line" />
      </Row>
    );
  }
}

const mapDispatchToProps = {
  changeProductQuantity,
  removeFromCart,
  setRemovedFromCart,
}

export default connect(null, mapDispatchToProps)(ShoppingCartProductView)
