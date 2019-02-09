import React, { PureComponent } from 'react';

import {
  Screen,
  NavigationBar,
  ListView,
} from '@shoutem/ui'

import ListItemView from './components/ListItemView';

export default class App extends PureComponent {
  getData() {
    return require('./jsonData/data.json');
  }

  renderRow(item) {
    return (
      <ListItemView item={item} />
    );
  }

  render() {
    const data = this.getData();

    return (
      <Screen>
        <NavigationBar
          styleName="inline"
          title="Helena Delirium"
        />
        <ListView
          data={data}
          renderRow={item => this.renderRow(item)}
        />
      </Screen>
    );
  }
}
