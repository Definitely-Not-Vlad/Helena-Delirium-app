import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { Title, TouchableOpacity, View } from '@shoutem/ui';

export default class CheckoutButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          styleName="vertical v-center h-center md-gutter-vertical"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <Title
            style={{
              backgroundColor: '#EFEFEF',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#080706',
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            Proceed to Checkout
          </Title>
        </View>
      </TouchableOpacity>
    );
  }
}
