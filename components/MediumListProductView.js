import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
  Row,
  TouchableOpacity,
  Image,
  Subtitle,
  Caption,
  View,
  Divider,
} from '@shoutem/ui';

export default class MediumListProductView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  }

  resolveSubtitle(subtitle) {
    return (_.truncate(subtitle, { length: 25, separator: ' ' }));
  }

  render() {
    const { item, onPress } = this.props;

    const { nameColor } = item;

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Row>
          <Image
            styleName="medium rounded-corners placeholder"
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
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}
