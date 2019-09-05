import _ from 'lodash';
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

import { changeProductQuantity, removeFromCart } from '../redux';

class ShoppingCartProductView extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
  }

  render() {
    const {
      changeProductQuantity,
      product,
      removeFromCart,
    } = this.props;

    const { image, name } = product;

    return (
      <Row>
        <Image
          styleName="small rounded-corners placeholder"
          source={{ uri: image.url }}
        />
        <View styleName="horizontal stretch space-between">
          <View styleName="vertical space-between">
            <Subtitle numberOfLines={1}>{name}</Subtitle>
            <TouchableOpacity onPress={() => removeFromCart(name)}>
              <Subtitle>Remove</Subtitle>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 6 }}
            textAlign={"center"}
            keyboardType="numeric"
            maxLength={2}
            placeholder="1"
            onEndEditing={(e) =>
              changeProductQuantity(name, parseInt(e.nativeEvent.text))
            }
          />
        </View>
        <Divider styleName="line" />
      </Row>
    );
  }
}

const mapDispatchToProps = {
  changeProductQuantity,
  removeFromCart,
}

export default connect(null, mapDispatchToProps)(ShoppingCartProductView)
