import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Divider,
  Image,
  Row,
  TextInput,
  Title,
  TouchableOpacity,
  View,
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

  constructor(props) {
    super(props);

    this.removeFromCart = this.removeFromCart.bind(this);

    this.state = {
      quantity: '1',
    }
  }

  componentDidMount() {
    const { product: { quantity } } = this.props;

    this.setState({ quantity: quantity.toString() });
  }

  removeFromCart(name) {
    const { removeFromCart, setRemovedFromCart } = this.props;

    removeFromCart(name);
    setRemovedFromCart(name);
  }

  render() {
    const { changeProductQuantity, product } = this.props;
    const { quantity } = this.state;

    const { image, name, nameColor } = product;
    const textInputProps = {
      style: { borderWidth: 1, borderRadius: 6 },
      textAlign: "center",
      keyboardType: "numeric",
      maxLength: 2,
      value: quantity,
      onChangeText: text => this.setState({ quantity: text }),
      onEndEditing:
        e => changeProductQuantity(name, parseInt(e.nativeEvent.text))
    }

    return (
      <Row>
        <Image
          styleName="small rounded-corners placeholder"
          source={{ uri: image.url }}
        />
        <View styleName="horizontal stretch v-center space-between">
          <View styleName="vertical stretch space-between">
            <Title numberOfLines={1} style={{ color: nameColor }}>
              {name}
            </Title>
            <TouchableOpacity onPress={() => this.removeFromCart(name)}>
              <Title>Izbaci iz Košarice</Title>
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
