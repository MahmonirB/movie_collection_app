// libs
import React from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// components
import HomePage from './src/screens/HomePage';
const stackNavigator = createStackNavigator(
  {
    Home: {screen: HomePage},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const AppContainer = createAppContainer(stackNavigator);
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </>
  );
};

export default App;
