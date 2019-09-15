import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
  Screen,
  ScrollView,
  Image,
  Tile,
  Title,
  Subtitle,
  Caption,
  View,
  Text,
  Divider,
} from '@shoutem/ui';

export default class NewsDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const newsItem = navigation.getParam('newsItem');

    return {
      title: newsItem.name || 'Novosti',
    };
  }

  renderImage(newsItem) {
    return (
      <Image
        styleName="large"
        source={{ uri: _.get(newsItem, 'image.url') }}
      />
    );
  }

  renderDetails(newsItem) {
    return (
      <View
        virtual
        styleName="vertical h-center lg-gutter-vertical"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Title styleName="centered md-gutter-bottom">
          {newsItem.name}
        </Title>
        <Subtitle numberOfLines={1} styleName="md-gutter-bottom">
          {newsItem.endDate}
        </Subtitle>
      </View>
    );
  }

  renderDescription(newsItem) {
    return(
      <View styleName="md-gutter" style={{ backgroundColor: '#EFEFEF'}}>
        <Text styleName="multiline">{newsItem.description}</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;

    const newsItem = navigation.getParam('newsItem');

    return (
      <Screen>
        <ScrollView>
          {this.renderImage(newsItem)}
          {this.renderDetails(newsItem)}
          <Divider styleName="line" />
          {this.renderDescription(newsItem)}
        </ScrollView>
      </Screen>
    );
  }
}
