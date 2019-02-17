import React, { PureComponent } from 'react';

import {
  Screen,
  ListView,
} from '@shoutem/ui';

import FeaturedNewsItemView from '../components/FeaturedNewsItemView';
import NewsItemView from '../components/NewsItemView';

export default class NewsList extends PureComponent {
  static navigationOptions = {
    title: "Novosti",
  }

  constructor(props) {
    super(props);

    this.openNewsDetails = this.openNewsDetails.bind(this);
  }

  getData() {
    return require('../jsonData/news.json');
  }

  openNewsDetails(newsItem) {
    const { navigation } = this.props;

    navigation.navigate('NewsDetails', { newsItem: newsItem });
  }

  renderRow(newsItem, sectionId, index) {
    if (index === '0') {
      return (
        <FeaturedNewsItemView item={newsItem} onPress={() => this.openNewsDetails(newsItem)} />
      )
    }

    return (
      <NewsItemView item={newsItem} onPress={() => this.openNewsDetails(newsItem)} />
    );
  }

  render() {
    const data = this.getData();

    return (
      <Screen style={{ backgroundColor: '#F2F1EF' }}>
        <ListView
          data={data}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}
