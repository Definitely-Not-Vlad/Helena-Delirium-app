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
} from '@shoutem/ui';

import { removeFromCart } from '../redux';

class ShoppingCartProductView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const { item, onPress, removeFromCart } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Image
            styleName="small rounded-corners placeholder"
            source={{ uri: item.image.url }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle numberOfLines={1}>{item.name}</Subtitle>
            <TouchableOpacity onPress={() => removeFromCart(item.name)}>
              <Subtitle>Remove</Subtitle>
            </TouchableOpacity>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

export default connect(null, { removeFromCart })(ShoppingCartProductView)
