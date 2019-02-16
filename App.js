import React, { PureComponent } from 'react';

import { createStackNavigator } from 'react-navigation';

import MediumList from './screens/MediumList';
import ProductDetails from './screens/ProductDetails';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MediumList
    },
    ProductDetails: {
      screen: ProductDetails
    },
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#080706',
      },
      headerTitleStyle: {
        color: '#ffffff',
        fontWeight: 'normal',
      },
      headerLeft: null,
    },
    headerLayoutPreset: 'center',
  }
);

export default class App extends React.PureComponent {
  render() {
    return <AppNavigator />;
  }
}
