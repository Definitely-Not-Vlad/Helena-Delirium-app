import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import {
  Row,
  Image,
  Subtitle,
  Caption,
  View,
} from '@shoutem/ui';

export default class ListItemView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
  }

  render() {
    const { item } = this.props;

    return (
      <Row>
        <View styleName="content horizontal">
          <Image
            styleName="small rounded-corners placeholder"
            source={{ uri : item.image.url }}
          />
          <View styleName="md-gutter-left vertical stretch space-between">
            <Subtitle numberOfLines={1}>{item.name}</Subtitle>
            <Caption numberOfLines={1}>{item.subtitle}</Caption>
          </View>
        </View>
      </Row>
    );
  }
}
