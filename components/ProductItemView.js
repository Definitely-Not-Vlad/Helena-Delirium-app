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
    const addText = 'Dodaj u Košaricu';
    const removeText = 'Izbaci iz Košarice';
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
            <Subtitle>{this.resolveSubtitle(product.subtitle)}</Subtitle>
            <View styleName="horizontal h-center">
              <Subtitle>{product.netto}</Subtitle>
              <Subtitle>   ·   </Subtitle>
              <Subtitle>{product.price}kn</Subtitle>
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
