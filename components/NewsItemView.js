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

export default class NewsItemView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const { item, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Image
            styleName="small rounded-corners placeholder"
            source={{ uri: item.image.url }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle numberOfLines={1}>{item.name}</Subtitle>
            <Caption>Prijave do {item.endDate}</Caption>
          </View>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}
