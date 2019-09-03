import React, { PureComponent } from 'react';
import { Screen, ListView } from '@shoutem/ui';

import FeaturedNewsItemView from '../components/FeaturedNewsItemView';
import NewsItemView from '../components/NewsItemView';

export default class NewsList extends PureComponent {
  static navigationOptions = {
    title: "Novosti",
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderFeaturedItem = this.renderFeaturedItem.bind(this);
    this.openNewsDetails = this.openNewsDetails.bind(this);
  }

  getData() {
    return require('../jsonData/news.json');
  }

  openNewsDetails(newsItem) {
    const { navigation } = this.props;

    navigation.navigate('NewsDetails', { newsItem: newsItem });
  }

  renderFeaturedItem(newsItem) {
    return (
      <FeaturedNewsItemView
        item={newsItem}
        onPress={() => this.openNewsDetails(newsItem)}
      />
    );
  }

  renderRow(newsItem) {
    return (
      <NewsItemView
        item={newsItem}
        onPress={() => this.openNewsDetails(newsItem)}
      />
    );
  }

  render() {
    const data = this.getData();

    return (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={this.renderRow}
          hasFeaturedItem
          renderFeaturedItem={this.renderFeaturedItem}
        />
      </Screen>
    );
  }
}
