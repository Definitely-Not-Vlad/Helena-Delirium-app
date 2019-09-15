import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Screen, ListView } from '@shoutem/ui';

import ProductItemView from '../components/ProductItemView';
import {
  getCatalogue,
  setAddedToCart,
  setRemovedFromCart,
} from '../redux';

class ProductList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.openProductDetails = this.openProductDetails.bind(this);
  }

  openProductDetails(product) {
    const { navigation } = this.props;

    navigation.navigate('ProductDetails', { name: product.name });
  }

  renderRow(product) {
    return (
      <ProductItemView
        product={product}
        onPress={() => this.openProductDetails(product)}
      />
    );
  }

  render() {
    const { data } = this.props;

    return (
      <Screen style={{ backgroundColor: '#f2f1ef' }}>
        <ListView data={data} renderRow={this.renderRow} />
      </Screen>
    );
  }
}

const mapDispatchToProps = { setAddedToCart, setRemovedFromCart };
const mapStateToProps = (state) => {
  return {
    data: getCatalogue(state)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
