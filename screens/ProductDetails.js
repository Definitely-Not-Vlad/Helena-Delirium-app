import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  TouchableOpacity,
  Divider,
} from '@shoutem/ui';

import {
  addToCart,
  getProductFromCatalogue,
  removeFromCart,
  setAddedToCart,
  setRemovedFromCart,
} from '../redux';

class ProductDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.getParam('name') };
  }

  renderImage() {
    const { product } = this.props;

    return <Image styleName="large" source={{ uri: product.image.url }} />
  }

  resolveActionButtonActions() {
    const {
      addToCart,
      product,
      removeFromCart,
      setAddedToCart,
      setRemovedFromCart,
    } = this.props;

    const { name } = product;

    if (product.canAddToCart) {
      addToCart(product);
      setAddedToCart(name);
    }
    else {
      removeFromCart(name);
      setRemovedFromCart(name);
    }
  }

  renderActionButton() {
    const { product } = this.props;

    const addText = 'Add to Cart';
    const removeText = 'Remove from Cart';
    const resolvedText = product.canAddToCart ? addText : removeText;

    return (
      <TouchableOpacity
        onPress={() => this.resolveActionButtonActions(product)}
      >
        <View style={{
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 14,
          backgroundColor: '#EFEFEF',
        }}>
          <Subtitle>{resolvedText}</Subtitle>
        </View>
      </TouchableOpacity>
    );
  }

  renderDetails() {
    const { product } = this.props;

    return (
      <View
        virtual
        styleName="vertical h-center lg-gutter-vertical"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Title
          styleName="centered md-gutter-bottom"
          style={{color: product.nameColor}}
        >
          {product.name}
        </Title>
        <Subtitle numberOfLines={1} styleName="md-gutter-bottom">
          {product.subtitle}
        </Subtitle>
        <View virtual styleName="horizontal h-center md-gutter-bottom">
          <Caption>{product.netto}</Caption>
          <Caption>   ·   </Caption>
          <Caption>{product.price}</Caption>
        </View>
        {this.renderActionButton()}
      </View>
    );
  }

  renderDescription() {
    const { product } = this.props;

    return(
      <View styleName="md-gutter" style={{ backgroundColor: '#EFEFEF'}}>
        <Text styleName="multiline">{product.description}</Text>
      </View>
    )
  }

  render() {
    const { product } = this.props;

    return (
      <Screen>
        <ScrollView>
          {this.renderImage()}
          {this.renderDetails()}
          <Divider styleName="line" />
          {this.renderDescription()}
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const productName = ownProps.navigation.getParam('name');

  return {
    product: getProductFromCatalogue(state, productName)
  }
};

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  setAddedToCart,
  setRemovedFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
