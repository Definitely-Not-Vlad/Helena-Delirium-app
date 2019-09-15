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

export default class CheckoutItemView extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
  }

  render() {
    const { product } = this.props;

    const { image, name, nameColor, quantity } = product;

    return (
      <Row>
        <Image
          styleName="small rounded-corners placeholder"
          source={{ uri: image.url }}
        />
        <View
          styleName="horizontal v-start space-between stretch sm-gutter-right"
        >
          <Title numberOfLines={1} style={{ color: nameColor }}>{name}</Title>
          <Title>x{quantity}</Title>
        </View>
        <Divider styleName="line" />
      </Row>
    );
  }
}
