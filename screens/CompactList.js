import React, { PureComponent } from 'react';

import {
  Screen,
  ListView,
} from '@shoutem/ui'

import ListProductView from '../components/ListProductView';

export default class CompactList extends PureComponent {
  static navigationOptions = {
    title: "Helena Delirium"
  }

  constructor(props) {
    super(props);

    this.openProductDetails = this.openProductDetails.bind(this);
  }

  getData() {
    return require('../jsonData/data.json');
  }

  openProductDetails(product) {
    const { navigation } = this.props;

    navigation.navigate('ProductDetails', { product: product });
  }

  renderRow(product) {
    return (
      <ListProductView item={product} onPress={() => this.openProductDetails(product)} />
    );
  }

  render() {
    const data = this.getData();

    return (
      <Screen style={{ backgroundColor: '#f2f1ef' }}>
        <ListView
          data={data}
          renderRow={item => this.renderRow(item)}
        />
      </Screen>
    );
  }
}
