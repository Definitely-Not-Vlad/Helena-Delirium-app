import React, { PureComponent } from 'react';
import { Screen, ListView } from '@shoutem/ui';

import ProductItemView from '../components/ProductItemView';

export default class ProductList extends PureComponent {
  static navigationOptions = {
    navigationOptions: {
      header: null,
    }
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.openProductDetails = this.openProductDetails.bind(this);
  }

  getData() {
    return require('../jsonData/products.json');
  }

  openProductDetails(product) {
    const { navigation } = this.props;

    navigation.navigate('ProductDetails', { product: product });
  }

  renderRow(product) {
    return (
      <ProductItemView
        item={product}
        onPress={() => this.openProductDetails(product)}
      />
    );
  }

  render() {
    const data = this.getData();

    return (
      <Screen style={{ backgroundColor: '#f2f1ef' }}>
        <ListView data={data} renderRow={this.renderRow} />
      </Screen>
    );
  }
}
