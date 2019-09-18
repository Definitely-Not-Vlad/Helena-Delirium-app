import React, { PureComponent } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';

import TabBarIcon from './components/TabBarIcon';
import NewsList from './screens/NewsList';
import CheckoutScreen from './screens/CheckoutScreen';
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
  },
  CheckoutScreen: {
    screen: CheckoutScreen,
    navigationOptions: {
      title: 'Izradba Narudžbe',
    }
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state;

        return (
          <TabBarIcon
            tintColor={tintColor}
            iconName={routeName}
          />
        )
      },
    }),
    initialRouteName: 'Products',
    tabBarOptions: {
      activeTintColor: '#EFEFEF',
      inactiveTintColor: '#080706',
      activeBackgroundColor: '#080706',
      inactiveBackgroundColor: '#EFEFEF',
      showLabel: false,
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
