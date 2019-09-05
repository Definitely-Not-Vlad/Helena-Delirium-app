import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { Image } from '@shoutem/ui';

const PRODUCTS_ICON = require('../assets/products_cream.png');
const NEWS_ICON = require('../assets/news.png');
const SHOPPING_CART_ICON = require('../assets/shopping_cart_empty.png');

export default class TabBarIcon extends PureComponent {
  static propTypes = {
    iconName: PropTypes.string,
    tintColor: PropTypes.string,
  }

  resolveIconSource(iconName) {
    if (iconName === 'News') {
      return NEWS_ICON;
    }

    if (iconName === 'Products') {
      return PRODUCTS_ICON;
    }

    if (iconName === 'ShoppingCart') {
      return SHOPPING_CART_ICON;
    }

    return undefined;
  }

  render() {
    const { iconName, tintColor } = this.props;

    return (
      <Image
        tintColor={tintColor}
        source={this.resolveIconSource(iconName)}
        style={{ width: 32, height: 32 }}
      />
    );
  }
}
