import React, { PureComponent } from 'react';

import { createStackNavigator } from 'react-navigation';

import CompactList from './screens/CompactList';
import ProductDetails from './screens/ProductDetails';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: CompactList
    },
    ProductDetails: {
      screen: ProductDetails
    },
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#eadac7',
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontWeight: 'normal',
      }
    }
  }
);

export default class App extends React.PureComponent {
  render() {
    return <AppNavigator />;
  }
}
