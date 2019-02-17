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

export default class ProductDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const product = navigation.getParam('product');

    return {
      title: product.name || 'Prirodna Kozmetika',
      tabBarVisible: false,
    };
  }

  renderImage(product) {
    return (
      <Image
        styleName="large"
        source={{ uri: _.get(product, 'image.url') }}
      />
    );
  }

  renderDetails(product) {
    return (
      <View
        virtual
        styleName="vertical h-center lg-gutter-vertical"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Title
          styleName="centered md-gutter-bottom"
          style={{color:product.nameColor}}
        >
          {product.name}
        </Title>
        <Subtitle numberOfLines={1} styleName="md-gutter-bottom">{product.subtitle}</Subtitle>
        <View virtual styleName="horizontal h-center">
          <Caption>{product.netto}</Caption>
          <Caption>   ·   </Caption>
          <Caption>{product.price}</Caption>
        </View>
      </View>
    );
  }

  renderDescription(product) {
    return(
      <View styleName="md-gutter" style={{ backgroundColor: '#EFEFEF'}}>
        <Text styleName="multiline">{product.description}</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;

    const product = navigation.getParam('product');

    return (
      <Screen>
        <ScrollView>
          {this.renderImage(product)}
          {this.renderDetails(product)}
          <Divider styleName="line" />
          {this.renderDescription(product)}
        </ScrollView>
      </Screen>
    );
  }
}
