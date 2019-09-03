import React, { PureComponent } from 'react';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import NewsList from './screens/NewsList';
import NewsDetails from './screens/NewsDetails';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';

const NewsStack = createStackNavigator({
  NewsList: NewsList,
  NewsDetails: NewsDetails,
});

NewsStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const ProductStack = createStackNavigator({
  ProductList: ProductList,
  ProductDetails: ProductDetails,
});

ProductStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const AppNavigator = createBottomTabNavigator(
  {
    News: NewsStack,
    Products: ProductStack,
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

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
  render() {
    return <AppContainer />;
  }
}
