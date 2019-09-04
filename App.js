import React, { PureComponent } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';

import NewsList from './screens/NewsList';
import NewsDetails from './screens/NewsDetails';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import ShoppingCart from './screens/ShoppingCart';

import { store } from './redux';

const NewsStack = createStackNavigator({
  NewsList: {
    screen: NewsList,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetails: NewsDetails,
});

NewsStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const ProductStack = createStackNavigator({
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      header: null,
    },
  },
  ProductDetails: ProductDetails,
});

ProductStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const ShoppingCartStack = createStackNavigator({
  ShoppingCart: {
    screen: ShoppingCart,
    navigationOptions: {
      header: null,
    },
    ProductDetails: ProductDetails,
  }
})

ShoppingCartStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const AppNavigator = createBottomTabNavigator(
  {
    News: NewsStack,
    Products: ProductStack,
    ShoppingCart: ShoppingCartStack,
  },
  {
    navigationOptions: {
      header: null
    },
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
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
