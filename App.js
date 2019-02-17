import React, { PureComponent } from 'react';

import { createBottomTabNavigator } from 'react-navigation';

import NewsList from './screens/NewsList';
import ProductList from './screens/ProductList';

const AppNavigator = createBottomTabNavigator(
  {
    News: {
      screen: NewsList
    },
    Products: {
      screen: ProductList
    },
  },
  {
    initialRouteName: "News",
    tabBarOptions: {
      activeTintColor: '#EFEFEF',
      inactiveTintColor: '#080706',
      activeBackgroundColor: '#080706',
      inactiveBackgroundColor: '#EFEFEF',
      showIcon: false,
      tabStyle: {
        justifyContent: 'center',
      },
      labelStyle: {
        fontSize: 22,
      }
    },
  }
);

export default class App extends React.PureComponent {
  render() {
    return <AppNavigator />;
  }
}
