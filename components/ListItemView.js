import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import {
  Row,
  TouchableOpacity,
  Image,
  Subtitle,
  Caption,
  View,
} from '@shoutem/ui';

export default class ListItemView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
  }

  navigateToDetailsScreen(item) {
    console.log("Navigating to item details screen.")
    //add navigation code
  }

  render() {
    const { item } = this.props;

    return (
      <Row>
        <TouchableOpacity onPress={this.navigateToDetailsScreen(item)}>
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
        </TouchableOpacity>
      </Row>
    );
  }
}
