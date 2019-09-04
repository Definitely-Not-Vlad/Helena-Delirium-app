import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  TouchableOpacity,
  Image,
  Subtitle,
  Caption,
  View,
  Divider,
} from '@shoutem/ui';

import { addToCart, removeFromCart } from '../redux';

class ProductItemView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    addToCart: PropTypes.func,
  }

  resolveSubtitle(subtitle) {
    return (_.truncate(subtitle, { length: 25, separator: ' ' }));
  }

  render() {
    const { item, onPress, addToCart, removeFromCart } = this.props;

    const { nameColor } = item;

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Image
            styleName="medium-square rounded-corners placeholder"
            source={{ uri: item.image.url }}
          />
          <View styleName="vertical stretch h-center space-between">
            <Subtitle
              numberOfLines={1}
              style={{ color: nameColor }}
            >
              {item.name}
            </Subtitle>
            <Caption>{this.resolveSubtitle(item.subtitle)}</Caption>
            <View styleName="horizontal h-center">
              <Caption>{item.netto}</Caption>
              <Caption>   ·   </Caption>
              <Caption>{item.price}</Caption>
            </View>
            <View styleName="horizontal space-between">
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Subtitle>Add to cart</Subtitle>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromCart(item.name)}>
                <Subtitle>Remove</Subtitle>
              </TouchableOpacity>
            </View>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

export default connect(null, { addToCart, removeFromCart })(ProductItemView)
