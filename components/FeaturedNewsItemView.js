import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
  Tile,
  TouchableOpacity,
  Image,
  Title,
  Subtitle,
  View,
  Divider,
  dimensionRelativeToIphone,
} from '@shoutem/ui';

export default class FeaturedNewsItemView extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const { item, onPress } = this.props;

    const customImageSize = {
      width: dimensionRelativeToIphone(365),
      height: dimensionRelativeToIphone(238),
    }

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Tile>
          <View
            styleName="sm-gutter featured"
            style={{ backgroundColor:'#080706' }}
          >
            <Image
              styleName="placeholder"
              style={customImageSize}
              source={{ uri : item.image.url }}
            />
            <View styleName="vertical stretch h-center md-gutter-vertical">
              <Title
                numberOfLines={1}
                style={{ color: '#EFEFEF' }}
              >
                {item.name}
              </Title>
              <Subtitle
                styleName="md-gutter-top"
                style={{ color: '#EFEFEF' }}
              >
                Prijave do {item.endDate}
              </Subtitle>
            </View>
          </View>
        </Tile>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}
