import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  TouchableOpacity,
  Image,
  Subtitle,
  Title,
  Caption,
  View,
  Divider,
} from '@shoutem/ui';

import {
  addToCart,
  removeFromCart,
  setAddedToCart,
  setRemovedFromCart,
} from '../redux';

class ProductItemView extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    onPress: PropTypes.func,
  }

  resolveSubtitle(subtitle) {
    return (_.truncate(subtitle, { length: 25, separator: ' ' }));
  }

  resolveActionButtonActions(product) {
    const {
      addToCart,
      removeFromCart,
      setAddedToCart,
      setRemovedFromCart,
    } = this.props;

    const { name } = product;

    if (product.canAddToCart) {
      addToCart(product);
      setAddedToCart(name);
    }
    else {
      removeFromCart(name);
      setRemovedFromCart(name);
    }
  }

  renderActionButton(product) {
    const addText = 'Add to Cart';
    const removeText = 'Remove from Cart';
    const resolvedText = product.canAddToCart ? addText : removeText;

    return (
      <TouchableOpacity
        onPress={() => this.resolveActionButtonActions(product)}
      >
        <Subtitle>{resolvedText}</Subtitle>
      </TouchableOpacity>
    );
  }

  render() {
    const { product, onPress, addToCart, removeFromCart } = this.props;

    const { nameColor } = product;

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Image
            styleName="medium-square rounded-corners placeholder"
            source={{ uri: product.image.url }}
          />
          <View styleName="vertical stretch h-center space-between">
            <Title numberOfLines={1} style={{ color: nameColor }} >
              {product.name}
            </Title>
            <Caption>{this.resolveSubtitle(product.subtitle)}</Caption>
            <View styleName="horizontal h-center">
              <Caption>{product.netto}</Caption>
              <Caption>   ·   </Caption>
              <Caption>{product.price}kn</Caption>
            </View>
            {this.renderActionButton(product)}
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  setAddedToCart,
  setRemovedFromCart,
};

export default connect(null, mapDispatchToProps)(ProductItemView)
